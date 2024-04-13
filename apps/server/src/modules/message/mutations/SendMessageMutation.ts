import type { Context } from "@/context";
import { UserModel } from "@/modules/user/UserModel";
import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { DateTimeResolver, GraphQLNonEmptyString } from "graphql-scalars";
import { MessageModel } from "../MessageModel";

type SendMessageInput = {
	to: string;
	content: string;
};

type SendMessageOutput = {
	content: string;
	createdAt: Date;
};

export const SendMessage = mutationWithClientMutationId<
	SendMessageInput,
	Promise<SendMessageOutput>,
	Context
>({
	name: "SendMessage",
	inputFields: {
		content: { type: GraphQLNonEmptyString },
		to: { type: new GraphQLNonNull(GraphQLString) },
	},
	outputFields: {
		content: { type: new GraphQLNonNull(GraphQLString) },
		createdAt: { type: DateTimeResolver },
	},
	mutateAndGetPayload: async ({ content, to }, { user }) => {
		if (!user) {
			throw new Error("Sender not specified");
		}

		const recipient = await UserModel.findById(to);

		if (!recipient) {
			throw new Error("Recipient does not exist");
		}

		const message = new MessageModel({
			content: content.trim(),
			from: user,
			to: recipient,
		});

		try {
			await message.save();
		} catch {
			throw new Error("Unexpected error");
		}

		return {
			content: message.content,
			createdAt: message.createdAt,
		};
	},
});
