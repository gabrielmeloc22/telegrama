import type { Context } from "@/context";
import { connectionArgs } from "@entria/graphql-mongo-helpers";
import { type GraphQLFieldConfig, GraphQLNonNull } from "graphql";
import type { ConnectionArguments } from "graphql-relay";
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
