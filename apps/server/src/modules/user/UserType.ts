import type { Context } from "@/context";
import { connectionDefinitions } from "@entria/graphql-mongo-helpers";
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { globalIdField } from "graphql-relay";
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
	}),
	interfaces: [nodeInterface],
});

addTypeLoader(UserType, UserLoader.load);

export const UserConnection = connectionDefinitions({
	name: "User",
	nodeType: UserType,
});
