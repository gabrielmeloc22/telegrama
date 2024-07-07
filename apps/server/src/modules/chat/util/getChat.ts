import type { Context } from "@/context";
import { ChatModel } from "../ChatModel";

export async function getChat(ctx: Context, args: { chatId: string }) {
	const id = args.chatId;
	const selfChat = ctx.user?.id.toString() === id;

	const chat = await ChatModel.findOne({
		$or: [
			{
				_id: id,
				users: ctx.user?.id,
			},
			{
				createdBy: null, // TODO: use a db flag to know when a chat is a group
				users: {
					$size: selfChat ? 1 : 2,
					$all: selfChat ? [ctx.user?.id] : [ctx.user?.id, id],
				},
			},
		],
	});

	return chat;
}
