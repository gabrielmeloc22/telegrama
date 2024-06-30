import type { Context } from "@/context";
import { ChatModel } from "@/modules/chat/ChatModel";
import type { MessageSubscription } from "@/modules/message/subscription/OnMessage";
import { UserModel } from "@/modules/user/UserModel";
import { events, pubSub } from "@/pubsub";
import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { ChatLoader } from "../ChatLoader";
import { ChatType } from "../ChatType";

type CreateGroupChatInput = {
	members: string[];
	name: string;
};

type CreateGroupChatOutput = {
	chatId: string;
};

export const CreateGroupChatMutation = mutationWithClientMutationId<
	CreateGroupChatInput,
	Promise<CreateGroupChatOutput>,
	Context
>({
	name: "CreateGroupChat",
	inputFields: {
		name: {
			description: "The group chat name",
			type: GraphQLString,
		},
		members: {
			description: "The members added to the group",
			type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
		},
	},
	outputFields: {
		chat: {
			type: ChatType,
			description: "The created group chat",
			resolve: async (out, _, ctx) => {
				const { chatId } = await out;

				return ChatLoader.load(ctx, chatId);
			},
		},
	},
	mutateAndGetPayload: async (input, ctx) => {
		if (!ctx.user) {
			throw new Error("user not authenticated");
		}

		const memberIds = input.members.map((id) => fromGlobalId(id).id);

		const users = await UserModel.find({
			_id: { $in: memberIds },
		});

		if (users.length !== input.members.length) {
			throw new Error("user not found");
		}

		const chat = new ChatModel({
			users: [...memberIds, ctx.user?._id],
			createdBy: ctx.user?.id,
			name: input.name,
		});
		await chat.save();

		await pubSub.publish(events.chat.new, {
			topic: events.chat.new,
			chatId: chat?.id,
		} satisfies MessageSubscription);

		return { chatId: chat.id };
	},
});
