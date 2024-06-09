import type { Context } from "@/context";
import {
	connectionDefinitions,
	withFilter,
} from "@entria/graphql-mongo-helpers";
import {
	GraphQLBoolean,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from "graphql";
import { connectionArgs, globalIdField } from "graphql-relay";
import { MessageLoader } from "../message/MessageLoader";
import { MessageConnection, MessageType } from "../message/MessageType";
import { addTypeLoader, nodeInterface } from "../node/register";
import { UserLoader } from "../user/UserLoader";
import { UserModel } from "../user/UserModel";
import { UserConnection, UserType } from "../user/UserType";
import { ChatLoader } from "./ChatLoader";
import type { Chat } from "./ChatModel";

export const ChatType: GraphQLObjectType<Chat, Context> = new GraphQLObjectType<
	Chat,
	Context
>({
	name: "Chat",
	fields: () => ({
		id: globalIdField("Chat"),
		_id: {
			type: new GraphQLNonNull(GraphQLString),
			description: "mongoose_id",
		},
		user: {
			type: UserType,
			description: "The recipient when not a group chat",
			resolve: (chat, _, ctx) => {
				return (
					chat.users.length <= 2 &&
					UserModel.findById(
						chat.users.find(({ _id }) => !_id.equals(ctx.user?.id)) ??
							chat.users[0],
					)
				);
			},
		},
		name: {
			type: new GraphQLNonNull(GraphQLString),
			resolve: async (chat, _, ctx) =>
				chat.name ??
				(
					await UserModel.findById(
						chat.users.find(({ _id }) => !_id.equals(ctx.user?.id)) ??
							chat.users[0],
					)
				)?.username,
		},
		lastMessage: {
			type: MessageType,
			resolve: async (chat, _args, ctx) =>
				chat.lastMessage ? MessageLoader.load(ctx, chat.lastMessage) : null,
		},
		group: {
			type: GraphQLBoolean,
			resolve: (chat) => chat.users.length > 2,
		},
		users: {
			description: "Group chat users",
			args: connectionArgs,
			type: UserConnection.connectionType,
			resolve: (chat, args, ctx) => {
				return UserLoader.loadAll(
					ctx,
					withFilter(args, { _id_in: chat.users }),
				);
			},
		},
		messages: {
			type: MessageConnection.connectionType,
			args: connectionArgs,
			resolve: (chat, args, ctx) =>
				MessageLoader.loadAll(ctx, withFilter(args, { chat: chat.id })),
		},
	}),
	interfaces: [nodeInterface],
});

addTypeLoader(ChatType, ChatLoader.load);

export const ChatConnection = connectionDefinitions({
	name: "Chat",
	nodeType: ChatType,
});
