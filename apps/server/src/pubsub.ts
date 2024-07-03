import { RedisPubSub } from "graphql-redis-subscriptions";

export const events = {
	message: {
		new: "MESSAGE:NEW",
		delete: "MESSAGE:DELETE",
		edit: "MESSAGE:EDIT",
	},
	chat: {
		typingStatus: "CHAT:TYPING",
		delete: "CHAT:DELETE",
		new: "CHAT:NEW",
	},
} as const;

export const pubSub = new RedisPubSub({
	publisher: new Redis({ lazyConnect: true }),
	subscriber: new Redis({ lazyConnect: true }),
});
