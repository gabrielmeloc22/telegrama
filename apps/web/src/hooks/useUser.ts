"use client";

import { logout } from "@/utils/auth";
import { useState } from "react";
import {
	graphql,
	useLazyLoadQuery,
	useSubscribeToInvalidationState,
} from "react-relay";
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
	const [fetchKey, setFetchKey] = useState(0);
	const { me } = useLazyLoadQuery<useUserQuery>(
		MeQuery,
		{ skip },
		{ fetchKey },
	);

	useSubscribeToInvalidationState([me?.id ?? ""], () => {
		setFetchKey((prev) => prev + 1);
	});

	if (!me && !skip) {
		logout();
		return null;
	}

	return me;
}
