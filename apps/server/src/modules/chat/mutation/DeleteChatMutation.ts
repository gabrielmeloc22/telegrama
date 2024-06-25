import type { Context } from "@/context";
import { ChatModel } from "@/modules/chat/ChatModel";
import { MessageModel } from "@/modules/message/MessageModel";
import type { MessageSubscription } from "@/modules/message/subscription/OnMessage";
import { events, pubSub } from "@/pubsub";
import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import {
	fromGlobalId,
	mutationWithClientMutationId,
	toGlobalId,
} from "graphql-relay";

type DeleteChatInput = {
	chatId: string;
};

type DeleteChatOutput = {
	deleted: string;
};

export const DeleteChatMutation = mutationWithClientMutationId<
	DeleteChatInput,
	Promise<DeleteChatOutput>,
	Context
>({
	name: "DeleteChat",
	inputFields: {
		chatId: {
			type: new GraphQLNonNull(GraphQLString),
		},
	},
	outputFields: {
		deletedId: {
			type: GraphQLID,
			description: "The deleted chat",
			resolve: async (out) => (await out).deleted,
		},
	},
	mutateAndGetPayload: async ({ chatId }, ctx) => {
		const chat = await ChatModel.findOne({
			_id: fromGlobalId(chatId).id,
			users: ctx.user?.id,
		});

		if (!chat) {
			throw new Error("chat not found");
		}

		const result = await ChatModel.deleteOne({
			_id: fromGlobalId(chatId).id,
			users: ctx.user?.id,
		});

		if (!result.acknowledged) {
			throw new Error("chat could not be deleted");
		}

		await MessageModel.deleteMany({
			chat: chat.id,
		});

		await pubSub.publish(events.chat.delete, {
			topic: events.chat.delete,
			chatId: chat?.id,
			chatMembers: chat.users.map((u) => u._id.toString()),
		} satisfies MessageSubscription);

		return { deleted: toGlobalId("Chat", chat?.id) };
	},
});
