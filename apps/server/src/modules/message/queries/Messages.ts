import type { Context } from "@/context";
import { getChat } from "@/modules/chat/util/getChat";
import { connectionArgs, withFilter } from "@entria/graphql-mongo-helpers";
import {
	type GraphQLFieldConfig,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { type ConnectionArguments, fromGlobalId } from "graphql-relay";
import { MessageLoader } from "../MessageLoader";
import { MessageConnection } from "../MessageType";

export const Messages: GraphQLFieldConfig<
	unknown,
	Context,
	ConnectionArguments & { chatId: string }
> = {
	type: new GraphQLNonNull(MessageConnection.connectionType),
	description: "All messages",
	args: {
		...connectionArgs,
		chatId: {
			description: "Either the chat id or an user id for individual chats",
			type: new GraphQLNonNull(GraphQLString),
		},
	},
	resolve: async (_, args, ctx) => {
		if (!ctx.user) {
			throw new Error("User not authenticated");
		}

		const chat = await getChat(ctx, {
			chatId: fromGlobalId(args.chatId).id,
		});

		return await MessageLoader.loadAll(
			ctx,
			withFilter(args, {
				chat: chat?.id,
			}),
		);
	},
};
