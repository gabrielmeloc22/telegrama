import type { Context } from "@/context";
import { withFilter } from "@entria/graphql-mongo-helpers";
import { type GraphQLFieldConfig, GraphQLNonNull } from "graphql";
import { type ConnectionArguments, connectionArgs } from "graphql-relay";
import { ChatLoader } from "../ChatLoader";
import { ChatConnection } from "../ChatType";

export const Chats: GraphQLFieldConfig<unknown, Context, ConnectionArguments> =
	{
		type: new GraphQLNonNull(ChatConnection.connectionType),
		description: "My chats",
		args: connectionArgs,
		resolve: async (_, args, context) => {
			if (!context.user) {
				throw new Error("User not authenticated");
			}

			return await ChatLoader.loadAll(
				context,
				withFilter(args, {
					users: context.user?.id,
				}),
			);
		},
	};
