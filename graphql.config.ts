import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
  schema: [
    "http://localhost:4000/graphql",
    "./apps/web/node_modules/relay-compiler/relay-extensions.graphql",
  ],
  documents: ["apps/web/src/**/*.ts", "apps/web/src/**/*.tsx"],
  // include: "app/web/src/**/*.{tsx,ts}",
};

export default config;
