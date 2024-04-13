import type { Context } from "@/context";
import { type GraphQLFieldConfig, GraphQLNonNull } from "graphql";
import { type ConnectionArguments, connectionArgs } from "graphql-relay";
import { UserLoader } from "../UserLoader";
import { UserConnection } from "../UserType";

export const Users: GraphQLFieldConfig<unknown, Context, ConnectionArguments> =
	{
		type: new GraphQLNonNull(UserConnection.connectionType),
		description: "All users",
		args: connectionArgs,
		resolve: async (_, args, context) =>
			await UserLoader.loadAll(context, args),
	};
