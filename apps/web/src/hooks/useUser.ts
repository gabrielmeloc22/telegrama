"use client";
import { graphql, useLazyLoadQuery } from "react-relay";
import type { useUserQuery } from "../../__generated__/useUserQuery.graphql";

const MeQuery = graphql`
  query useUserQuery($skip: Boolean!) {
    me @skip(if: $skip) {
      _id
      id
      username
      avatar
    }
  }
`;

export function useUser(skip = false) {
	const { me } = useLazyLoadQuery<useUserQuery>(MeQuery, { skip: false });

	if (!me && !skip) {
		return null;
	}

	return me;
}
