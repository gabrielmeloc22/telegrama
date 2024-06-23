"use client";

import { Dialog, Spinner } from "@ui/components";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { graphql } from "relay-runtime";
import type { chatLayoutDeleteMessagesMutation } from "../../../__generated__/chatLayoutDeleteMessagesMutation.graphql";
import type { chatLayoutQuery } from "../../../__generated__/chatLayoutQuery.graphql";
import { ChatComposer } from "./chat-composer";
import { ChatHeader } from "./chat-header";
import { DeleteMessageDialog } from "./chat-message";
import { ChatMessages } from "./chat-messages";

export const ChatLayoutQuery = graphql`
	query chatLayoutQuery($userId: String!) {
		user(userId: $userId) {
			id
			username
			avatar
		}
		chat(userId: $userId) {
			id
			...chatItemFragment
		}
		...chatHeaderFragment @arguments(userId: $userId)
		...chatMessagesFragment @arguments(userId: $userId)
	}
	`;

type ChatLayoutProps = {
	userId: string;
};

const ChatMessagesDeleteMutation = graphql`
	mutation chatLayoutDeleteMessagesMutation($input: DeleteMessageInput! ) {
		deleteMessage(input: $input) {
			deletedIds 
		}
	}
`;

export function ChatLayout({ userId }: ChatLayoutProps) {
	const router = useRouter();
	const data = useLazyLoadQuery<chatLayoutQuery>(ChatLayoutQuery, {
		userId,
	});

	const [selectable, setSelectable] = useState(false);
	const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
	const [deleteMessages] = useMutation<chatLayoutDeleteMessagesMutation>(
		ChatMessagesDeleteMutation,
	);
	const [confirmDeletion, setConfirmDeletion] = useState(false);

	if (!data.user) {
		router.replace("/c");
		return null;
	}

	const onDelete = (ids: string[]) => {
		deleteMessages({
			onCompleted: () => {
				setSelectable(false);
				setSelectedMessages([]);
			},
			variables: {
				input: {
					chatId: data.chat?.id ?? "",
					ids,
				},
			},
		});
	};

	return (
		<div className="flex h-screen w-full flex-col outline-none">
			<Suspense fallback={<Spinner />}>
				<ChatHeader chat={data} />
			</Suspense>
			<Suspense
				fallback={
					<div className="flex h-full items-center justify-center">
						<Spinner />
					</div>
				}
			>
				<ChatMessages
					onDelete={(id) => onDelete([id])}
					selectable={selectable}
					setSelectable={setSelectable}
					messages={data}
					chatId={data.chat?.id ?? ""}
					onSelect={(id) => {
						if (id) {
							setSelectedMessages((prev) => {
								const curr = prev.includes(id)
									? prev.filter((m) => m !== id)
									: [...prev, id];

								if (curr.length === 0) {
									setSelectable(false);
								}

								return curr;
							});
						} else {
							setSelectedMessages([]);
						}
					}}
					selected={selectedMessages}
				/>
			</Suspense>
			<ChatComposer
				userId={userId}
				chatId={data.chat?.id}
				selectable={selectable}
				onCancelSelection={() => {
					setSelectedMessages([]);
					setSelectable(false);
				}}
				onDelete={() => setConfirmDeletion(true)}
			/>
			<Dialog open={confirmDeletion} onOpenChange={setConfirmDeletion}>
				<DeleteMessageDialog
					deleteCount={selectedMessages.length}
					onDelete={() => onDelete(selectedMessages)}
				/>
			</Dialog>
		</div>
	);
}
