import { schema } from "@/schemas";
import { printSchema } from "graphql";
import fs from "node:fs/promises";
import path from "node:path";

(async () => {
	const filePath = path.resolve(__dirname, "..", "schema", "schema.graphql");

	await fs.writeFile(filePath, printSchema(schema));
})();
