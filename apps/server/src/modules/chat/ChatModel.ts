import { type Document, Schema, type Types, model } from "mongoose";

export interface Chat extends Document {
	users: Types.ObjectId[];
	lastMessage: Types.ObjectId | null;
}

const ChatSchema = new Schema<Chat>(
	{
		users: [{ type: Schema.Types.ObjectId, required: true }],
		lastMessage: { type: Schema.Types.ObjectId, ref: "Message", default: null },
	},
	{
		collection: "Chat",
		timestamps: true,
	},
);

export const ChatModel = model<Chat>("Chat", ChatSchema);
