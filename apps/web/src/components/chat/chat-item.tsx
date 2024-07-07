import { useTypingStatusSubscription } from "@/hooks/useTypingStatusSubscription";
import {
	Button,
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	TextEllipsis,
} from "@ui/components";
import { cn } from "@ui/lib/utils";
import { MessageCircleX, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useFragment, useMutation } from "react-relay";
import { graphql } from "relay-runtime";
import type { chatItemDeleteMutation } from "../../../__generated__/chatItemDeleteMutation.graphql";
import type { chatItemFragment$key } from "../../../__generated__/chatItemFragment.graphql";
import { UserAvatar } from "../user/user-avatar";

const ChatItemFragment = graphql`
  fragment chatItemFragment on Chat {
		_id
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

const ChatItemDeleteMutation = graphql`
	mutation chatItemDeleteMutation($input:DeleteChatInput!) {
		deleteChat(input: $input) {
			deletedId
		}
	}
`;

type ChatItemProps = {
	chat: chatItemFragment$key;
	selected: boolean;
};

export function ChatItem({ chat, selected }: ChatItemProps) {
	const data = useFragment<chatItemFragment$key>(ChatItemFragment, chat);

	const [confirmDeletion, setConfirmDeletion] = useState(false);
	const [deleteChat] = useMutation<chatItemDeleteMutation>(
		ChatItemDeleteMutation,
	);

	const onDeleteChat = () => {
		deleteChat({
			variables: {
				input: { chatId: data.id },
			},
		});
	};

	const userTyping = useTypingStatusSubscription({ chatId: data.id });

	const createdAt = new Date(data.lastMessage?.node?.createdAt);
	const fromToday = createdAt.toDateString() === new Date().toDateString();

	return (
		<ContextMenu>
			<Dialog open={confirmDeletion} onOpenChange={setConfirmDeletion}>
				<DeleteChatDialog onDelete={onDeleteChat} />
			</Dialog>
			<ContextMenuContent>
				<ContextMenuItem>
					<MessageCircleX className="size-5" />
					Delete messages
				</ContextMenuItem>
				<ContextMenuItem
					design="error-ghost"
					onClick={() => setConfirmDeletion(true)}
				>
					<Trash className="size-5" /> Delete chat
				</ContextMenuItem>
			</ContextMenuContent>
			<ContextMenuTrigger asChild>
				<Link
					href={`/c/${data.user?._id ?? data._id}`}
					className={cn(
						"flex w-full gap-4 rounded-lg px-3 py-2 transition-all hover:dark:bg-neutral-700/50",
						selected &&
							"bg-primary/80 text-primary-foreground hover:dark:bg-primary/80",
					)}
				>
					<UserAvatar
						name={data.name}
						imageUrl={data.user?.avatar}
						color="dark"
					/>
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
							className={cn(
								"text-neutral-400 text-sm",
								selected && "text-white",
							)}
						>
							{userTyping
								? data.group
									? `${userTyping.username} is typing...`
									: "typing..."
								: data.lastMessage?.node?.content}
						</TextEllipsis>
					</div>
				</Link>
			</ContextMenuTrigger>
		</ContextMenu>
	);
}

type DeleteMessageDialogProps = {
	onDelete?: () => void;
	deleteCount?: number;
};

export function DeleteChatDialog({
	onDelete,
	deleteCount = 1,
}: DeleteMessageDialogProps) {
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>
					Delete {deleteCount > 1 ? `${deleteCount} chats` : "chat"}
				</DialogTitle>
			</DialogHeader>
			<DialogDescription>
				Are you sure you want to delete{" "}
				{deleteCount === 1 ? "this chat" : "these chats"}?
			</DialogDescription>
			<DialogFooter>
				<DialogClose asChild>
					<Button design="primary-ghost">Cancel</Button>
				</DialogClose>
				<DialogClose asChild>
					<Button design="error-ghost" onClick={onDelete}>
						Delete
					</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	);
}
