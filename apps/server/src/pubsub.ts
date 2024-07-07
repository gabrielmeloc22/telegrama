import { RedisPubSub } from "graphql-redis-subscriptions";
import Redis from "ioredis";

export const events = {
	message: {
		new: "MESSAGE:NEW",
		delete: "MESSAGE:DELETE",
		edit: "MESSAGE:EDIT",
	},
	chat: {
		typing: "CHAT:TYPING",
		delete: "CHAT:DELETE",
		new: "CHAT:NEW",
	},
} as const;

export const pubSub = new RedisPubSub({
	publisher: new Redis({ lazyConnect: true }),
	subscriber: new Redis({ lazyConnect: true }),
});
