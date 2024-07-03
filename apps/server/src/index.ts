import { createSecureServer } from "node:http2";
import { app } from "./app";
import { connectDb } from "./database";

(async () => {
	await connectDb();

	const server = createSecureServer(
		{ cert: process.env.SSL_CERTIFICATE, key: process.env.SSL_KEY },
		app.callback(),
	);

	server.listen(process.env.PORT, () => {
		console.log(`🚀 Server running on port ${process.env.PORT}`);
	});
})();
