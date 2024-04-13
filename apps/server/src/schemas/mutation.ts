import { Login } from "@/modules/user/mutations/LoginMutation";
import { Register } from "@/modules/user/mutations/RegisterMutation";
import { GraphQLObjectType } from "graphql";

export const mutation = new GraphQLObjectType({
	name: "mutation",
	fields: () => ({
		register: Register,
		login: Login,
	}),
});
