"use client";

import { type Sink, createClient } from "graphql-sse";
import cookies from "nookies";
import {
	Environment,
	type GraphQLResponse,
	Network,
	Observable,
	RecordSource,
	type RequestParameters,
	Store,
	type Variables,
} from "relay-runtime";

const subscriptionsClient = createClient({
	url: process.env.NEXT_PUBLIC_API_URL,
	headers: () => {
		const token = cookies.get().token;

		if (!token) return {};

		return {
			Authorization: `Bearer ${token}`,
		} as Record<string, string>;
	},
});

function fetchOrSubscribe(operation: RequestParameters, variables: Variables) {
	return Observable.create<GraphQLResponse>((sink) => {
		// prevent queries from happening on server since sse does not work quite well with react suspense on the server
		// TODO: investigate this behavior more

		if (!operation.text) {
			return sink.error(new Error("Operation text cannot be empty"));
		}

		return subscriptionsClient.subscribe(
			{
				operationName: operation.name,
				query: operation.text,
				variables,
			},
			sink as Sink,
		);
	});
}

export function createEnvironment() {
	const network = Network.create(fetchOrSubscribe, fetchOrSubscribe);
	const store = new Store(new RecordSource());

	return new Environment({
		store,
		network,
	});
}
