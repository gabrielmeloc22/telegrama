import { Schema, model, type Document, type Types } from "mongoose";

export interface Chat extends Document {
	users: Types.ObjectId[];
	lastMessage: Types.ObjectId | null;
	createdBy: Types.ObjectId | null;
	name?: string;
}

const ChatSchema = new Schema<Chat>(
	{
		name: { type: Schema.Types.String },
		createdBy: { type: Schema.Types.ObjectId, ref: "User" },
		users: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
		lastMessage: { type: Schema.Types.ObjectId, ref: "Message", default: null },
	},
	{
		collection: "Chat",
		timestamps: true,
	},
);

export const ChatModel = model<Chat>("Chat", ChatSchema);
