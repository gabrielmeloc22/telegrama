import type { Context } from "@/context";
import {
	FILTER_CONDITION_TYPE,
	connectionArgs,
	withFilter,
} from "@entria/graphql-mongo-helpers";
import escapeStringRegexp from "escape-string-regexp";
import {
	GraphQLNonNull,
	GraphQLString,
	type GraphQLFieldConfig,
} from "graphql";
import type { ConnectionArguments } from "graphql-relay";
import { UserLoader } from "../UserLoader";
import { UserConnection } from "../UserType";

export const Users: GraphQLFieldConfig<
	unknown,
	Context,
	ConnectionArguments & { query: string }
> = {
	type: new GraphQLNonNull(UserConnection.connectionType),
	description: "All users",
	args: {
		...connectionArgs,
		query: { type: GraphQLString },
	},
	resolve: async (_, args, context) =>
		await UserLoader.loadAll(
			context,
			withFilter(args, {
				username: {
					type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
					format: (v: string) => new RegExp(` /.*${escapeStringRegexp(v)}.*/`),
				},
			}),
		),
};
