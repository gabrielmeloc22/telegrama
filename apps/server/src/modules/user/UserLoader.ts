import type { FilterInput } from "@/dataloaders";
import {
	FILTER_CONDITION_TYPE,
	createLoader,
} from "@entria/graphql-mongo-helpers";
import { GraphQLInputObjectType, GraphQLString } from "graphql";
import escapeStringRegexp from "regex-escape";
import { UserModel } from "./UserModel";

const userFilterMapping = {
	username: {
		type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
		format: (v: string) => {
			return new RegExp(`^${escapeStringRegexp(v)}`);
		},
	},
};

export const UserLoader = createLoader({
	loaderName: "UserLoader",
	model: UserModel,
	filterMapping: userFilterMapping,
});

export const UserFilterInputType = new GraphQLInputObjectType({
	name: "UserFilter",
	fields: () => ({
		username: {
			type: GraphQLString,
		},
	}),
});

export type UserFilterType = FilterInput<{
	username?: string;
}>;
