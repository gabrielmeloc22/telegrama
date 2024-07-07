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
import { connectionArgs, globalIdField, toGlobalId } from "graphql-relay";
import { DateTimeResolver } from "graphql-scalars";
import { MessageLoader } from "../message/MessageLoader";
import { MessageConnection } from "../message/MessageType";
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
				return !chat.createdBy
					? UserModel.findById(
							chat.users.find(({ _id }) => !_id.equals(ctx.user?.id)) ??
								chat.users[0],
						)
					: null;
			},
		},
		name: {
			type: new GraphQLNonNull(GraphQLString),
			resolve: async (chat, _, ctx) => {
				const selfChat =
					chat.users.length === 1 && chat.users[0].equals(ctx.user?.id);

				return selfChat
					? "Saved Messages"
					: chat.name ??
							(
								await UserModel.findById(
									chat.users.find(({ _id }) => !_id.equals(ctx.user?.id)) ??
										chat.users[0],
								)
							)?.username;
			},
		},
		lastMessage: {
			type: MessageConnection.edgeType,
			resolve: async (chat, _args, ctx) => {
				const node = chat.lastMessage
					? await MessageLoader.load(ctx, chat.lastMessage)
					: null;

				if (!node) return null;

				return {
					cursor: toGlobalId("Message", node?.id),
					node,
				};
			},
		},
		group: {
			type: GraphQLBoolean,
			resolve: (chat) => !!chat.createdBy,
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
		updatedAt: {
			type: DateTimeResolver,
		},
		createdAt: {
			type: DateTimeResolver,
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
