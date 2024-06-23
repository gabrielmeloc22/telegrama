"use client";

import { useUser } from "@/hooks/useUser";
import "@dotlottie/player-component";
import { NavigationStackTrigger } from "@ui/components";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import {
	useLazyLoadQuery,
	usePaginationFragment,
	useSubscription,
} from "react-relay";
import {
	ConnectionHandler,
	graphql,
	type GraphQLSubscriptionConfig,
} from "relay-runtime";
import type { chatItemFragment$key } from "../../../__generated__/chatItemFragment.graphql";
import type { chatListFragment$key } from "../../../__generated__/chatListFragment.graphql";
import type { chatListQuery } from "../../../__generated__/chatListQuery.graphql";
import type { chatListSubscription } from "../../../__generated__/chatListSubscription.graphql";
import { ChatItem } from "./chat-item";

const ChatListFragment = graphql`
  fragment chatListFragment on query
    @argumentDefinitions(
      cursor: { type: "String" }
      count: { type: "Int", defaultValue: 10 }
			search: {type: "String"}
    )
    @refetchable(queryName: "ChatListRefetchQuery")
  {
    chats(after: $cursor, first: $count, search: $search) 
      @connection(key: "ChatListFragment_chats")
    {
			__id
      edges {
        node {
					id
					user {
						_id
					}
          lastMessage {
						node {
            	createdAt
							content
						}
          }
          ...chatItemFragment 
        }
      }
    }
  }
`;

const ChatListQuery = graphql`
  query chatListQuery($search: String){
    ...chatListFragment @arguments(search: $search)
  }
`;

const ChatListSubscription = graphql`
  subscription chatListSubscription($input: MessageInput!,  $chatConnections: [ID!]!) {
    onMessage(input: $input) {
			newChat
			deletedMessages
			chat {
				user {
					_id
				}
			}
      newMessage {
				node {
					...chatMessageFragment
					from {
						_id
					}
					chat @appendEdge(connections: $chatConnections){
						cursor
						node {
							...chatItemFragment
						}
					}
        }
      }
    }
  }
`;

type ChatListProps = {
	filter?: string;
};

export function ChatList({ filter }: ChatListProps) {
	const user = useUser();
	const { id } = useParams();

	const chats = useLazyLoadQuery<chatListQuery>(ChatListQuery, {
		search: filter,
	});

	const { data, loadNext: _ } = usePaginationFragment<
		chatListQuery,
		chatListFragment$key
	>(ChatListFragment, chats);

	// biome-ignore lint/correctness/useExhaustiveDependencies: the relay docs suggest you to set the subscription as a dependency
	const config = useMemo<GraphQLSubscriptionConfig<chatListSubscription>>(
		() => ({
			subscription: ChatListSubscription,
			updater: (store, messageData) => {
				const newMessage = messageData?.onMessage?.newMessage?.node;
				const fromUserId =
					newMessage?.from._id === user?._id
						? messageData?.onMessage?.chat?.user?._id
						: newMessage?.from._id ?? messageData?.onMessage?.chat?.user?._id;

				const chat = store.getRootField("onMessage").getLinkedRecord("chat");
				store.getRoot().setLinkedRecord(chat, "chat", { userId: fromUserId });

				const messages = ConnectionHandler.getConnection(
					store.getRoot(),
					"ChatMessagesFragment_messages",
					{
						userId: fromUserId,
					},
				);

				if (messages && messageData?.onMessage?.deletedMessages) {
					for (const msgId of messageData.onMessage.deletedMessages) {
						msgId && ConnectionHandler.deleteNode(messages, msgId);
					}
				}

				if (newMessage) {
					const message = store
						.getRootField("onMessage")
						.getLinkedRecord("newMessage");

					if (messages && message) {
						ConnectionHandler.insertEdgeBefore(messages, message);
					}
				}
			},
			variables: {
				input: { userId: (id as string) ?? "" },
				chatConnections: [data.chats.__id],
			},
		}),
		[id, ChatListSubscription, data],
	);

	useSubscription<chatListSubscription>(config);

	// readonly arrays don't have sort
	// TODO: move this sort to the API
	const chatEdges = [...data.chats.edges];

	return (
		<div className="flex w-full flex-col justify-center">
			{chatEdges.length === 0 && (
				<NavigationStackTrigger navigate="forwards" asChild>
					<button
						type="button"
						className="flex w-4/5 flex-col items-center self-center rounded-xl p-4 dark:bg-neutral-500/10"
					>
						<p className="font-semibold text-sm">
							Seems like there are no chats here...
						</p>
						<p className="text-sm">Tap here and start a new one!</p>
						<dotlottie-player
							src="/assets/pigeon-greeting.lottie"
							loop
							autoplay
						/>
					</button>
				</NavigationStackTrigger>
			)}
			{chatEdges
				.sort((a, b) =>
					a?.node?.lastMessage?.node?.createdAt <
					b?.node?.lastMessage?.node?.createdAt
						? 1
						: -1,
				)
				.map((chatEdge) => (
					<motion.div
						key={chatEdge?.node?.user?._id ?? ""}
						layout="position"
						layoutId={chatEdge?.node?.user?._id}
						className="w-full dark:bg-neutral-800"
					>
						<ChatItem
							selected={chatEdge?.node?.user?._id === id}
							// TODO: figure out why the edge can be undefined
							chat={chatEdge?.node as chatItemFragment$key}
						/>
					</motion.div>
				))}
		</div>
	);
}
