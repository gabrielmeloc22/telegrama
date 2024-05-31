import type { Context } from "@/context";
import { ChatModel } from "@/modules/chat/ChatModel";
import { pubSub } from "@/pubsub";
import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import {
	fromGlobalId,
	mutationWithClientMutationId,
	toGlobalId,
} from "graphql-relay";
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
		id: { type: GraphQLID },
	},
	mutateAndGetPayload: async ({ content, to }, { user }) => {
		if (!user) {
			throw new Error("Sender not specified");
		}

		const chat = await ChatModel.findById(fromGlobalId(to).id);

		if (!chat) {
			throw new Error("Chat does not exist");
		}

		const message = new MessageModel({
			content: content.trim(),
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
		await pubSub.publish("MESSAGE:NEW", { id: message.id, chatId: chat.id });

		return {
			id: toGlobalId("message", message.id),
			content: message.content,
			createdAt: message.createdAt,
		};
	},
});
