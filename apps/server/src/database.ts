import mongoose from "mongoose";

export const connectDb = async () => {
	mongoose.set("strictQuery", true);
	await mongoose.connect(process.env.DATABASE_URL);
};
