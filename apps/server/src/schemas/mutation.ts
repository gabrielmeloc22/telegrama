import { CreateGroupChatMutation } from "@/modules/chat/mutation/CreateGroupMutation";
import { DeleteChatMutation } from "@/modules/chat/mutation/DeleteChatMutation";
import { SendTypingStatusMutation } from "@/modules/chat/mutation/TypingStatusMutation";
import { DeleteMessageMutation } from "@/modules/message/mutations/DeleteMessageMutation";
import { SendMessage } from "@/modules/message/mutations/SendMessageMutation";
import { Login } from "@/modules/user/mutations/LoginMutation";
import { Register } from "@/modules/user/mutations/RegisterMutation";
import { GraphQLObjectType } from "graphql";

export const mutation = new GraphQLObjectType({
	name: "mutation",
	fields: () => ({
		register: Register,
		login: Login,
		sendMessage: SendMessage,
		sendTypingStatus: SendTypingStatusMutation,
		deleteMessage: DeleteMessageMutation,
		deleteChat: DeleteChatMutation,
		createGroupChat: CreateGroupChatMutation,
	}),
});
