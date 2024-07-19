"use client";

import { type Sink, createClient } from "graphql-ws";
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
	connectionParams: () => {
		const token = cookies.get().token;

		if (!token) return {};

		return {
			Authorization: `Bearer ${token}`,
		} as Record<string, string>;
	},
});

function fetchOrSubscribe(
	operation: RequestParameters,
	variables: Variables,
): Observable<GraphQLResponse> {
	return Observable.create((sink) => {
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
