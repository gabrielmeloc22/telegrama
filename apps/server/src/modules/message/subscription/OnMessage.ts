import type { Context } from "@/context";
import { ChatLoader } from "@/modules/chat/ChatLoader";
import { ChatModel } from "@/modules/chat/ChatModel";
import { ChatType } from "@/modules/chat/ChatType";
import { events, pubSub } from "@/pubsub";
import { GraphQLBoolean, GraphQLID, GraphQLList } from "graphql";
import { toGlobalId } from "graphql-relay";
import { subscriptionWithClientId } from "graphql-relay-subscription";
import { withFilter } from "graphql-subscriptions";
import { MessageLoader } from "../MessageLoader";
import { MessageConnection } from "../MessageType";

type MessageTopics = (typeof events.message)[keyof typeof events.message];
type ChatTopics = Exclude<
	(typeof events.chat)[keyof typeof events.chat],
	"CHAT:TYPING"
>;

export type MessageSubscription = {
	topic: MessageTopics | ChatTopics;
	newMessageId?: string;
	deletedMessageIds?: string[];
	chatMembers?: string[];
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
			type: ChatType,
			resolve: async (payload, _, ctx) => ChatLoader.load(ctx, payload.chatId),
		},
		deletedChat: {
			type: GraphQLID,
			resolve: (payload) => {
				return payload.topic === "CHAT:DELETE"
					? toGlobalId("Chat", payload.chatId)
					: null;
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
					cursor: toGlobalId("Message", node.id),
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
					events.chat.delete,
				]),
			async (payload: MessageSubscription) => {
				switch (payload.topic) {
					case "CHAT:DELETE":
						return !!payload.chatMembers?.includes(ctx.user?.id.toString());

					default: {
						const chat = await ChatModel.findOne({
							_id: payload.chatId,
							users: ctx.user?.id,
						});
						return !!chat;
					}
				}
			},
		);
		return resolver(null, input, ctx);
	},
});
