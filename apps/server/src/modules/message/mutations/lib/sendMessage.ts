import type { Context } from "@/context";
import { ChatModel } from "@/modules/chat/ChatModel";
import { getChat } from "@/modules/chat/util/getChat";
import { UserModel } from "@/modules/user/UserModel";
import { events, pubSub } from "@/pubsub";
import { startSession } from "mongoose";
import { setInterval } from "node:timers/promises";
import { MessageModel } from "../../MessageModel";
import type { MessageSubscription } from "../../subscription/OnMessage";
import type { SendMessageInput } from "../SendMessageMutation";

type SendMessageArgs = { ctx: Context } & SendMessageInput;

type GetUserLastMessageArgs = {
	chatId: string;
	senderId: string;
};

type CheckLocalIdArgs = GetUserLastMessageArgs & {
	localId: number;
};

const INTERVAL_TIME = 100;
const MAX_TIMEOUT = 2000;

const getUserLastMessage = ({ chatId, senderId }: GetUserLastMessageArgs) =>
	MessageModel.findOne({
		chat: chatId,
		from: senderId,
	})
		.sort({ createdAt: -1 })
		.exec();

const checkLocalId = async ({
	chatId,
	localId,
	senderId,
}: CheckLocalIdArgs) => {
	for await (const startTime of setInterval(INTERVAL_TIME, Date.now())) {
		const now = Date.now();
		const senderLastMessage = await getUserLastMessage({
			chatId,
			senderId,
		});

		/** We can only assure message ordering if all messages get
		 to the server within the waiting time, otherwise, instead of
		 discarding the data, it gets processed right away
		 **/
		if (
			(!senderLastMessage && localId === 0) ||
			(senderLastMessage && senderLastMessage.localId + 1 === localId) ||
			now - startTime > MAX_TIMEOUT
		) {
			break;
		}
	}
};

export const sendMessage = async ({
	content,
	toId,
	localId,
	ctx,
}: SendMessageArgs) => {
	const fromId = ctx.user?.id.toString();

	const selfMessage = toId === fromId;

	let chat = await getChat(ctx, { chatId: toId });

	if (chat) {
		await checkLocalId({ chatId: chat?.id, senderId: fromId, localId });
	}

	const recipient = await UserModel.findById(toId);

	if (!chat && !recipient) {
		throw new Error("Recipient not specified");
	}

	let newChat = false;

	if (!chat) {
		newChat = true;
		chat = new ChatModel({
			users: selfMessage ? [fromId] : [recipient?.id, fromId],
		});
	}

	const message = new MessageModel({
		content,
		from: fromId,
		localId,
	});

	const session = await startSession();

	try {
		chat.lastMessage = message.id;
		message.chat = chat.id;

		await message.save({ session });
		await chat.save({ session });
	} catch (e) {
		throw new Error(`unexpected error: \n${e}`);
	} finally {
		await session.endSession();
	}

	await pubSub.publish(events.message.new, {
		topic: events.message.new,
		newMessageId: message.id,
		chatId: chat.id,
		newChat,
	} satisfies MessageSubscription);

	return { message, chat, newChat };
};
