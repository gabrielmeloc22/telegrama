import { Messages } from "@/modules/message/queries/Messages";
import { Node, Nodes } from "@/modules/node/register";
import { Users } from "@/modules/user/queries/Users";
import { GraphQLObjectType } from "graphql";

export const query = new GraphQLObjectType({
	name: "query",
	description: "Root query",
	fields: () => ({
		node: Node,
		nodes: Nodes,
		messages: Messages,
		users: Users,
	}),
});
