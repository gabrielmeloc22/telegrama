import type { Context } from "@/context";
import { ChatModel } from "@/modules/chat/ChatModel";
import { events, pubSub } from "@/pubsub";
import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { MessageModel } from "../MessageModel";
import type { MessageSubscription } from "../subscription/OnMessage";

type DeleteMessageInput = {
	ids: string[];
	chatId: string;
};

type DeleteMessageOutput = {
	deleted: string[];
};

export const DeleteMessageMutation = mutationWithClientMutationId<
	DeleteMessageInput,
	Promise<DeleteMessageOutput>,
	Context
>({
	name: "DeleteMessage",
	inputFields: {
		chatId: {
			type: new GraphQLNonNull(GraphQLString),
		},
		ids: {
			type: new GraphQLList(GraphQLID),
			description: "The messages id to be deleted",
		},
	},
	outputFields: {
		deletedIds: {
			type: new GraphQLList(GraphQLID),
			description: "The messages id to be deleted",
			resolve: async (out) => (await out).deleted,
		},
	},
	mutateAndGetPayload: async ({ ids, chatId }) => {
		const chat = await ChatModel.findById(fromGlobalId(chatId).id);

		// TODO: deal better with edge cases (e.g message ids from different chats should throw an error)
		const _result = await MessageModel.deleteMany({
			_id: { $in: ids.map((id) => fromGlobalId(id).id) },
			chat: chat?.id,
		});

		if (chat) {
			chat.lastMessage = (
				await MessageModel.findOne(
					{
						chat: chat.id,
					},
					{},
					{ sort: { createdAt: -1 } },
				)
			)?.id;

			await chat.save();
		}

		await pubSub.publish(events.message.delete, {
			topic: events.message.delete,
			chatId: chat?.id,
			deletedMessageIds: ids,
		} satisfies MessageSubscription);

		return { deleted: ids };
	},
});
