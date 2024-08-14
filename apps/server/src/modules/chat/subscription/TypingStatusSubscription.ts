import type { Context } from "@/context";
import { UserLoader } from "@/modules/user/UserLoader";
import { UserType } from "@/modules/user/UserType";
import { events, pubSub } from "@/pubsub";
import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from "graphql";
import { fromGlobalId } from "graphql-relay";
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
		user: {
			type: UserType,
			resolve: (payload, _, ctx) => UserLoader.load(ctx, payload.userId),
		},
	},
	subscribe: (input, ctx) => {
		const resolver = withFilter(
			() => pubSub.asyncIterator(events.chat.typing),
			(payload: TypingStatusPayload, input: TypingStatusInput) => {
				if (input.chatId) {
					return fromGlobalId(input.chatId).id === payload.chatId;
				}
				return false;
			},
		);
		return resolver(null, input, ctx);
	},
});
