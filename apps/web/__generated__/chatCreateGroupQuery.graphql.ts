/**
 * @generated SignedSource<<055938d6418b89e45f988b314af9eef9>>
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
export type chatCreateGroupQuery$variables = {
  filter?: UserFilter | null | undefined;
};
export type chatCreateGroupQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"userListFragment">;
};
export type chatCreateGroupQuery = {
  response: chatCreateGroupQuery$data;
  variables: chatCreateGroupQuery$variables;
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
    "name": "chatCreateGroupQuery",
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
    "name": "chatCreateGroupQuery",
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
    "cacheID": "e5a36f8e2b74b9eb636bd3f5db562e04",
    "id": null,
    "metadata": {},
    "name": "chatCreateGroupQuery",
    "operationKind": "query",
    "text": "query chatCreateGroupQuery(\n  $filter: UserFilter\n) {\n  ...userListFragment_Vt7Yj\n}\n\nfragment userItemFragment on User {\n  id\n  username\n  avatar\n}\n\nfragment userListFragment_Vt7Yj on query {\n  users(filter: $filter, first: 20) {\n    edges {\n      cursor\n      node {\n        id\n        username\n        avatar\n        ...userItemFragment\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8d4333d2ef99d266f0a0749bdd133c7e";

export default node;
