import { useUser } from "@/hooks/useUser";
import { Button } from "@ui/components";
import { SendHorizonal, Trash, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { graphql, useMutation } from "react-relay";
import type { chatComposerMutation } from "../../../__generated__/chatComposerMutation.graphql";
import type { chatComposerSendTypingStatusMutation } from "../../../__generated__/chatComposerSendTypingStatusMutation.graphql";

const SendMessageMutation = graphql`
  mutation chatComposerMutation($input: SendMessageInput!) {
    sendMessage (input: $input){
			clientMutationId
    }
  }
`;

const SendTypingStatusMutation = graphql`
 mutation chatComposerSendTypingStatusMutation($input: SendTypingStatusInput!) {
	sendTypingStatus(input: $input){
		clientMutationId
	} 
 }
`;

type ChatComposerProps = {
	chatId: string;
	selectable?: boolean;
	onCancelSelection?: () => void;
	onDelete?: () => void;
};

export function ChatComposer({
	onDelete,
	selectable,
	onCancelSelection,
	chatId,
}: ChatComposerProps) {
	const currUser = useUser();

	const [height, setHeight] = useState<number>();

	const [text, setText] = useState("");
	const [typing, setTyping] = useState(false);
	const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const textbox = useRef<HTMLSpanElement>(null);
	const [sendMessage] = useMutation<chatComposerMutation>(SendMessageMutation);
	const [sendTypingStatus] = useMutation<chatComposerSendTypingStatusMutation>(
		SendTypingStatusMutation,
	);

	const onSendTypingStatus = (typing: boolean) => {
		if (chatId && currUser) {
			sendTypingStatus({
				variables: { input: { chatId, typing } },
			});
		}
	};

	const onSendMessage = () => {
		if (textbox.current?.innerText.trim()) {
			sendMessage({
				variables: {
					input: { to: chatId, content: textbox.current.innerText.trim() },
				},
			});
			textbox.current.innerText = "";
			setText("");
		}
	};

	useEffect(() => {
		if (textbox.current) {
			const resizeObserver = new ResizeObserver((entries) => {
				// We only have one entry, so we can use entries[0].
				const observedHeight = entries[0]?.contentRect.height;
				if (observedHeight) {
					setHeight(observedHeight);
				}
			});

			resizeObserver.observe(textbox.current);

			return () => {
				// Cleanup the observer when the component is unmounted
				resizeObserver.disconnect();
			};
		}
	}, []);

	return (
		<div className="sticky bottom-0 mx-[22.5%] mt-auto mb-6 flex gap-3">
			{selectable ? (
				<div className="flex w-full justify-between rounded-lg px-3 py-2 dark:bg-neutral-800">
					<Button
						className="aspect-square rounded-full p-3"
						design="ghost"
						onClick={onCancelSelection}
					>
						<X className="size-5" />
					</Button>
					<Button
						className="gap-3 self-center"
						onClick={onDelete}
						design="error-ghost"
					>
						<Trash className="size-5" />
						Delete
					</Button>
				</div>
			) : (
				<>
					<div
						className="max-h-[calc(20lh+1rem)] min-h-12 w-full overflow-y-auto rounded-lg bg-neutral-800 transition-[height] duration-300"
						style={{
							height: (height ?? 20) + 32,
						}}
					>
						<div className="flex">
							<span
								ref={textbox}
								onKeyDown={(e) => {
									setText(e.currentTarget.innerText.trim());

									const textUpdated = text !== e.currentTarget.innerText.trim();

									if (!typing && textUpdated) {
										setTyping(true);
										onSendTypingStatus(true);
									}

									if (
										!e.shiftKey &&
										e.key === "Enter" &&
										!!e.currentTarget.innerText.trim()
									) {
										e.preventDefault();
										typingTimeoutRef.current &&
											clearTimeout(typingTimeoutRef.current);
										setTyping(false);
										onSendTypingStatus(false);
										onSendMessage();
									}
								}}
								onKeyUp={() => {
									if (typingTimeoutRef.current) {
										clearTimeout(typingTimeoutRef.current);
									}
									if (typing) {
										typingTimeoutRef.current = setTimeout(() => {
											setTyping(false);
											onSendTypingStatus(false);
											typingTimeoutRef.current = null;
										}, 1000);
									}
								}}
								role="textbox"
								contentEditable
								data-placeholder="Enter a message"
								className="w-full px-6 py-4 text-sm leading-normal outline-none dark:before:text-neutral-400 data-[placeholder]:empty:before:content-[attr(data-placeholder)]"
							/>
						</div>
					</div>
					<Button
						className="flex aspect-square size-fit min-h-fit items-center justify-center rounded-full p-3"
						onClick={onSendMessage}
					>
						<SendHorizonal className="size-5" />
					</Button>
				</>
			)}
		</div>
	);
}
