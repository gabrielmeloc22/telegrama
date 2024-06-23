import { useUser } from "@/hooks/useUser";
import {
	AnimatePresence,
	LayoutGroup,
	motion,
	type HTMLMotionProps,
} from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { usePaginationFragment, useSubscription } from "react-relay";
import { graphql, type GraphQLSubscriptionConfig } from "relay-runtime";
import type { chatLayoutQuery } from "../../../__generated__/chatLayoutQuery.graphql";
import type { chatMessagesFragment$key } from "../../../__generated__/chatMessagesFragment.graphql";
import type { chatMessagesTypingStatusSubscription } from "../../../__generated__/chatMessagesTypingStatusSubscription.graphql";
import { ChatMessage } from "./chat-message";

const ChatMessageFragment = graphql`
  fragment chatMessagesFragment on query
  @argumentDefinitions(
    cursor: { type : "String"}
    count: { type: "Int", defaultValue: 50}
		userId: { type: "String" }
  )
  @refetchable(queryName: "chatMessagesRefetchQuery")
  {
    messages(userId: $userId, after: $cursor, first: $count) 
    @connection(key: "ChatMessagesFragment_messages")
    {
      edges {
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

export const ChatMessagesTypingStatusSubscription = graphql`
	subscription chatMessagesTypingStatusSubscription($input: onTypeInput!){
		onType(input: $input) {
			typing
			userId
		}
	}

`;

type ChatMessagesProps = {
	messages: chatMessagesFragment$key;
	chatId: string;
	selected: string[];
	onSelect: (id: string | null) => void;
	selectable: boolean;
	setSelectable: React.Dispatch<React.SetStateAction<boolean>>;
	onDelete: (id: string) => void;
};

export function ChatMessages({
	messages,
	chatId,
	onSelect,
	selected,
	selectable,
	setSelectable,
	onDelete,
}: ChatMessagesProps) {
	const currUser = useUser();

	const [typing, setTyping] = useState(false);
	const { data, loadNext, hasNext } = usePaginationFragment<
		chatLayoutQuery,
		chatMessagesFragment$key
	>(ChatMessageFragment, messages);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const config = useMemo<
		GraphQLSubscriptionConfig<chatMessagesTypingStatusSubscription>
	>(
		() => ({
			subscription: ChatMessagesTypingStatusSubscription,
			onNext: (res) => {
				if (res?.onType && res.onType.userId !== currUser?.id) {
					setTyping(res.onType?.typing ?? false);
				}
			},
			variables: {
				input: { chatId },
			},
		}),
		[chatId, ChatMessagesTypingStatusSubscription],
	);

	useSubscription(config);

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape" && selectable) {
				setSelectable(false);
				onSelect(null);
			}
		};
		document.addEventListener("keydown", onKeyDown);

		return () => {
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [selectable, setSelectable, onSelect]);

	const messagesData = data?.messages?.edges;

	return (
		<div
			className="flex h-screen w-full flex-col-reverse gap-1 overflow-y-auto overflow-x-hidden py-10"
			onScroll={(e) => {
				if (
					hasNext &&
					e.currentTarget.scrollHeight + e.currentTarget.scrollTop - 200 ===
						e.currentTarget.clientHeight - 200
				) {
					loadNext(50);
				}
			}}
		>
			<LayoutGroup>
				<AnimatePresence>
					{typing && (
						<MessageMotionWrapper
							className="mx-[22.5%] h-[32px] w-fit rounded-xl px-4 py-2 dark:bg-neutral-800"
							exit={{ y: 100, opacity: 0 }}
						>
							<dotlottie-player src="/assets/loading.lottie" loop autoplay />
						</MessageMotionWrapper>
					)}
					{messagesData?.map(
						(message) =>
							message?.node && (
								<MessageMotionWrapper key={message.node.id}>
									<ChatMessage
										message={message.node}
										selected={selected.includes(message.node.id)}
										selectable={selectable}
										setSelectable={setSelectable}
										onDelete={() => onDelete(message.node?.id ?? "")}
										onSelect={() => onSelect(message.node?.id ?? "")}
									/>
								</MessageMotionWrapper>
							),
					)}
				</AnimatePresence>
			</LayoutGroup>
		</div>
	);
}

const MessageMotionWrapper = (props: HTMLMotionProps<"div">) => {
	return (
		<motion.div
			layout="position"
			initial={{
				y: 50,
				opacity: 0,
			}}
			animate={{
				opacity: 1,
				y: 0,
				transition: {
					duration: 0.1,
				},
			}}
			exit={{
				x: 50,
				opacity: 0,
			}}
			transition={{
				duration: 0.2,
				ease: "easeInOut",
				bounce: {
					type: "spring",
				},
			}}
			{...props}
		/>
	);
};
