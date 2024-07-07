import type { Context } from "@/context";
import {
	GraphQLNonNull,
	GraphQLString,
	type GraphQLFieldConfig,
} from "graphql";
import { ChatLoader } from "../ChatLoader";
import { ChatType } from "../ChatType";
import { getChat } from "../util/getChat";

type ChatQueryArguments = {
	id: string;
};

export const Chat: GraphQLFieldConfig<unknown, Context, ChatQueryArguments> = {
	type: ChatType,
	description: "A chat",
	args: {
		id: {
			description: "Either the chat id or an user id for individual chats",
			type: new GraphQLNonNull(GraphQLString),
		},
	},
	resolve: async (_, args, ctx) => {
		const chat = await getChat(ctx, { chatId: args.id });

		if (!chat) return null;

		return ChatLoader.load(ctx, chat.id);
	},
};
