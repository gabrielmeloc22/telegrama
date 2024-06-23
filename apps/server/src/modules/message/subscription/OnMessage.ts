import type { Context } from "@/context";
import { ChatLoader } from "@/modules/chat/ChatLoader";
import { ChatModel } from "@/modules/chat/ChatModel";
import { ChatType } from "@/modules/chat/ChatType";
import { getChat } from "@/modules/chat/util/getChat";
import { events, pubSub } from "@/pubsub";
import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLString } from "graphql";
import { toGlobalId } from "graphql-relay";
import { subscriptionWithClientId } from "graphql-relay-subscription";
import { withFilter } from "graphql-subscriptions";
import { MessageLoader } from "../MessageLoader";
import { MessageConnection } from "../MessageType";

type MessageSubscriptionInput = {
	userId?: string;
	chatId?: string;
};

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
	Context,
	MessageSubscriptionInput
>({
	name: "Message",
	inputFields: {
		userId: {
			type: GraphQLString,
		},
		chatId: {
			type: GraphQLString,
		},
	},
	outputFields: {
		newChat: { type: GraphQLBoolean, resolve: (payload) => payload.newChat },
		chat: {
			type: ChatType,
			resolve: async (payload, _, ctx) => ChatLoader.load(ctx, payload.chatId),
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
			async (payload: MessageSubscription, input: MessageSubscriptionInput) => {
				switch (payload.topic) {
					case "MESSAGE:NEW": {
						const chatId = await getChat(ctx, {
							chatId: input.chatId,
							userId: input.userId,
						});

						return chatId === payload.chatId;
					}

					case "MESSAGE:DELETE": {
						const chat = await ChatModel.find({
							users: { $all: ctx.user?.id.toString() },
						});

						return !!chat;
					}

					case "MESSAGE:EDIT":
						break;

					default:
						false;
				}
				return false;
			},
		);
		return resolver(null, input, ctx);
	},
});
