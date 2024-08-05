import { useTypingStatusSubscription } from "@/hooks/useTypingStatusSubscription";
import { useUser } from "@/hooks/useUser";
import { setNextLocalId } from "@/utils/localId";
import { DotLottiePlayer } from "@dotlottie/react-player";
import { cn } from "@ui/lib/utils";
import {
	AnimatePresence,
	type HTMLMotionProps,
	LayoutGroup,
	motion,
} from "framer-motion";
import { useEffect } from "react";
import { usePaginationFragment } from "react-relay";
import { graphql } from "relay-runtime";
import type { chatLayoutQuery } from "../../../__generated__/chatLayoutQuery.graphql";
import type { chatMessagesFragment$key } from "../../../__generated__/chatMessagesFragment.graphql";
import { ChatMessage } from "./chat-message";

const ChatMessageFragment = graphql`
  fragment chatMessagesFragment on query
  @argumentDefinitions(
    cursor: { type : "String"}
    count: { type: "Int", defaultValue: 50}
		chatId: { type: "String!" }
  )
  @refetchable(queryName: "chatMessagesRefetchQuery")
  {
    messages(chatId: $chatId, after: $cursor, first: $count) 
    @connection(key: "ChatMessagesFragment_messages")
    {
      edges {
        node {
          id
					localId
					from {
						id
					}
          ...chatMessageFragment
        }
      }
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
	const currentUser = useUser();
	const { data, loadNext, hasNext } = usePaginationFragment<
		chatLayoutQuery,
		chatMessagesFragment$key
	>(ChatMessageFragment, messages);

	const userTyping = useTypingStatusSubscription({ chatId });

	useEffect(() => {
		const message = data.messages.edges.find(
			(e) => e?.node?.from.id === currentUser?.id,
		);
		if (message) {
			setNextLocalId(chatId, (message?.node?.localId ?? 0) + 1);
		}
	}, [data, chatId, currentUser]);

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
					{userTyping && (
						<MessageMotionWrapper
							className="mx-[22.5%] h-7 w-fit rounded-xl px-4 py-2 dark:bg-neutral-800"
							exit={{ y: 100, opacity: 0 }}
						>
							<DotLottiePlayer
								src="/assets/loading.lottie"
								loop
								autoplay
								className="size-4"
							/>
						</MessageMotionWrapper>
					)}
					{messagesData?.map((message, i) => {
						const firstOfSequence =
							messagesData[i + 1]?.node?.from.id !== message?.node?.from.id;
						const lastOfSequence =
							messagesData[i - 1]?.node?.from.id !== message?.node?.from.id;

						return (
							message?.node && (
								<MessageMotionWrapper
									key={`${currentUser?.id}${message.node.localId}`}
									className={cn(firstOfSequence && "mt-2")}
								>
									<ChatMessage
										lastOfSequence={lastOfSequence}
										firstOfSequence={firstOfSequence}
										message={message.node}
										selected={selected.includes(message.node.id)}
										selectable={selectable}
										setSelectable={setSelectable}
										onDelete={() => onDelete(message.node?.id ?? "")}
										onSelect={() => onSelect(message.node?.id ?? "")}
									/>
								</MessageMotionWrapper>
							)
						);
					})}
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
				y: 100,
				opacity: 0,
			}}
			animate={{
				opacity: 1,
				y: 0,
			}}
			exit={{
				x: 50,
				opacity: 0,
			}}
			transition={{
				duration: 0.2,
				ease: "easeInOut",
				type: "just",
			}}
			{...props}
		/>
	);
};
