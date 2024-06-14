import type { Context } from "@/context";
import { ChatModel } from "../ChatModel";

export async function getChat(
	ctx: Context,
	args: { userId?: string; chatId?: string },
) {
	let chatId = "";

	if (args.chatId) {
		const id = args.chatId;

		const userInChat = await ChatModel.findOne({
			_id: id,
			users: { $elemMatch: { $eq: ctx.user?.id } },
		});

		if (!userInChat) {
			throw new Error("Not authorized");
		}
		chatId = id;
	}

	if (args.userId) {
		const id = args.userId;
		const selfChat = ctx.user?.id.toString() === id;

		const chat = await ChatModel.findOne({
			users: {
				$size: selfChat ? 1 : 2,
				$all: selfChat ? [ctx.user?.id] : [ctx.user?.id, id],
			},
		});
		chatId = chat?.id;
	}

	return chatId;
}
