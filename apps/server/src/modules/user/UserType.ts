import { connectionDefinitions } from "@entria/graphql-mongo-helpers";
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { globalIdField } from "graphql-relay";
import { addTypeLoader, nodeInterface } from "../node/register";
import { UserLoader } from "./UserLoader";
import type { User } from "./UserModel";

export const UserType = new GraphQLObjectType<User>({
	name: "User",
	fields: () => ({
		id: globalIdField("User"),
		_id: {
			type: new GraphQLNonNull(GraphQLString),
			description: "mongoose_id",
			resolve: (user) => user._id.toString(),
		},
		username: {
			type: new GraphQLNonNull(GraphQLString),
			resolve: (user) => user.username,
		},
		avatar: {
			type: GraphQLString,
			resolve: (user) => user.avatar,
		},
		email: {
			type: GraphQLString,
			resolve: (user) => user.email,
		},
	}),
	interfaces: () => [nodeInterface],
});

addTypeLoader(UserType, UserLoader.load);

export const UserConnection = connectionDefinitions({
	name: "User",
	nodeType: UserType,
});
