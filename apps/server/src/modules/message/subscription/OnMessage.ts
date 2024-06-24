import type { Context } from "@/context";
import { ChatLoader } from "@/modules/chat/ChatLoader";
import { ChatModel } from "@/modules/chat/ChatModel";
import { ChatConnection } from "@/modules/chat/ChatType";
import { events, pubSub } from "@/pubsub";
import { GraphQLBoolean, GraphQLID, GraphQLList } from "graphql";
import { toGlobalId } from "graphql-relay";
import { subscriptionWithClientId } from "graphql-relay-subscription";
import { withFilter } from "graphql-subscriptions";
import { MessageLoader } from "../MessageLoader";
import { MessageConnection } from "../MessageType";

export type MessageSubscription = {
	topic: (typeof events.message)[keyof typeof events.message];
	newMessageId?: string;
	deletedMessageIds?: string[];
	chatId: string;
	userId?: string;
	newChat?: boolean;
};

export const MessageSubscription = subscriptionWithClientId<
	MessageSubscription,
	Context
>({
	name: "Message",
	outputFields: {
		newChat: { type: GraphQLBoolean, resolve: (payload) => payload.newChat },
		chat: {
			type: ChatConnection.edgeType,
			resolve: async (payload, _, ctx) => {
				const node = await ChatLoader.load(ctx, payload.chatId);

				if (!node) return null;

				return { node, cursor: toGlobalId("chat", node?.id) };
			},
		},
		deletedMessages: {
			type: new GraphQLList(GraphQLID),
			resolve: (payload) => {
				return payload.deletedMessageIds;
			},
		},
		newMessage: {
			type: MessageConnection.edgeType,
			resolve: async (payload, _args, ctx) => {
				if (!payload.newMessageId) return null;

				const node = await MessageLoader.load(ctx, payload.newMessageId);
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
			() =>
				pubSub.asyncIterator([
					events.message.new,
					events.message.edit,
					events.message.delete,
				]),
			async (payload: MessageSubscription) => {
				const chat = await ChatModel.findOne({
					_id: payload.chatId,
					users: ctx.user?.id,
				});

				return !!chat;
			},
		);
		return resolver(null, input, ctx);
	},
});
