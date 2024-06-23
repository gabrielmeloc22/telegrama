import { PubSub } from "graphql-subscriptions";

export const events = {
	message: {
		new: "MESSAGE:NEW",
		delete: "MESSAGE:DELETE",
		edit: "MESSAGE:EDIT",
	},
	chat: {
		typingStatus: "CHAT:TYPING",
	},
} as const;

export const pubSub = new PubSub();
