import type { Context } from "@/context";
import { getChat } from "@/modules/chat/util/getChat";
import { connectionArgs, withFilter } from "@entria/graphql-mongo-helpers";
import {
	GraphQLNonNull,
	GraphQLString,
	type GraphQLFieldConfig,
} from "graphql";
import type { ConnectionArguments } from "graphql-relay";
import { MessageLoader } from "../MessageLoader";
import { MessageConnection } from "../MessageType";

export const Messages: GraphQLFieldConfig<
	unknown,
	Context,
	ConnectionArguments & { chatId: string; userId: string }
> = {
	type: new GraphQLNonNull(MessageConnection.connectionType),
	description: "All messages",
	args: {
		...connectionArgs,
		chatId: { description: "The chat id", type: GraphQLString },
		userId: {
			description: "The user id for individual chats",
			type: GraphQLString,
		},
	},
	resolve: async (_, args, ctx) => {
		if (!ctx.user) {
			throw new Error("User not authenticated");
		}
		const chatId = await getChat(ctx, args);

		return await MessageLoader.loadAll(
			ctx,
			withFilter(args, {
				chat: chatId,
			}),
		);
	},
};
