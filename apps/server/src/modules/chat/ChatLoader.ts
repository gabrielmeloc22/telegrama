import { createLoader } from "@entria/graphql-mongo-helpers";
import { ChatModel } from "./ChatModel";

export const ChatLoader = createLoader({
	loaderName: "ChatLoader",
	model: ChatModel,
});
