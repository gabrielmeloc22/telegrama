import { useUser } from "@/hooks/useUser";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import type { chatHeaderFragment$key } from "../../../__generated__/chatHeaderFragment.graphql";
import { UserAvatar } from "../user/user-avatar";

const ChatHeaderFragment = graphql`
  fragment chatHeaderFragment on query
	@argumentDefinitions(
		chatId: {type : "String!"}
	)
	{
		chat(id: $chatId){
			name
			group
			users {
				edges {
					node {
						id
						avatar
						username
					}
				}
			}
		}
		user(userId: $chatId) {
			id
			username
		}
  }
`;

type ChatHeaderProps = {
	chat: chatHeaderFragment$key;
};

export function ChatHeader({ chat }: ChatHeaderProps) {
	const currUser = useUser();
	const data = useFragment<chatHeaderFragment$key>(ChatHeaderFragment, chat);

	const chatName =
		data.chat?.name ??
		(data?.user?.id === currUser?.id ? "Saved messages" : data.user?.username);

	return (
		<div className="sticky top-0 flex min-h-16 w-full items-center gap-2 px-6 dark:bg-neutral-800">
			<UserAvatar
				name={chatName ?? ""}
				// imageUrl={data.avatar}
				className="size-10"
			/>
			<div className="flex flex-col gap-0.5">
				<p className="font-medium leading-none">{chatName}</p>
				{data.chat?.group && (
					<p className="text-sm">
						{data.chat.users?.edges
							.map((n) => n?.node?.username ?? "")
							.join(", ")}
					</p>
				)}
			</div>
		</div>
	);
}
