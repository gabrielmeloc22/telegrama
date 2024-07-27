import type { Context } from "@/context";
import {
	type GraphQLFieldConfig,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { fromGlobalId } from "graphql-relay";
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
		if (!args.id) return null;

		const chat = await getChat(ctx, { chatId: fromGlobalId(args.id).id });

		if (!chat) return null;

		return ChatLoader.load(ctx, chat.id);
	},
};
