import { type Document, Schema, type Types, model } from "mongoose";

export interface Chat extends Document {
	users: Types.ObjectId[];
}

const ChatSchema = new Schema<Chat>(
	{
		users: [{ type: Schema.Types.ObjectId, required: true }],
	},
	{
		collection: "Chat",
		timestamps: true,
	},
);

export const ChatModel = model<Chat>("Chat", ChatSchema);
