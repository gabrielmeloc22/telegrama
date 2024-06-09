import { Schema, model, type Document } from "mongoose";

export interface User extends Document {
	username: string;
	email: string;
	password: string;
	avatar?: string;
}

const UserSchema = new Schema<User>(
	{
		username: { type: String, required: true, index: { unique: true } },
		email: { type: String, required: true, index: { unique: true } },
		password: { type: String, required: true, select: false },
		avatar: String,
	},
	{
		collection: "User",
		timestamps: true,
	},
);

export const UserModel = model<User>("User", UserSchema);
