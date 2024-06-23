import { useUser } from "@/hooks/useUser";
import { TextEllipsis } from "@ui/components";
import { cn } from "@ui/lib/utils";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useFragment, useSubscription } from "react-relay";
import { graphql, type GraphQLSubscriptionConfig } from "relay-runtime";
import type { chatItemFragment$key } from "../../../__generated__/chatItemFragment.graphql";
import type { chatMessagesTypingStatusSubscription } from "../../../__generated__/chatMessagesTypingStatusSubscription.graphql";
import { UserAvatar } from "../user/user-avatar";
import { ChatMessagesTypingStatusSubscription } from "./chat-messages";

const ChatItemFragment = graphql`
  fragment chatItemFragment on Chat {
		id
    name       
    group
    user {
			_id
      username
      avatar
    }
		lastMessage {
			node {
				id
				createdAt
				content
			}
		}
  }
`;

type ChatItemProps = {
	chat: chatItemFragment$key;
	selected: boolean;
};

export function ChatItem({ chat, selected }: ChatItemProps) {
	const [typing, setTyping] = useState(false);
	const currUser = useUser();
	const data = useFragment<chatItemFragment$key>(ChatItemFragment, chat);

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
				input: { chatId: data.id },
			},
		}),
		[data, ChatMessagesTypingStatusSubscription],
	);

	useSubscription(config);

	const createdAt = new Date(data.lastMessage?.node?.createdAt);
	const fromToday = createdAt.toDateString() === new Date().toDateString();

	return (
		<Link
			href={`/c/${data.user?._id}`}
			className={cn(
				"flex w-full gap-4 rounded-lg px-3 py-2 transition-all hover:dark:bg-neutral-700/50",
				selected &&
					"bg-primary/80 text-primary-foreground hover:dark:bg-primary/80",
			)}
		>
			<UserAvatar name={data.name} imageUrl={data.user?.avatar} color="dark" />
			<div className="flex h-full w-full flex-col py-2">
				<div className="flex items-start">
					<TextEllipsis className="max-w-[15ch]">{data.name}</TextEllipsis>
					{data.lastMessage && (
						<p className="ml-auto self-start text-[0.8rem]">
							{new Intl.DateTimeFormat("default", {
								timeStyle: fromToday ? "short" : undefined,
								dateStyle: fromToday ? undefined : "short",
							}).format(createdAt)}
						</p>
					)}
				</div>
				<TextEllipsis
					className={cn("text-neutral-400 text-sm", selected && "text-white")}
				>
					{typing
						? `${data.user?.username} is typing...`
						: data.lastMessage?.node?.content}
				</TextEllipsis>
			</div>
		</Link>
	);
}
