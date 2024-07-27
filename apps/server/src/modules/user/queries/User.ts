import type { Context } from "@/context";
import { type GraphQLFieldConfig, GraphQLString } from "graphql";
import { fromGlobalId } from "graphql-relay";
import { UserLoader } from "../UserLoader";
import { UserType } from "../UserType";

export const User: GraphQLFieldConfig<unknown, Context, { userId: string }> = {
	type: UserType,
	description: "A user",
	args: {
		userId: { type: GraphQLString },
	},
	resolve: (_, args, context) => {
		return UserLoader.load(context, fromGlobalId(args.userId).id);
	},
};
