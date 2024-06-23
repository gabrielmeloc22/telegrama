/**
 * @generated SignedSource<<6e2794bb3dac1fa2b2b7c5c5b2cee4be>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type chatLayoutQuery$variables = {
  userId: string;
};
export type chatLayoutQuery$data = {
  readonly chat: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"chatItemFragment">;
  } | null | undefined;
  readonly user: {
    readonly avatar: string | null | undefined;
    readonly id: string;
    readonly username: string;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"chatHeaderFragment" | "chatMessagesFragment">;
};
export type chatLayoutQuery = {
  response: chatLayoutQuery$data;
  variables: chatLayoutQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId"
  }
],
v1 = {
  "kind": "Variable",
  "name": "userId",
  "variableName": "userId"
},
v2 = [
  (v1/*: any*/)
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatar",
  "storageKey": null
},
v6 = [
  (v3/*: any*/),
  (v4/*: any*/),
  (v5/*: any*/)
],
v7 = {
  "alias": null,
  "args": (v2/*: any*/),
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "user",
  "plural": false,
  "selections": (v6/*: any*/),
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
},
v10 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 50
  },
  (v1/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "chatLayoutQuery",
    "selections": [
      (v7/*: any*/),
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Chat",
        "kind": "LinkedField",
        "name": "chat",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "chatItemFragment"
          }
        ],
        "storageKey": null
      },
      {
        "args": (v2/*: any*/),
        "kind": "FragmentSpread",
        "name": "chatHeaderFragment"
      },
      {
        "args": (v2/*: any*/),
        "kind": "FragmentSpread",
        "name": "chatMessagesFragment"
      }
    ],
    "type": "query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "chatLayoutQuery",
    "selections": [
      (v7/*: any*/),
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Chat",
        "kind": "LinkedField",
        "name": "chat",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "group",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "_id",
                "storageKey": null
              },
              (v4/*: any*/),
              (v5/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "MessageEdge",
            "kind": "LinkedField",
            "name": "lastMessage",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Message",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/)
                ],
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
        "args": (v10/*: any*/),
        "concreteType": "MessageConnection",
        "kind": "LinkedField",
        "name": "messages",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "MessageEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Message",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "from",
                    "plural": false,
                    "selections": (v6/*: any*/),
                    "storageKey": null
                  },
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "seen",
                    "storageKey": null
                  },
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "seenAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "delivered",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "deliveredAt",
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
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
        "args": (v10/*: any*/),
        "filters": [
          "userId"
        ],
        "handle": "connection",
        "key": "ChatMessagesFragment_messages",
        "kind": "LinkedHandle",
        "name": "messages"
      }
    ]
  },
  "params": {
    "cacheID": "f2a14820d1838045e03d1805bf99a416",
    "id": null,
    "metadata": {},
    "name": "chatLayoutQuery",
    "operationKind": "query",
    "text": "query chatLayoutQuery(\n  $userId: String!\n) {\n  user(userId: $userId) {\n    id\n    username\n    avatar\n  }\n  chat(userId: $userId) {\n    id\n    ...chatItemFragment\n  }\n  ...chatHeaderFragment_1xxw8p\n  ...chatMessagesFragment_1xxw8p\n}\n\nfragment chatHeaderFragment_1xxw8p on query {\n  chat(userId: $userId) {\n    name\n    id\n  }\n  user(userId: $userId) {\n    username\n    id\n  }\n}\n\nfragment chatItemFragment on Chat {\n  id\n  name\n  group\n  user {\n    _id\n    username\n    avatar\n    id\n  }\n  lastMessage {\n    node {\n      id\n      createdAt\n      content\n    }\n  }\n}\n\nfragment chatMessageFragment on Message {\n  id\n  from {\n    id\n    username\n    avatar\n  }\n  content\n  seen\n  createdAt\n  seenAt\n  delivered\n  deliveredAt\n}\n\nfragment chatMessagesFragment_1xxw8p on query {\n  messages(userId: $userId, first: 50) {\n    edges {\n      node {\n        id\n        from {\n          id\n        }\n        ...chatMessageFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b789feba1f3f8a1dd9dccc6949e0c2dd";

export default node;
