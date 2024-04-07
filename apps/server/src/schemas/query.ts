import { Node, Nodes } from "@/modules/node/register";
import { UserLoader } from "@/modules/user/UserLoader";
import { UserConnection } from "@/modules/user/UserType";
import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { connectionArgs } from "graphql-relay";

export const query = new GraphQLObjectType({
	name: "query",
	description: "Root query",
	fields: () => ({
		users: {
			type: new GraphQLNonNull(UserConnection.connectionType),
			args: connectionArgs,
			resolve: async (_, args, context) =>
				await UserLoader.loadAll(context, args),
		},
		node: Node,
		nodes: Nodes,
	}),
});
