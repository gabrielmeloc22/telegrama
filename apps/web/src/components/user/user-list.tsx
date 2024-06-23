import { useLazyLoadQuery, usePaginationFragment } from "react-relay";
import { graphql } from "relay-runtime";
import type { userItemFragment$key } from "../../../__generated__/userItemFragment.graphql";
import type { userListSearchFragment$key } from "../../../__generated__/userListSearchFragment.graphql";
import type { userListSearchQuery } from "../../../__generated__/userListSearchQuery.graphql";
import { UserItem } from "./user-item";

const UserListSearchQuery = graphql`
	query userListSearchQuery($filter: UserFilter) {
		...userListSearchFragment @arguments(filter: $filter)
	}
`;

const UserSearchFragment = graphql`
  fragment userListSearchFragment on query 
  @argumentDefinitions(
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 20 }
    filter: {type: "UserFilter"}
  )
  @refetchable(queryName: "userSearchRefetchQuery")
  {
    users(filter: $filter, after: $cursor, first: $count) 
    @connection(key: "userSearchFragment_users")
    {
      edges {
        cursor
        node {
          id
          ...userItemFragment
        }
      }
    }
  }
`;
type UserListProps = {
	query?: string;
	onSelect: (userId: string) => void;
};

export function UserList({ query, onSelect }: UserListProps) {
	const usersQuery = useLazyLoadQuery<userListSearchQuery>(
		UserListSearchQuery,
		{
			filter: { username: query },
		},
		{ fetchPolicy: query ? "store-or-network" : "store-only" },
	);

	const { data } = usePaginationFragment<
		userListSearchQuery,
		userListSearchFragment$key
	>(UserSearchFragment, usersQuery);

	if (!data.users) {
		return null;
	}

	const users = data.users.edges;

	return (
		<div className="flex">
			<ul className="flex w-full flex-col gap-2">
				{users.map((edge) => (
					<li key={edge?.node?.id} className="flex">
						<UserItem
							link
							user={edge?.node as userItemFragment$key}
							onClick={() => edge?.node?.id && onSelect(edge.node.id)}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
