"use client";

import { DotLottiePlayer } from "@dotlottie/react-player";
import { NavigationStackTrigger } from "@ui/components";
import base64url from "base64-url";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useLazyLoadQuery, usePaginationFragment } from "react-relay";
import { graphql } from "relay-runtime";
import type { chatItemFragment$key } from "../../../__generated__/chatItemFragment.graphql";
import type { chatListFragment$key } from "../../../__generated__/chatListFragment.graphql";
import type { chatListQuery } from "../../../__generated__/chatListQuery.graphql";
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
				cursor
        node {
					id
					user {
						id
					}
					updatedAt
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

type ChatListProps = {
	filter?: string;
};

export function ChatList({ filter }: ChatListProps) {
	const params = useParams();
	const id = base64url.unescape(typeof params.id === "string" ? params.id : "");

	const chatsQuery = useLazyLoadQuery<chatListQuery>(ChatListQuery, {
		search: filter,
	});

	const { data: chatsData, loadNext: _ } = usePaginationFragment<
		chatListQuery,
		chatListFragment$key
	>(ChatListFragment, chatsQuery);

	// readonly arrays don't have sort
	// TODO: move this sort to the API
	const chatEdges = [...chatsData.chats.edges];

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
						<DotLottiePlayer
							src="/assets/pigeon-greeting.lottie"
							loop
							autoplay
						/>
					</button>
				</NavigationStackTrigger>
			)}
			{chatEdges
				.sort((a, b) => (a?.node?.updatedAt < b?.node?.updatedAt ? 1 : -1))
				.map((chatEdge) => {
					const chatId = chatEdge?.node?.user?.id || chatEdge?.node?.id;

					return (
						<motion.div
							key={chatEdge?.node?.id ?? ""}
							layout="position"
							className="w-full dark:bg-neutral-800"
						>
							<ChatItem
								selected={chatId === id}
								// TODO: figure out why the edge can be undefined
								chat={chatEdge?.node as chatItemFragment$key}
							/>
						</motion.div>
					);
				})}
		</div>
	);
}
