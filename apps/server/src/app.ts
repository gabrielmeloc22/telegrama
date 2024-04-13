import bodyParser from "@koa/bodyparser";
import cors from "@koa/cors";
import Router from "@koa/router";
import {
	getGraphQLParameters,
	processRequest,
	renderGraphiQL,
	sendResult,
	shouldRenderGraphiQL,
} from "graphql-helix";
import koaPlayground from "graphql-playground-middleware-koa";
import { createHandler } from "graphql-sse";
import Koa from "koa";
import logger from "koa-logger";
import mount from "koa-mount";
import { buildContext } from "./context";
import { schema } from "./schemas";

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.on("error", (error) => {
	console.log("App error:", error);
});

app.use(logger());
app.use(cors());
app.use(mount("/graphql/stream", createHandler({ schema })));

router.all(
	"/graphiql",
	koaPlayground({
		endpoint: "/graphql",
	}),
);

router.all("/graphql", async (ctx) => {
	const request = {
		body: ctx.request.body,
		headers: ctx.req.headers,
		method: ctx.request.method,
		query: ctx.request.query,
	};

	if (shouldRenderGraphiQL(request)) {
		ctx.body = renderGraphiQL({});
		return;
	}

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

app.use(router.routes()).use(router.allowedMethods());

export { app };
