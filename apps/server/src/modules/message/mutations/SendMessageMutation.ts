import type { Context } from "@/context";
import { GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import {
	fromGlobalId,
	mutationWithClientMutationId,
	toGlobalId,
} from "graphql-relay";
import { GraphQLNonEmptyString } from "graphql-scalars";
import { MessageLoader } from "../MessageLoader";
import type { Message } from "../MessageModel";
import { MessageConnection } from "../MessageType";
import { sendMessage } from "./lib/sendMessage";

export type SendMessageInput = {
	toId: string;
	content: string;
	localId: number;
};

type SendMessageOutput = { message: Message };

export const SendMessage = mutationWithClientMutationId<
	SendMessageInput,
	Promise<SendMessageOutput>,
	Context
>({
	name: "SendMessage",
	inputFields: {
		content: { type: GraphQLNonEmptyString },
		toId: {
			type: new GraphQLNonNull(GraphQLString),
			description: "The recipient id, a user or a chat",
		},
		localId: {
			type: new GraphQLNonNull(GraphQLInt),
			description:
				"A int that identifies the message of a user in chat locally",
		},
	},
	outputFields: {
		message: {
			type: MessageConnection.edgeType,
			resolve: async (out, _, ctx) => {
				const node = await MessageLoader.load(
					ctx,
					(await out).message._id as string,
				);
				if (!node) return null;

				return {
					cursor: toGlobalId("Message", node.id),
					node,
				};
			},
		},
	},
	mutateAndGetPayload: async ({ toId, ...data }, ctx) => {
		if (!ctx.user) {
			throw new Error("Sender not specified");
		}

		const { message } = await sendMessage({
			...data,
			toId: fromGlobalId(toId).id,
			ctx,
		});

		return { message };
	},
});
