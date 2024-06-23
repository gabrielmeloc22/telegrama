import { useUser } from "@/hooks/useUser";
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
import { Check, CheckCircle2, Trash } from "lucide-react";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import type { chatMessageFragment$key } from "../../../__generated__/chatMessageFragment.graphql";

const ChatMessageFragment = graphql`
  fragment chatMessageFragment on Message {
    id
    from {
      id
      username
      avatar
    }
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
};

export function ChatMessage({
	message,
	onSelect,
	selected,
	selectable,
	setSelectable,
	onDelete,
}: ChatMessageProps) {
	const user = useUser();

	const data = useFragment<chatMessageFragment$key>(
		ChatMessageFragment,
		message,
	);

	const sentByMe = user?.id === data.from.id;
	const createdAt = new Date(data.createdAt);

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
									"mx-[22.5%] flex size-fit max-w-[55%] items-center gap-2 whitespace-pre-wrap rounded-xl px-2.5 py-1 dark:bg-neutral-800",
									sentByMe && "ml-auto bg-primary dark:bg-primary",
									selectable && "select-none",
								)}
							>
								<p className="w-full break-words align-center text-sm">
									{data.content}
									<span className="float-right mt-2 ml-3 inline-flex items-center gap-1 whitespace-nowrap text-xs leading-none">
										{new Intl.DateTimeFormat("default", {
											timeStyle: "short",
										}).format(createdAt)}
										<Check className="size-4" />
									</span>
								</p>
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
				<DialogTitle>Delete message</DialogTitle>
			</DialogHeader>
			<DialogDescription>
				Are you sure you want to delete{" "}
				{deleteCount === 1 ? "this message" : `${deleteCount} messages`}?
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
