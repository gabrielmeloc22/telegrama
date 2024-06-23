import type { Context } from "@/context";
import { UserModel } from "@/modules/user/UserModel";
import { withFilter } from "@entria/graphql-mongo-helpers";
import escapeStringRegexp from "escape-string-regexp";
import {
	GraphQLNonNull,
	GraphQLString,
	type GraphQLFieldConfig,
} from "graphql";
import { connectionArgs, type ConnectionArguments } from "graphql-relay";
import { ChatLoader } from "../ChatLoader";
import { ChatConnection } from "../ChatType";

export const Chats: GraphQLFieldConfig<
	unknown,
	Context,
	ConnectionArguments & { search: string }
> = {
	type: new GraphQLNonNull(ChatConnection.connectionType),
	description: "My chats",
	args: {
		search: {
			type: GraphQLString,
		},
		...connectionArgs,
	},
	resolve: async (_, args, context) => {
		if (!context.user) {
			throw new Error("User not authenticated");
		}

		const users = await UserModel.find({
			username: new RegExp(`^${escapeStringRegexp(args.search)}`),
		});

		return await ChatLoader.loadAll(
			context,
			withFilter(args, {
				...(args.search
					? {
							$or: [
								{
									group: true,
									name: new RegExp(`^${escapeStringRegexp(args.search)}`),
								},
								{
									group: false,
									users: { $in: users.map((u) => u.id) },
								},
							],
						}
					: {
							users: context.user?.id,
						}),
			}),
		);
	},
};
