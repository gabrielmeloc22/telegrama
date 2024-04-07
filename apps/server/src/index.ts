import { createServer } from "node:http";
import { app } from "./app";
import { connectDb } from "./database";

(async () => {
	await connectDb();
	const server = createServer(app.callback());

	server.listen(process.env.PORT, () => {
		console.log(`🚀 Server running on port ${process.env.PORT}`);
	});
})();
