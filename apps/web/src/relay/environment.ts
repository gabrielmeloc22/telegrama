"use client";

import cookies, { parseCookies } from "nookies";
import {
	Environment,
	type FetchFunction,
	Network,
	Observable,
	RecordSource,
	Store,
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

export function createEnvironment() {
	const network = Network.create(fetchFn);
	const store = new Store(new RecordSource());

	return new Environment({ store, network });
}
