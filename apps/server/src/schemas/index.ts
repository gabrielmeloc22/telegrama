import { GraphQLSchema } from "graphql";
import { mutation } from "./mutation";
import { query } from "./query";
import { subscription } from "./subscription";

export const schema = new GraphQLSchema({
	query,
	mutation,
	subscription,
});
