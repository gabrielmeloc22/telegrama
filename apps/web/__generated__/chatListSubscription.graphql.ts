/**
 * @generated SignedSource<<0b49e21746c9a49ea92748a68edbde75>>
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
export type chatListSubscription$variables = {
  chatConnections: ReadonlyArray<string>;
  input: MessageInput;
};
export type chatListSubscription$data = {
  readonly onMessage: {
    readonly chat: {
      readonly node: {
        readonly user: {
          readonly _id: string;
        } | null | undefined;
        readonly " $fragmentSpreads": FragmentRefs<"chatItemFragment">;
      } | null | undefined;
    } | null | undefined;
    readonly deletedMessages: ReadonlyArray<string | null | undefined> | null | undefined;
    readonly newChat: boolean | null | undefined;
    readonly newMessage: {
      readonly node: {
        readonly from: {
          readonly _id: string;
        };
        readonly " $fragmentSpreads": FragmentRefs<"chatMessageFragment">;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type chatListSubscription = {
  response: chatListSubscription$data;
  variables: chatListSubscription$variables;
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
  "name": "_id",
  "storageKey": null
},
v6 = [
  (v5/*: any*/)
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatar",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v11 = {
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
    "name": "chatListSubscription",
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
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "chatItemFragment"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "user",
                    "plural": false,
                    "selections": (v6/*: any*/),
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
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "chatMessageFragment"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "from",
                    "plural": false,
                    "selections": (v6/*: any*/),
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
    "name": "chatListSubscription",
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
                      (v5/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v7/*: any*/)
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
                          (v7/*: any*/),
                          (v10/*: any*/),
                          (v11/*: any*/)
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
            "args": null,
            "filters": null,
            "handle": "appendEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "chat",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "chatConnections"
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
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "from",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v11/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "seen",
                    "storageKey": null
                  },
                  (v10/*: any*/),
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
    "cacheID": "6981c7d0fce2d21b261bdb48633dd645",
    "id": null,
    "metadata": {},
    "name": "chatListSubscription",
    "operationKind": "subscription",
    "text": "subscription chatListSubscription(\n  $input: MessageInput!\n) {\n  onMessage(input: $input) {\n    newChat\n    deletedMessages\n    chat {\n      node {\n        ...chatItemFragment\n        user {\n          _id\n          id\n        }\n        id\n      }\n    }\n    newMessage {\n      node {\n        ...chatMessageFragment\n        from {\n          _id\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment chatItemFragment on Chat {\n  id\n  name\n  group\n  user {\n    _id\n    username\n    avatar\n    id\n  }\n  lastMessage {\n    node {\n      id\n      createdAt\n      content\n    }\n  }\n}\n\nfragment chatMessageFragment on Message {\n  id\n  from {\n    id\n    username\n    avatar\n  }\n  content\n  seen\n  createdAt\n  seenAt\n  delivered\n  deliveredAt\n}\n"
  }
};
})();

(node as any).hash = "f16c14050d29078ec30b4ef28b32c868";

export default node;
