/**
 * @generated SignedSource<<33a4a2cea7c5f0af22d5d69172d69158>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MessageInput = {
  clientSubscriptionId?: string | null | undefined;
};
export type useInboxSubscription$variables = {
  chatConnections: ReadonlyArray<string>;
  input: MessageInput;
};
export type useInboxSubscription$data = {
  readonly onMessage: {
    readonly chat: {
      readonly group: boolean | null | undefined;
      readonly id: string;
      readonly updatedAt: any | null | undefined;
      readonly user: {
        readonly id: string;
      } | null | undefined;
      readonly " $fragmentSpreads": FragmentRefs<"chatItemFragment">;
    } | null | undefined;
    readonly deletedChat: string | null | undefined;
    readonly deletedMessages: ReadonlyArray<string | null | undefined> | null | undefined;
    readonly newChat: boolean | null | undefined;
    readonly newMessage: {
      readonly node: {
        readonly from: {
          readonly id: string;
        };
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"chatMessageFragment">;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type useInboxSubscription = {
  response: useInboxSubscription$data;
  variables: useInboxSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "chatConnections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "newChat",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "deletedMessages",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "deletedChat",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "group",
  "storageKey": null
},
v8 = [
  (v6/*: any*/)
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v10 = [
  (v6/*: any*/),
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
  }
],
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useInboxSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "MessagePayload",
        "kind": "LinkedField",
        "name": "onMessage",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Chat",
            "kind": "LinkedField",
            "name": "chat",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "user",
                "plural": false,
                "selections": (v8/*: any*/),
                "storageKey": null
              },
              (v9/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "chatItemFragment"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "MessageEdge",
            "kind": "LinkedField",
            "name": "newMessage",
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
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "from",
                    "plural": false,
                    "selections": (v8/*: any*/),
                    "storageKey": null
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "chatMessageFragment"
                  }
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
    "type": "subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "useInboxSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "MessagePayload",
        "kind": "LinkedField",
        "name": "onMessage",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Chat",
            "kind": "LinkedField",
            "name": "chat",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "user",
                "plural": false,
                "selections": (v10/*: any*/),
                "storageKey": null
              },
              (v9/*: any*/),
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
                      (v6/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/)
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
            "args": null,
            "filters": null,
            "handle": "appendNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "chat",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "chatConnections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "ChatEdge"
              }
            ]
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "MessageEdge",
            "kind": "LinkedField",
            "name": "newMessage",
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
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "from",
                    "plural": false,
                    "selections": (v10/*: any*/),
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
                          (v7/*: any*/),
                          (v6/*: any*/)
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
                    "name": "localId",
                    "storageKey": null
                  },
                  (v12/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "seen",
                    "storageKey": null
                  },
                  (v11/*: any*/),
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
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b836ee4584f4f8d13f0707c8f81fd43a",
    "id": null,
    "metadata": {},
    "name": "useInboxSubscription",
    "operationKind": "subscription",
    "text": "subscription useInboxSubscription(\n  $input: MessageInput!\n) {\n  onMessage(input: $input) {\n    newChat\n    deletedMessages\n    deletedChat\n    chat {\n      id\n      group\n      user {\n        id\n      }\n      updatedAt\n      ...chatItemFragment\n    }\n    newMessage {\n      node {\n        id\n        from {\n          id\n        }\n        ...chatMessageFragment\n      }\n    }\n  }\n}\n\nfragment chatItemFragment on Chat {\n  id\n  name\n  group\n  user {\n    id\n    username\n    avatar\n  }\n  lastMessage {\n    node {\n      id\n      createdAt\n      content\n    }\n  }\n}\n\nfragment chatMessageFragment on Message {\n  id\n  from {\n    id\n    username\n    avatar\n  }\n  chat {\n    node {\n      group\n      id\n    }\n  }\n  localId\n  content\n  seen\n  createdAt\n  seenAt\n  delivered\n  deliveredAt\n}\n"
  }
};
})();

(node as any).hash = "fcb7ccaf91555c86caa2c71327b31c4e";

export default node;
