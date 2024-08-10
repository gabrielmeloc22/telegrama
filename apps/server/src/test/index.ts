import { MongoMemoryServer } from "mongodb-memory-server";
import { afterAll, afterEach, beforeAll } from "vitest";
import { clear, connect, disconnect } from "./db";

let db: MongoMemoryServer;

beforeAll(async () => {
	db = await MongoMemoryServer.create();
	await connect(db);
});

afterEach(async () => {
	await clear();
});

afterAll(() => {
	disconnect(db);
});
