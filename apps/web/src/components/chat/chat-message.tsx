import { useUser } from "@/hooks/useUser";
import { CHAT_COLORS } from "@/utils/constants";
import {
	Button,
	Checkbox,
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
	DialogTrigger,
} from "@ui/components";
import { cn } from "@ui/lib/utils";
import { Check, CheckCircle2, Clock, Trash } from "lucide-react";
import murmurhash from "murmurhash";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import type { chatMessageFragment$key } from "../../../__generated__/chatMessageFragment.graphql";
import { UserAvatar } from "../user/user-avatar";

const ChatMessageFragment = graphql`
  fragment chatMessageFragment on Message {
    id
    from {
      id
      username
      avatar
    }
		chat {
			node {
				group
			}
		}
		localId
    content
    seen
    createdAt
    seenAt
    delivered
    deliveredAt
  }
`;

type ChatMessageProps = {
	message: chatMessageFragment$key;
	onSelect?: () => void;
	selected?: boolean;
	selectable?: boolean;
	setSelectable?: React.Dispatch<React.SetStateAction<boolean>>;
	onDelete?: () => void;
	firstOfSequence?: boolean;
	lastOfSequence?: boolean;
};

export function ChatMessage({
	message,
	onSelect,
	selected,
	selectable,
	setSelectable,
	onDelete,
	firstOfSequence = true,
	lastOfSequence,
}: ChatMessageProps) {
	const user = useUser();

	const data = useFragment<chatMessageFragment$key>(
		ChatMessageFragment,
		message,
	);

	// When using optimistic response the fragment data is returned as undefined, even though the data exists
	if (!data) return;

	const sentByMe = user?.id === data.from.id;
	const createdAt = new Date(data.createdAt);

	const isPending = !data.chat;

	const userColor = data.chat?.node?.group
		? murmurhash.v3(data.from.id) % (CHAT_COLORS.length - 1)
		: 0;

	const showUserAvatar = !!data.chat?.node?.group && !sentByMe && !sentByMe;
	const showUserName = firstOfSequence && !sentByMe && data.chat?.node?.group;

	return (
		<>
			<Dialog>
				<DeleteMessageDialog onDelete={onDelete} />
				<ContextMenu>
					<ContextMenuContent>
						<ContextMenuItem
							onClick={() => {
								setSelectable?.(true);
								onSelect?.();
							}}
						>
							<CheckCircle2 className="size-5" />
							Select
						</ContextMenuItem>
						<DialogTrigger asChild>
							<ContextMenuItem className="text-red-500">
								<Trash className="size-5" />
								Delete
							</ContextMenuItem>
						</DialogTrigger>
					</ContextMenuContent>
					<ContextMenuTrigger>
						<div
							className={cn(
								"group relative z-0",
								selectable && "cursor-pointer",
							)}
							{...(selectable
								? {
										onMouseDown: () => {
											onSelect?.();
										},
										onMouseOver: (e) => {
											if (e.buttons === 1) {
												onSelect?.();
											}
										},
									}
								: {})}
						>
							{selectable && (
								<div
									className={cn(
										"-top-[2px] -z-10 absolute left-0 flex h-[calc(100%+4px)] w-full cursor-pointer items-center px-4 duration-500",
										selected && "bg-purple-600/30",
										lastOfSequence && "h-[calc(100%+12px)]",
									)}
								>
									<Checkbox
										onMouseDown={(e) => {
											e.stopPropagation();
										}}
										onCheckedChange={onSelect}
										checked={selected}
										className="size-5 rounded-full"
									/>
								</div>
							)}
							<div
								className={cn(
									"mx-[22.5%] flex gap-1",
									!sentByMe &&
										data.chat?.node?.group &&
										"ml-[calc(22.5%-32px)]",
									selectable && "select-none",
								)}
							>
								{showUserName && (
									<UserAvatar
										name={data.from.username}
										className="size-8 text-xs"
									/>
								)}
								<div
									className={cn(
										"flex size-fit max-w-[80%] flex-col whitespace-pre-wrap rounded-xl px-2 py-0.5 lg:max-w-[60%] dark:bg-neutral-800",
										sentByMe && "ml-auto bg-primary dark:bg-primary",
										showUserAvatar && !firstOfSequence && "ml-9",
									)}
								>
									{showUserName && (
										<p className={cn("text-[0.75rem]", CHAT_COLORS[userColor])}>
											{data.from.username}
										</p>
									)}

									<p className="w-full break-words text-sm">
										{data.content}
										<span className="float-right mt-2 ml-3 inline-flex h-4 items-center gap-1 whitespace-nowrap text-xs leading-none">
											{new Intl.DateTimeFormat("default", {
												timeStyle: "short",
											}).format(createdAt)}
											{isPending ? (
												<Clock className="size-3" />
											) : (
												<Check className="size-4" />
											)}
										</span>
									</p>
								</div>
							</div>
						</div>
					</ContextMenuTrigger>
				</ContextMenu>
			</Dialog>
		</>
	);
}

type DeleteMessageDialogProps = {
	onDelete?: () => void;
	deleteCount?: number;
};

export function DeleteMessageDialog({
	onDelete,
	deleteCount = 1,
}: DeleteMessageDialogProps) {
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>
					Delete {deleteCount > 1 ? `${deleteCount} messages` : "message"}
				</DialogTitle>
			</DialogHeader>
			<DialogDescription>
				Are you sure you want to delete{" "}
				{deleteCount === 1 ? "this message" : "these messages"}?
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
