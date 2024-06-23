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
  query useUserQuery {
    me {
			_id
      id
      username
      avatar
    }
  }
`;

export function useUser() {
	const [fetchKey, setFetchKey] = useState(0);
	const { me } = useLazyLoadQuery<useUserQuery>(MeQuery, {}, { fetchKey });

	useSubscribeToInvalidationState([], () => {
		setFetchKey((prev) => prev + 1);
	});

	if (!me) {
		logout();
		return null;
	}

	return me;
}
