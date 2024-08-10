import tsConfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [tsConfigPaths()],
	test: { globals: true, setupFiles: ["dotenv/config", "src/test/index.ts"] },
	resolve: { alias: { graphql: "graphql/index.js" } },
});
