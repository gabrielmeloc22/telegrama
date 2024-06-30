import { Button, NavigationStackTrigger, Spinner } from "@ui/components";
import { useNavigationStackControls } from "@ui/components/navigation-stack";
import { ArrowLeft } from "lucide-react";
import { Suspense, useState } from "react";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "relay-runtime";
import type { chatCreateUserListQuery } from "../../../__generated__/chatCreateUserListQuery.graphql";
import { SearchField } from "../search-field";
import { UserList } from "../user/user-list";

const ChatCreateUserListQuery = graphql`
	query chatCreateUserListQuery($filter: UserFilter){
		...userListFragment @arguments(filter: $filter)
	}
`;

export function ChatCreate() {
	const [search, setSearch] = useState("");
	const { reset } = useNavigationStackControls();

	const usersQuery = useLazyLoadQuery<chatCreateUserListQuery>(
		ChatCreateUserListQuery,
		{
			filter: { username: search },
		},
	);

	return (
		<div className="flex h-full flex-col gap-4 p-2 dark:bg-neutral-800">
			<div className="flex items-center gap-2">
				<NavigationStackTrigger navigate={0} asChild>
					<Button design="unstyled">
						<ArrowLeft className="size-5" />
					</Button>
				</NavigationStackTrigger>
				<SearchField
					placeholder="Search for a user"
					onSearch={(v) => setSearch(v)}
				/>
			</div>
			<Suspense
				fallback={
					<div className="flex w-full items-center justify-center">
						<Spinner />
					</div>
				}
			>
				<UserList userList={usersQuery} onSelect={reset} />
			</Suspense>
		</div>
	);
}
