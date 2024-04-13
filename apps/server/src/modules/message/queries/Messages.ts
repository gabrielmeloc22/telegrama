import type { Context } from "@/context";
import { type GraphQLFieldConfig, GraphQLNonNull } from "graphql";
import { type ConnectionArguments, connectionArgs } from "graphql-relay";
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
	resolve: async (_, args, context) =>
		await MessageLoader.loadAll(context, args),
};
