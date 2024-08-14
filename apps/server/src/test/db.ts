import type { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

export const connect = async (db: MongoMemoryServer) => {
	const uri = db.getUri();

	return mongoose.connect(uri);
};

export const disconnect = async (db: MongoMemoryServer) => {
	await mongoose.connection.dropDatabase();
	await mongoose.connection.close();
	return db.stop();
};

export const clear = () => {
	return mongoose.connection.dropDatabase();
};
