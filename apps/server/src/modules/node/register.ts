import type { GraphQLObjectType } from "graphql";
import { fromGlobalId, nodeDefinitions } from "graphql-relay";

import type { Context } from "@/context";

type Load = (context: Context, id: string) => unknown;
type TypeLoaders = {
	[key: string]: {
		type: GraphQLObjectType;
		load: Load;
	};
};

const typesLoaders: TypeLoaders = {};

const addTypeLoader = (type: GraphQLObjectType, load: Load) => {
	typesLoaders[type.name] = {
		type,
		load,
	};

	return type;
};

const {
	nodeField: Node,
	nodesField: Nodes,
	nodeInterface,
} = nodeDefinitions(
	async (globalId, context: Context) => {
		const { type, id } = fromGlobalId(globalId);

		const { load } = typesLoaders[type] || { load: null };

		return load?.(context, id) || null;
	},
	(obj) => {
		const { type } = typesLoaders[obj.constructor.name] || { type: null };

		return type.name;
	},
);

export { addTypeLoader, Node, nodeInterface, Nodes };
