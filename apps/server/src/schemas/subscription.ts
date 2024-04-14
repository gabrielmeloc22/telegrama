import { NewMessage } from "@/modules/message/subscription/NewMessage";
import { GraphQLObjectType } from "graphql";

export const subscription = new GraphQLObjectType({
	name: "subscription",
	fields: () => ({
		newMessage: NewMessage,
	}),
});
