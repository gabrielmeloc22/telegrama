"use client";

import { type Sink, createClient } from "graphql-sse";
import cookies, { parseCookies } from "nookies";
import {
	Environment,
	type FetchFunction,
	Network,
	Observable,
	RecordSource,
	Store,
	type SubscribeFunction,
} from "relay-runtime";

const fetchFn: FetchFunction = (params, variables) => {
	const token = cookies.get().token ?? parseCookies(null);
	const response = fetch(process.env.NEXT_PUBLIC_API_URL, {
		method: "POST",
		headers: [
			["Content-Type", "application/json"],
			["Authorization", `Bearer ${token}`],
		],
		body: JSON.stringify({
			query: params.text,
			variables,
		}),
	});

	return Observable.from(response.then((data) => data.json()));
};

const subscriptionClient = createClient({
	url: `${process.env.NEXT_PUBLIC_API_URL}stream`,
	headers: () => {
		const token = cookies.get().token ?? parseCookies(null);

		return {
			Authorization: `Bearer ${token}`,
		};
	},
});

const subscribeFn: SubscribeFunction = (operation, variables) => {
	return Observable.create((sink) => {
		if (!operation.text) {
			return sink.error(new Error("Operation text cannot be empty"));
		}
		return subscriptionClient.subscribe(
			{
				operationName: operation.name,
				query: operation.text,
				variables,
			},
			sink as Sink,
		);
	});
};

export function createEnvironment() {
	const network = Network.create(fetchFn, subscribeFn);
	const store = new Store(new RecordSource());

	return new Environment({ store, network });
}
