import request from "supertest";
import { app } from "..";

type Query = {
	query: string;
	variables?: object;
};

export function executeQuery(query: Query, token?: string) {
	const headers: Record<string, string> = {
		Accept: "application/json",
		"Content-Type": "application/json",
	};

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	return request(app.callback())
		.post("/graphql")
		.set(headers)
		.send(JSON.stringify(query));
}
