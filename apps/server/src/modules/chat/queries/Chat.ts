import type { Context } from "@/context";
import { GraphQLString, type GraphQLFieldConfig } from "graphql";
import { ChatLoader } from "../ChatLoader";
import { ChatType } from "../ChatType";
import { getChat } from "../util/getChat";

type ChatQueryArguments = {
	chatId?: string;
	userId?: string;
};

export const Chat: GraphQLFieldConfig<unknown, Context, ChatQueryArguments> = {
	type: ChatType,
	description: "A chat",
	args: {
		chatId: {
			description: "Chat id for use with group chats",
			type: GraphQLString,
		},
		userId: {
			description: "User id for use with individual chats",
			type: GraphQLString,
		},
	},
	resolve: async (_, args, ctx) => {
		const chatId = await getChat(ctx, args);

		if (!chatId) return null;

		return ChatLoader.load(ctx, chatId);
	},
};
