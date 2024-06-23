import { OnTypeSubscription } from "@/modules/chat/subscription/TypingStatusSubscription";
import { MessageSubscription } from "@/modules/message/subscription/OnMessage";
import { GraphQLObjectType, type GraphQLFieldConfig } from "graphql";

type GenericField = GraphQLFieldConfig<unknown, unknown, unknown>;

export const subscription = new GraphQLObjectType({
	name: "subscription",
	fields: () => ({
		// TODO: figure out why the field config types clash here
		onMessage: MessageSubscription as GenericField,
		onType: OnTypeSubscription as GenericField,
	}),
});
