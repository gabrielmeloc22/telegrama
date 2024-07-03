import bodyParser from "@koa/bodyparser";
import cors from "@koa/cors";
import koaPlayground from "graphql-playground-middleware-koa";
import { createHandler } from "graphql-sse/lib/use/koa";
import Koa from "koa";
import logger from "koa-logger";
import mount from "koa-mount";
import { buildContext } from "./context";
import { schema } from "./schemas";

const app = new Koa();

app.use(bodyParser());
app.on("error", (error) => {
	console.log("App error:", error);
});

app.use(logger());
app.use(cors());
app.use(
	mount(
		"/graphql/stream",
		createHandler({
			schema,
			context: ({ context }) => buildContext(context),
		}),
	),
);

app.use(
	mount(
		"/graphiql",
		koaPlayground({
			endpoint: "/graphql",
		}),
	),
);

export { app };
