import { Checkbox } from "@ui/components";
import base64url from "base64-url";
import Link from "next/link";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import type { userItemFragment$key } from "../../../__generated__/userItemFragment.graphql";
import { UserAvatar } from "./user-avatar";

export const UserItemFragment = graphql`
  fragment userItemFragment on User {
		id
    username
    avatar
  }
`;

type UserItemProps = {
	link?: boolean;
	user: userItemFragment$key;
	onClick?: () => void;
	selected?: boolean;
	selectable?: boolean;
};

export function UserItem({
	selectable = false,
	selected = false,
	link,
	user,
	onClick,
}: UserItemProps) {
	const data = useFragment<userItemFragment$key>(UserItemFragment, user);
	const Component = link ? Link : "div";

	return (
		<Component
			onClick={onClick}
			className="flex w-full cursor-pointer items-center gap-4 rounded-md px-4 py-2 transition-colors dark:hover:bg-neutral-700/50"
			{...(Component === Link
				? { href: `/c/${base64url.escape(data.id)}` }
				: ({} as { href: string }))}
		>
			{selectable && <Checkbox checked={selected} />}
			<UserAvatar
				name={data.username}
				imageUrl={data.avatar}
				color="dark"
				className="size-10 text-sm"
			/>
			<div className="flex flex-col">
				<p>{data.username}</p>
				<p className="text-xs dark:text-neutral-400">Last seen when?</p>
			</div>
		</Component>
	);
}
