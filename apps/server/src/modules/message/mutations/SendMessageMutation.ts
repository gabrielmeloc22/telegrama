import type { Context } from "@/context";
import { ChatModel } from "@/modules/chat/ChatModel";
import { UserModel } from "@/modules/user/UserModel";
import { GraphQLNonNull, GraphQLString } from "graphql";
import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
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
};

export const SendMessage = mutationWithClientMutationId<
	SendMessageInput,
	Promise<SendMessageOutput>,
	Context
>({
	name: "SendMessage",
	inputFields: {
		content: { type: GraphQLNonEmptyString },
		to: { type: new GraphQLNonNull(GraphQLString) },
	},
	outputFields: {
		content: { type: new GraphQLNonNull(GraphQLString) },
		createdAt: { type: DateTimeResolver },
	},
	mutateAndGetPayload: async ({ content, to }, { user }) => {
		if (!user) {
			throw new Error("Sender not specified");
		}

		const recipient = await UserModel.findById(fromGlobalId(to).id);

		if (!recipient) {
			throw new Error("Recipient does not exist");
		}

		const message = new MessageModel({
			content: content.trim(),
			from: user,
			to: recipient,
		});

		const session = await startSession();

		try {
			const chat =
				(await ChatModel.findOne({
					$and: [
						{ users: { $size: 2 } },
						{ users: { $all: [user._id, recipient._id] } },
					],
				})) ||
				(await new ChatModel({
					users: [recipient._id, user._id],
				}).save({ session }));

			message.chat = chat.id;

			await message.save({ session });
		} finally {
			await session.endSession();
		}

		return {
			content: message.content,
			createdAt: message.createdAt,
		};
	},
});
