import type { Context } from "@/context";
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
	ConnectionArguments & { chatId: string }
> = {
	type: new GraphQLNonNull(MessageConnection.connectionType),
	description: "All messages",
	args: {
		...connectionArgs,
		chatId: { type: new GraphQLNonNull(GraphQLString) },
	},
	resolve: async (_, { chatId, ...args }, context) => {
		if (!context.user) {
			throw new Error("User not authenticated");
		}

		return await MessageLoader.loadAll(
			context,
			withFilter(args, {
				chat: chatId,
			}),
		);
	},
};
