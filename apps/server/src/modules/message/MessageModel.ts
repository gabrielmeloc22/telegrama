import { type Document, Schema, type Types, model } from "mongoose";

export interface Message extends Document {
	to: Types.ObjectId;
	from: Types.ObjectId;
	delivered: boolean;
	deliveredAt?: Date;
	seen: boolean;
	seenAt?: Date;
	content: string;
	createdAt: Date;
	updatedAt: Date;
	chat: Types.ObjectId;
}

const MessageSchema = new Schema<Message>(
	{
		from: { type: Schema.Types.ObjectId, ref: "User", required: true },
		delivered: { type: Boolean, default: false, required: true },
		deliveredAt: Date,
		seen: { type: Boolean, default: false, required: true },
		seenAt: Date,
		content: { type: String, required: true },
		chat: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
	},
	{
		timestamps: true,
		collection: "Message",
	},
);

MessageSchema.index({ createdAt: -1 });

export const MessageModel = model<Message>("Message", MessageSchema);
