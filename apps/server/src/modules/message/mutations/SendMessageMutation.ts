import type { Context } from "@/context";
import { ChatLoader } from "@/modules/chat/ChatLoader";
import { type Chat, ChatModel } from "@/modules/chat/ChatModel";
import { ChatConnection } from "@/modules/chat/ChatType";
import { getChat } from "@/modules/chat/util/getChat";
import { UserModel } from "@/modules/user/UserModel";
import { events, pubSub } from "@/pubsub";
import { GraphQLNonNull, GraphQLString } from "graphql";
import {
	fromGlobalId,
	mutationWithClientMutationId,
	toGlobalId,
} from "graphql-relay";
import { GraphQLNonEmptyString } from "graphql-scalars";
import { startSession } from "mongoose";
import { MessageLoader } from "../MessageLoader";
import { MessageModel } from "../MessageModel";
import { MessageType } from "../MessageType";
import type { MessageSubscription } from "../subscription/OnMessage";

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
		message: {
			type: MessageType,
			resolve: async (out, _, ctx) => MessageLoader.load(ctx, (await out).id),
		},
		chat: {
			type: ChatConnection.edgeType,
			resolve: async (res, _, ctx) => {
				const { chat } = await res;
				const node = await ChatLoader.load(ctx, chat?.id);

				if (!node) {
					return null;
				}

				return { cursor: toGlobalId("Chat", node.id), node };
			},
		},
	},
	mutateAndGetPayload: async ({ content, to }, ctx) => {
		if (!ctx.user) {
			throw new Error("Sender not specified");
		}

		const toId = fromGlobalId(to).id;
		const selfMessage = toId === ctx.user.id.toString();

		let chat = await getChat(ctx, { chatId: toId });

		const recipient = await UserModel.findById(toId);

		if (!chat && !recipient) {
			throw new Error("Recipient not specified");
		}

		let newChat = false;

		if (!chat) {
			newChat = true;
			chat = new ChatModel({
				users: selfMessage ? [ctx.user.id] : [recipient?.id, ctx.user.id],
			});
		}

		const message = new MessageModel({
			content,
			from: ctx.user,
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

		await pubSub.publish(events.message.new, {
			topic: events.message.new,
			newMessageId: message.id,
			chatId: chat.id,
			newChat,
		} satisfies MessageSubscription);

		return {
			id: toGlobalId("Message", message.id),
			content: message.content,
			createdAt: message.createdAt,
			chat,
		};
	},
});
