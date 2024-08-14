import { generateToken } from "@/auth";
import type { Chat } from "@/modules/chat/ChatModel";
import { createChat } from "@/modules/chat/fixture";
import { createUser } from "@/modules/user/fixture";
import { executeQuery } from "@/test/utils";
import { fromGlobalId, toGlobalId } from "graphql-relay";
import { setTimeout } from "node:timers/promises";
import { MessageModel } from "../../MessageModel";

const sendMessageMutation = ({
	content,
	localId,
	toId,
}: { content: string; toId: string; localId: number }) => ({
	query: `mutation sendMessageMutation($input: SendMessageInput!) {
    sendMessage (input: $input) {
			message {
				node {
					id
				}
			}
    }
  }
`,
	variables: {
		input: {
			content,
			localId,
			toId,
		},
	},
});

describe("message/mutations/SendMessage", () => {
	it("should be able to send a message to a chat", async () => {
		const user = await createUser();
		const chat = await createChat({ users: [user.id] });

		const token = generateToken(user);
		const mutation = sendMessageMutation({
			content: "hello",
			toId: toGlobalId("Chat", chat.id),
			localId: 0,
		});

		const res = await executeQuery(mutation, token);

		const messageId = fromGlobalId(
			res.body.data.sendMessage.message.node.id,
		).id;
		const message = await MessageModel.findById(messageId).populate<{
			chat: Chat;
		}>("chat");

		expect(message).toBeDefined();
		expect(message?.content).toEqual("hello");
		expect(message?.from.toString()).toEqual(user.id);
		expect(message?.chat.id).toEqual(chat.id);
		expect(message?.chat.lastMessage?.toString()).toEqual(message?.id);
	});

	it("should be able send a message to a user", async () => {
		const userA = await createUser();
		const userB = await createUser();

		const token = generateToken(userA);
		const mutation = sendMessageMutation({
			content: "hello",
			toId: toGlobalId("User", userB.id),
			localId: 0,
		});

		const res = await executeQuery(mutation, token);
		const messageId = fromGlobalId(
			res.body.data.sendMessage.message.node.id,
		).id;
		const message = await MessageModel.findById(messageId).populate<{
			chat: Chat;
		}>("chat");

		expect(message?.chat).toBeDefined();
		expect(message?.content).toEqual("hello");
		expect(message?.chat.lastMessage?.toString()).toEqual(messageId);
		expect(message?.from.toString()).toEqual(userA.id);

		expect(message?.chat.users.map((id) => id.toString())).toEqual(
			expect.arrayContaining([userA.id, userB.id]),
		);
	});

	it("should be able store messages in order", async () => {
		const userA = await createUser();
		const chat = await createChat({ users: [userA.id] });

		const token = generateToken(userA);

		const mutations = Array.from({ length: 3 }).map((_, i) =>
			sendMessageMutation({
				content: `hello:${i}`,
				toId: toGlobalId("User", chat.id),
				localId: i,
			}),
		);

		await Promise.all(
			mutations.map(async (data, i, arr) => {
				// force time delay between messages so that messages arrive in reverse order
				await setTimeout(1 * (arr.length - i));
				return executeQuery(data, token);
			}),
		);

		const messages = await MessageModel.find({ from: userA.id }).sort({
			createdAt: -1,
		});

		expect(messages).toEqual([
			expect.objectContaining({ localId: 2 }),
			expect.objectContaining({ localId: 1 }),
			expect.objectContaining({ localId: 0 }),
		]);
	});
});
