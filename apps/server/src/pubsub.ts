import { PubSub } from "graphql-subscriptions";

export const events = {
	message: {
		new: "MESSAGE:NEW",
	},
};
export const pubSub = new PubSub();
