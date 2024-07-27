import { printSchema } from "graphql";
import fs from "node:fs/promises";
import path from "node:path";

process.env.SCHEMA_GENERATION = "true";

(async () => {
	const filePath = path.resolve(__dirname, "..", "schema", "schema.graphql");
	const { schema } = await import("@/schemas");

	await fs.writeFile(filePath, printSchema(schema));
})();
