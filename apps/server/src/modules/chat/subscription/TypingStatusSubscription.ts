import type { Context } from "@/context";
import { events, pubSub } from "@/pubsub";
import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from "graphql";
import { subscriptionWithClientId } from "graphql-relay-subscription";
import { withFilter } from "graphql-subscriptions";

type TypingStatusInput = {
	chatId: string;
};

type TypingStatusPayload = {
	chatId: string;
	typing: boolean;
	userId: string;
};

export const OnTypeSubscription = subscriptionWithClientId<
	TypingStatusPayload,
	Context,
	TypingStatusInput
>({
	name: "onType",
	inputFields: {
		chatId: {
			type: new GraphQLNonNull(GraphQLString),
		},
	},
	outputFields: {
		typing: { type: GraphQLBoolean, resolve: (payload) => payload.typing },
		userId: { type: GraphQLString, resolve: (payload) => payload.userId },
	},
	subscribe: (input, ctx) => {
		const resolver = withFilter(
			() => pubSub.asyncIterator(events.chat.typingStatus),
			(payload: TypingStatusPayload, input: TypingStatusInput) => {
				if (input.chatId) {
					return input.chatId === payload.chatId;
				}
				return false;
			},
		);
		return resolver(null, input, ctx);
	},
});
