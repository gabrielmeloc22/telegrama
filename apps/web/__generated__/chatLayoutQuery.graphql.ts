/**
 * @generated SignedSource<<fc25c6e7fe3354428f905d8691351ffa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type chatLayoutQuery$variables = {
  chatId: string;
};
export type chatLayoutQuery$data = {
  readonly chat: {
    readonly id: string;
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
    "name": "chatId"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatar",
  "storageKey": null
},
v4 = [
  (v1/*: any*/),
  (v2/*: any*/),
  (v3/*: any*/)
],
v5 = {
  "alias": null,
  "args": [
    {
      "kind": "Variable",
      "name": "userId",
      "variableName": "chatId"
    }
  ],
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "user",
  "plural": false,
  "selections": (v4/*: any*/),
  "storageKey": null
},
v6 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "chatId"
  }
],
v7 = {
  "kind": "Variable",
  "name": "chatId",
  "variableName": "chatId"
},
v8 = [
  (v7/*: any*/)
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "group",
  "storageKey": null
},
v10 = [
  (v7/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 50
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "chatLayoutQuery",
    "selections": [
      (v5/*: any*/),
      {
        "alias": null,
        "args": (v6/*: any*/),
        "concreteType": "Chat",
        "kind": "LinkedField",
        "name": "chat",
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ],
        "storageKey": null
      },
      {
        "args": (v8/*: any*/),
        "kind": "FragmentSpread",
        "name": "chatHeaderFragment"
      },
      {
        "args": (v8/*: any*/),
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
      (v5/*: any*/),
      {
        "alias": null,
        "args": (v6/*: any*/),
        "concreteType": "Chat",
        "kind": "LinkedField",
        "name": "chat",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          (v9/*: any*/),
          {
            "alias": null,
            "args": null,
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
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v3/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
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
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "from",
                    "plural": false,
                    "selections": (v4/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ChatEdge",
                    "kind": "LinkedField",
                    "name": "chat",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Chat",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v9/*: any*/),
                          (v1/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "content",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "seen",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "createdAt",
                    "storageKey": null
                  },
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
          "chatId"
        ],
        "handle": "connection",
        "key": "ChatMessagesFragment_messages",
        "kind": "LinkedHandle",
        "name": "messages"
      }
    ]
  },
  "params": {
    "cacheID": "243ef7a71126e734ab42b8dbe599ac17",
    "id": null,
    "metadata": {},
    "name": "chatLayoutQuery",
    "operationKind": "query",
    "text": "query chatLayoutQuery(\n  $chatId: String!\n) {\n  user(userId: $chatId) {\n    id\n    username\n    avatar\n  }\n  chat(id: $chatId) {\n    id\n  }\n  ...chatHeaderFragment_1IzeVY\n  ...chatMessagesFragment_1IzeVY\n}\n\nfragment chatHeaderFragment_1IzeVY on query {\n  chat(id: $chatId) {\n    name\n    group\n    users {\n      edges {\n        node {\n          id\n          avatar\n          username\n        }\n      }\n    }\n    id\n  }\n  user(userId: $chatId) {\n    id\n    username\n  }\n}\n\nfragment chatMessageFragment on Message {\n  id\n  from {\n    id\n    username\n    avatar\n  }\n  chat {\n    node {\n      group\n      id\n    }\n  }\n  content\n  seen\n  createdAt\n  seenAt\n  delivered\n  deliveredAt\n}\n\nfragment chatMessagesFragment_1IzeVY on query {\n  messages(chatId: $chatId, first: 50) {\n    edges {\n      node {\n        id\n        from {\n          id\n        }\n        ...chatMessageFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4c42d11f8c9772e3ecc50c4ee375d4bf";

export default node;
