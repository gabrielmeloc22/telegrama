"use client";

import { graphql, useLazyLoadQuery } from "react-relay";
import type { useUserQuery } from "../../__generated__/useUserQuery.graphql";

const MeQuery = graphql`
  query useUserQuery {
    me {
      id
      username
      avatar
    }
  }
`;

export function useUser() {
  const { me } = useLazyLoadQuery<useUserQuery>(MeQuery, {});

  if (!me) {
    return null;
  }

  return me;
}
