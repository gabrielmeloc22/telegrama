import Link from "next/link";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import type { userItemFragment$key } from "../../../__generated__/userItemFragment.graphql";
import { UserAvatar } from "./user-avatar";

const UserItemFragment = graphql`
  fragment userItemFragment on User {
    _id
    username
    avatar
  }
`;

type UserItemProps = {
	link?: boolean;
	user: userItemFragment$key;
	onClick?: () => void;
};

export function UserItem({ link, user, onClick }: UserItemProps) {
	const data = useFragment<userItemFragment$key>(UserItemFragment, user);
	const Component = link ? Link : "button";

	return (
		<Component
			onClick={onClick}
			className="flex w-full gap-2 rounded-md px-4 py-2 transition-colors dark:hover:bg-neutral-700/50"
			{...(Component === Link
				? { href: `/c/${data._id}` }
				: ({} as { href: string }))}
		>
			<UserAvatar
				name={data.username}
				imageUrl={data.avatar}
				color="dark"
				className="size-12 text-sm"
			/>
			<div className="flex flex-col">
				<p>{data.username}</p>
				<p className="text-xs dark:text-neutral-400">Last seen when?</p>
			</div>
		</Component>
	);
}
