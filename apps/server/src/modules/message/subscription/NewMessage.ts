import type { Context } from "@/context";
import { events, pubSub } from "@/pubsub";
import { GraphQLBoolean, GraphQLString } from "graphql";
import { toGlobalId } from "graphql-relay";
import { subscriptionWithClientId } from "graphql-relay-subscription";
import { withFilter } from "graphql-subscriptions";
import { MessageLoader } from "../MessageLoader";
import { MessageConnection } from "../MessageType";

type NewMessageInput = {
	userId?: string;
	chatId?: string;
};

type NewMessage = {
	id: string;
	chatId: string;
	userId: string;
	newChat: boolean;
};

export const NewMessage = subscriptionWithClientId<
	NewMessage,
	Context,
	NewMessageInput
>({
	name: "NewMessage",
	inputFields: {
		userId: {
			type: GraphQLString,
		},
		chatId: {
			type: GraphQLString,
		},
	},
	outputFields: {
		newChat: { type: GraphQLBoolean, resolve: (msg) => msg.newChat },
		message: {
			type: MessageConnection.edgeType,
			resolve: async (msg, _args, ctx) => {
				const node = await MessageLoader.load(ctx, msg.id);
				if (!node) return null;

				return {
					node,
					cursor: toGlobalId("message", node.id),
				};
			},
		},
	},
	subscribe: (input, ctx) => {
		const resolver = withFilter(
			() => pubSub.asyncIterator(events.message.new),
			(payload: NewMessage, input: NewMessageInput) => {
				if (input.userId) {
					const userId = input.userId;

					return userId === payload.userId;
				}
				if (input.chatId) {
					const chatId = input.chatId;

					return chatId === payload.chatId;
				}
				return false;
			},
		);
		return resolver(null, input, ctx);
	},
});
