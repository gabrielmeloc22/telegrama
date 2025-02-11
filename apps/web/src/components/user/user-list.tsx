import { usePaginationFragment } from "react-relay";
import { type OperationType, graphql } from "relay-runtime";
import type {
  userListFragment$data,
  userListFragment$key,
} from "../../../__generated__/userListFragment.graphql";
import { UserItem } from "./user-item";

export const UserListFragment = graphql`
  fragment userListFragment on query 
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
					username
					avatar
          ...userItemFragment
        }
      }
    }
  }
`;
type UserListProps = {
  userList: userListFragment$key;
  // query?: string;
  onSelect: (edge: userListFragment$data["users"]["edges"][number]) => void;
  selected?: string[];
  multiple?: boolean;
};

export function UserList({
  selected,
  userList,
  multiple = false,
  onSelect,
}: UserListProps) {
  const { data } = usePaginationFragment<OperationType, userListFragment$key>(
    UserListFragment,
    userList,
  );

  if (!data.users) {
    return null;
  }

  const users = data.users.edges;

  return (
    <ul className="flex flex-grow h-full w-full flex-col gap-2 overflow-y-auto">
      {users.map((edge) =>
        edge?.node ? (
          <li key={edge.node.id} className="flex items-center">
            <UserItem
              selectable={multiple}
              selected={selected?.includes(edge.node.id)}
              user={edge.node}
              onClick={() => onSelect(edge)}
              {...(!multiple
                ? {
                  link: true,
                }
                : {})}
            />
          </li>
        ) : null,
      )}
    </ul>
  );
}
