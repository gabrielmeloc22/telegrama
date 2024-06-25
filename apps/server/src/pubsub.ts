import { PubSub } from "graphql-subscriptions";

export const events = {
	message: {
		new: "MESSAGE:NEW",
		delete: "MESSAGE:DELETE",
		edit: "MESSAGE:EDIT",
	},
	chat: {
		typingStatus: "CHAT:TYPING",
		delete: "CHAT:DELETE",
	},
} as const;

export const pubSub = new PubSub();
