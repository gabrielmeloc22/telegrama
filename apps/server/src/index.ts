import bodyParser from "@koa/bodyparser";
import cors from "@koa/cors";
import Router from "@koa/router";
import { execute, subscribe } from "graphql";
import {
	getGraphQLParameters,
	processRequest,
	sendResult,
} from "graphql-helix";
import koaPlayground from "graphql-playground-middleware-koa";
import { useServer } from "graphql-ws/lib/use/ws";
import Koa from "koa";
import logger from "koa-logger";
import mount from "koa-mount";
import { WebSocketServer } from "ws";
import { buildContext } from "./context";
import { connectDb } from "./database";
import { schema } from "./schemas";

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(bodyParser());
app.on("error", (error) => {
	console.log("App error:", error);
});

app.use(logger());

app.use(
	mount(
		"/graphiql",
		koaPlayground({
			endpoint: "http://localhost:4000/graphql",
			subscriptionEndpoint: "localhost:8080/graphql",
		}),
	),
);

app.use(async (ctx) => {
	const request = {
		body: ctx.request.body,
		headers: ctx.req.headers,
		method: ctx.request.method,
		query: ctx.request.query,
	};

	const { operationName, query, variables } = getGraphQLParameters(request);

	const result = await processRequest({
		operationName,
		query,
		variables,
		request,
		schema,
		contextFactory: () => buildContext(ctx),
	});

	ctx.respond = false;
	sendResult(result, ctx.res);
});

const port = process.env.PORT ?? "4000";

const server = app.listen(port, async () => {
	if (process.env.NODE_ENV !== "test") {
		await connectDb();
	}

	const wsServer = new WebSocketServer({
		server,
		path: "/graphql",
	});

	useServer(
		{
			schema,
			execute,
			subscribe,
			context: (ctx) =>
				buildContext({
					// @ts-expect-error find a better way to type the req context
					headers: { authorization: ctx.connectionParams.Authorization },
				}),
		},
		wsServer,
	);

	console.log(`🚀 Server listening on port ${port}.`);
});

app.use(router.routes()).use(router.allowedMethods());

export { app };
