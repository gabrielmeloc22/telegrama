import type { Context } from "@/context";
import { connectionArgs } from "@entria/graphql-mongo-helpers";
import { type GraphQLFieldConfig, GraphQLNonNull } from "graphql";
import type { ConnectionArguments } from "graphql-relay";
import { MessageLoader } from "../MessageLoader";
import { MessageConnection } from "../MessageType";

export const Messages: GraphQLFieldConfig<
	unknown,
	Context,
	ConnectionArguments
> = {
	type: new GraphQLNonNull(MessageConnection.connectionType),
	description: "All messages",
	args: connectionArgs,
	resolve: async (_, args, context) => {
		if (!context.user) {
			throw new Error("User not authenticated");
		}
		return await MessageLoader.loadAll(context, args);
	},
};
