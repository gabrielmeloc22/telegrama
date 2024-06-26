import { Chat } from "@/modules/chat/queries/Chat";
import { Chats } from "@/modules/chat/queries/Chats";
import { Messages } from "@/modules/message/queries/Messages";
import { Node, Nodes } from "@/modules/node/register";
import { Me } from "@/modules/user/queries/Me";
import { User } from "@/modules/user/queries/User";
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
		user: User,
		me: Me,
		chats: Chats,
		chat: Chat,
	}),
});
