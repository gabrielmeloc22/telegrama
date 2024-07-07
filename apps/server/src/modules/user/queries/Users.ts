import type { Context } from "@/context";
import { connectionArgs, withFilter } from "@entria/graphql-mongo-helpers";
import { GraphQLNonNull, type GraphQLFieldConfig } from "graphql";
import type { ConnectionArguments } from "graphql-relay";
import {
	UserFilterInputType,
	UserLoader,
	type UserFilterType,
} from "../UserLoader";
import { UserConnection } from "../UserType";

export const Users: GraphQLFieldConfig<
	unknown,
	Context,
	ConnectionArguments & UserFilterType
> = {
	type: new GraphQLNonNull(UserConnection.connectionType),
	description: "All users",
	args: {
		...connectionArgs,
		filter: {
			type: UserFilterInputType,
		},
	},
	resolve: (_, { filter, ...args }, context) => {
		if (!context.user) {
			return new Error("Not authorized");
		}

		return UserLoader.loadAll(
			context,
			withFilter(args, {
				...filter,
				_id_ne: context.user.id,
			}),
		);
	},
};
