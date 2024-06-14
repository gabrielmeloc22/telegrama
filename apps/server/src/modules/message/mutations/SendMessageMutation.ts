import type { Context } from "@/context";
import { ChatLoader } from "@/modules/chat/ChatLoader";
import { ChatModel, type Chat } from "@/modules/chat/ChatModel";
import { ChatConnection } from "@/modules/chat/ChatType";
import { UserModel } from "@/modules/user/UserModel";
import { pubSub } from "@/pubsub";
import { getObjectId } from "@entria/graphql-mongo-helpers";
import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId, toGlobalId } from "graphql-relay";
import { DateTimeResolver, GraphQLNonEmptyString } from "graphql-scalars";
import { startSession } from "mongoose";
import { MessageModel } from "../MessageModel";

type SendMessageInput = {
	to: string;
	content: string;
};

type SendMessageOutput = {
	content: string;
	createdAt: Date;
	id: string;
	chat: Chat | null;
};

export const SendMessage = mutationWithClientMutationId<
	SendMessageInput,
	Promise<SendMessageOutput>,
	Context
>({
	name: "SendMessage",
	inputFields: {
		content: { type: GraphQLNonEmptyString },
		to: {
			type: new GraphQLNonNull(GraphQLString),
			description: "The recipient id, a user or a chat",
		},
	},
	outputFields: {
		content: { type: new GraphQLNonNull(GraphQLString) },
		createdAt: { type: DateTimeResolver },
		id: { type: GraphQLID },
		chat: {
			type: ChatConnection.edgeType,
			resolve: async (res, _, ctx) => {
				const { chat } = await res;
				const node = await ChatLoader.load(ctx, chat?.id);

				if (!node) {
					return null;
				}

				return { cursor: toGlobalId("chat", node.id), node };
			},
		},
	},
	mutateAndGetPayload: async ({ content, to }, { user }) => {
		if (!user) {
			throw new Error("Sender not specified");
		}

		const toId = to;
		const selfMessage = toId === user.id.toString();

		let chat = await ChatModel.findOne({
			users: {
				$size: selfMessage ? 1 : 2,
				$all: selfMessage ? [user.id] : [getObjectId(toId), user.id],
			},
		});

		const recipient = await UserModel.findById(toId);

		if (!chat && !recipient) {
			throw new Error("Recipient not specified");
		}

		let newChat = false;

		if (!chat) {
			newChat = true;
			chat = new ChatModel({
				users: selfMessage ? [user.id] : [recipient?.id, user.id],
			});
		}

		const message = new MessageModel({
			content,
			from: user,
		});

		const session = await startSession();

		try {
			chat.lastMessage = message.id;
			message.chat = chat.id;

			await message.save({ session });
			await chat.save({ session });
		} finally {
			await session.endSession();
		}
		await pubSub.publish("MESSAGE:NEW", {
			id: message.id,
			chatId: chat.id,
			userId: recipient?.id,
			newChat,
		});

		return {
			id: toGlobalId("message", message.id),
			content: message.content,
			createdAt: message.createdAt,
			chat,
		};
	},
});
