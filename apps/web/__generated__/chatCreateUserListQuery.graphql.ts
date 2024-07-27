/**
 * @generated SignedSource<<27e019443e98733c658d029ebed2f976>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserFilter = {
  username?: string | null | undefined;
};
export type chatCreateUserListQuery$variables = {
  filter?: UserFilter | null | undefined;
};
export type chatCreateUserListQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"userListFragment">;
};
export type chatCreateUserListQuery = {
  response: chatCreateUserListQuery$data;
  variables: chatCreateUserListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "filter"
  }
],
v1 = {
  "kind": "Variable",
  "name": "filter",
  "variableName": "filter"
},
v2 = [
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "chatCreateUserListQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "userListFragment"
      }
    ],
    "type": "query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "chatCreateUserListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "UserConnection",
        "kind": "LinkedField",
        "name": "users",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "UserEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "username",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "avatar",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "filters": [
          "filter"
        ],
        "handle": "connection",
        "key": "userSearchFragment_users",
        "kind": "LinkedHandle",
        "name": "users"
      }
    ]
  },
  "params": {
    "cacheID": "7ba0d398252396514e38f6516d04ee08",
    "id": null,
    "metadata": {},
    "name": "chatCreateUserListQuery",
    "operationKind": "query",
    "text": "query chatCreateUserListQuery(\n  $filter: UserFilter\n) {\n  ...userListFragment_Vt7Yj\n}\n\nfragment userItemFragment on User {\n  id\n  username\n  avatar\n}\n\nfragment userListFragment_Vt7Yj on query {\n  users(filter: $filter, first: 20) {\n    edges {\n      cursor\n      node {\n        id\n        username\n        avatar\n        ...userItemFragment\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e884028dc8d52d09ef4a59fe46a493b4";

export default node;
