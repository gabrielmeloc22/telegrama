import type { Context } from "@/context";
import { events, pubSub } from "@/pubsub";
import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from "graphql";
import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { ChatLoader } from "../ChatLoader";

type TypingStatusInput = {
	userId: string;
	chatId: string;
	typing: boolean;
};

export const SendTypingStatusMutation = mutationWithClientMutationId<
	TypingStatusInput,
	Promise<null>,
	Context
>({
	name: "SendTypingStatus",
	inputFields: {
		chatId: { type: new GraphQLNonNull(GraphQLString) },
		typing: { type: new GraphQLNonNull(GraphQLBoolean) },
		userId: { type: new GraphQLNonNull(GraphQLString) },
	},
	outputFields: {},
	mutateAndGetPayload: async ({ userId, chatId, typing }, ctx) => {
		const chat = await ChatLoader.load(ctx, fromGlobalId(chatId).id);

		if (!chat) {
			throw new Error("chat not found");
		}

		await pubSub.publish(events.chat.typingStatus, {
			typing,
			chatId,
			userId,
		});

		return null;
	},
});
