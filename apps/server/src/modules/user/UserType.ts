import type { Context } from "@/context";
import { connectionDefinitions } from "@entria/graphql-mongo-helpers";
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { globalIdField } from "graphql-relay";
import { ChatModel } from "../chat/ChatModel";
import { ChatType } from "../chat/ChatType";
import { addTypeLoader, nodeInterface } from "../node/register";
import { UserLoader } from "./UserLoader";
import type { User } from "./UserModel";

export const UserType = new GraphQLObjectType<User, Context>({
	name: "User",
	fields: () => ({
		id: globalIdField("User"),
		_id: {
			type: new GraphQLNonNull(GraphQLString),
			description: "mongoose_id",
		},
		username: {
			type: new GraphQLNonNull(GraphQLString),
		},
		avatar: {
			type: GraphQLString,
		},
		email: {
			type: GraphQLString,
		},
		chat: {
			type: ChatType,
			description: "Chat between a user and the authenticated user",
			resolve: (user, _, ctx) =>
				ChatModel.findOne({
					users:
						user.id === ctx.user?.id
							? [user.id, user.id]
							: { $all: [user.id, ctx.user?.id] },
				}),
		},
	}),
	interfaces: [nodeInterface],
});

addTypeLoader(UserType, UserLoader.load);

export const UserConnection = connectionDefinitions({
	name: "User",
	nodeType: UserType,
});
