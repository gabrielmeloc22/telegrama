import type { Context } from "@/context";
import { GraphQLString, type GraphQLFieldConfig } from "graphql";
import { UserLoader } from "../UserLoader";
import { UserType } from "../UserType";

export const User: GraphQLFieldConfig<unknown, Context, { userId: string }> = {
	type: UserType,
	description: "A user",
	args: {
		userId: { type: GraphQLString },
	},
	resolve: (_, args, context) => {
		return UserLoader.load(context, args.userId);
	},
};
