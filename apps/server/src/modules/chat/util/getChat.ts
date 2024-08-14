import type { Context } from "@/context";
import { ChatModel } from "../ChatModel";

export async function getChat(ctx: Context, args: { chatId: string }) {
	const currentUserId = "userId" in ctx ? ctx.userId : ctx.user?.id.toString();

	const id = args.chatId;
	const selfChat = currentUserId === id;

	const chat = await ChatModel.findOne({
		$or: [
			{
				_id: id,
				users: currentUserId,
			},
			{
				createdBy: null, // TODO: use a db flag to know when a chat is a group
				users: {
					$size: selfChat ? 1 : 2,
					$all: selfChat ? [currentUserId] : [currentUserId, id],
				},
			},
		],
	});

	return chat;
}
