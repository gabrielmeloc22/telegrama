import type { Context } from "@/context";
import { connectionDefinitions } from "@entria/graphql-mongo-helpers";
import {
	GraphQLBoolean,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from "graphql";
import { globalIdField } from "graphql-relay";
import { DateTimeResolver } from "graphql-scalars";
import { addTypeLoader, nodeInterface } from "../node/register";
import { UserLoader } from "../user/UserLoader";
import { UserType } from "../user/UserType";
import { MessageLoader } from "./MessageLoader";
import type { Message } from "./MessageModel";

export const MessageType = new GraphQLObjectType<Message, Context>({
	name: "Message",
	fields: () => ({
		id: globalIdField("Message"),
		_id: {
			type: new GraphQLNonNull(GraphQLString),
			description: "mongoose_id",
			resolve: (msg) => msg._id.toString(),
		},
		to: {
			type: new GraphQLNonNull(UserType),
			resolve: (msg, _args, ctx) => UserLoader.load(ctx, msg.to),
		},
		from: {
			type: new GraphQLNonNull(UserType),
			resolve: (msg, _args, ctx) => UserLoader.load(ctx, msg.from),
		},
		delivered: {
			type: new GraphQLNonNull(GraphQLBoolean),
		},
		deliveredAt: {
			type: DateTimeResolver,
		},
		seen: {
			type: new GraphQLNonNull(GraphQLBoolean),
		},
		seenAt: {
			type: DateTimeResolver,
		},
		content: {
			type: new GraphQLNonNull(GraphQLString),
		},
		createdAt: {
			type: DateTimeResolver,
		},
	}),
	interfaces: [nodeInterface],
});

addTypeLoader(MessageType, MessageLoader.load);

export const MessageConnection = connectionDefinitions({
	name: "Message",
	nodeType: MessageType,
});
