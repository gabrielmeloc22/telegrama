import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
	schema: [
		"./apps/web/node_modules/relay-compiler/relay-extensions.graphql",
		"./apps/server/schema/schema.graphql",
	],
	documents: ["apps/web/src/**/*.ts", "apps/web/src/**/*.tsx"],
	// include: "app/web/src/**/*.{tsx,ts}",
};

export default config;
