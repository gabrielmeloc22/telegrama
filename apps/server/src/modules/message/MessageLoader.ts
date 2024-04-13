import { createLoader } from "@entria/graphql-mongo-helpers";
import { MessageModel } from "./MessageModel";

export const MessageLoader = createLoader({
	loaderName: "MessageLoader",
	model: MessageModel,
	defaultSort: { createdAt: -1 },
});
