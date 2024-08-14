import { type Chat, ChatModel } from "./ChatModel";

export const createChat = async (data: Partial<Chat> | undefined = {}) => {
	const chat = await ChatModel.create(data);
	await chat.save();

	return chat;
};
