import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import type { chatHeaderFragment$key } from "../../../__generated__/chatHeaderFragment.graphql";
import { UserAvatar } from "../user/user-avatar";

const ChatHeaderFragment = graphql`
  fragment chatHeaderFragment on query
	@argumentDefinitions(
		userId: { type: "String!" }
	)
	{
		chat(userId: $userId){
			name
		}
		user(userId: $userId) {
			username
		}
  }
`;

type ChatHeaderProps = {
	chat: chatHeaderFragment$key;
};

export function ChatHeader({ chat }: ChatHeaderProps) {
	const data = useFragment<chatHeaderFragment$key>(ChatHeaderFragment, chat);

	const chatName = data.chat?.name ?? data.user?.username;

	return (
		<div className="sticky top-0 flex min-h-16 w-full items-center gap-2 px-6 dark:bg-neutral-800">
			<UserAvatar
				name={chatName ?? ""}
				// imageUrl={data.avatar}
				className="size-10"
			/>
			<div>
				<p className="font-medium">{chatName}</p>
			</div>
		</div>
	);
}
