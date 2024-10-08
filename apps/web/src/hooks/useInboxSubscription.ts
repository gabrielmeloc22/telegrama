"use client";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useSubscription } from "react-relay";
import {
	ConnectionHandler,
	type GraphQLSubscriptionConfig,
	graphql,
} from "relay-runtime";
import type { useInboxSubscription as useInboxSubscriptionType } from "../../__generated__/useInboxSubscription.graphql";
import { useUser } from "./useUser";

const UseInboxSubscription = graphql`
  subscription useInboxSubscription($input: MessageInput!, $chatConnections: [ID!]!) {
    onMessage(input: $input) {
			newChat
			deletedMessages
			deletedChat 
			chat @appendNode(connections: $chatConnections, edgeTypeName: "ChatEdge") {
				id
				group
				user {
					id
				}
				updatedAt
				...chatItemFragment
			}
      newMessage {
				node {
					id
					from {
						id
					}
					...chatMessageFragment
        }
      }
    }
  }
`;

const useInboxSubscription = () => {
	const router = useRouter();
	const currUser = useUser();

	const chatConnectionID = ConnectionHandler.getConnectionID(
		"root",
		"ChatListFragment_chats",
		{
			search: "",
		},
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const config = useMemo<GraphQLSubscriptionConfig<useInboxSubscriptionType>>(
		() => ({
			subscription: UseInboxSubscription,
			updater: (store, data) => {
				if (!data?.onMessage) return;

				const newMessage = data.onMessage.newMessage?.node;
				const chat = data?.onMessage?.chat;

				const messages = ConnectionHandler.getConnection(
					store.getRoot(),
					"ChatMessagesFragment_messages",
					{
						chatId: chat?.group ? chat?.id : chat?.user?.id,
					},
				);

				if (messages && data?.onMessage?.deletedMessages) {
					for (const msgId of data.onMessage.deletedMessages) {
						msgId && ConnectionHandler.deleteNode(messages, msgId);
					}
				}

				// Only handle incoming messages since out coming messages are handled on mutations
				if (
					newMessage &&
					data.onMessage.newMessage.node.from.id !== currUser?.id
				) {
					const message = store
						.getRootField("onMessage")
						.getLinkedRecord("newMessage");

					if (messages && message) {
						ConnectionHandler.insertEdgeBefore(messages, message);
					}
				}

				if (data?.onMessage?.deletedChat) {
					const chatConnection = store.get(chatConnectionID);

					chatConnection &&
						ConnectionHandler.deleteNode(
							chatConnection,
							data.onMessage.deletedChat,
						);
					store.delete(messages?.getDataID() ?? "");

					router.replace("/c");
				}
			},
			variables: {
				input: {},
				chatConnections: [chatConnectionID],
			},
		}),
		[UseInboxSubscription],
	);

	useSubscription<useInboxSubscriptionType>(config);
};

export { useInboxSubscription };
