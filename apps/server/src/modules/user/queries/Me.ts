import type { Context } from "@/context";
import { connectionArgs } from "@entria/graphql-mongo-helpers";
import type { GraphQLFieldConfig } from "graphql";
import type { ConnectionArguments } from "graphql-relay";
import { UserLoader } from "../UserLoader";
import { UserType } from "../UserType";

export const Me: GraphQLFieldConfig<unknown, Context, ConnectionArguments> = {
	type: UserType,
	description: "me",
	args: connectionArgs,
	resolve: (_src, _args, context) => {
		if (!context.user) {
			throw new Error("User not authenticated");
		}
		return UserLoader.load(context, context.user.id);
	},
};
