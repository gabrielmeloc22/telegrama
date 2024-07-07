/**
 * @generated SignedSource<<cff201264a8c68b61a6aa813bcc66181>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateGroupChatInput = {
  clientMutationId?: string | null | undefined;
  members: ReadonlyArray<string | null | undefined>;
  name?: string | null | undefined;
};
export type chatCreateGroupMutation$variables = {
  input: CreateGroupChatInput;
};
export type chatCreateGroupMutation$data = {
  readonly createGroupChat: {
    readonly chat: {
      readonly _id: string;
    } | null | undefined;
    readonly clientMutationId: string | null | undefined;
  } | null | undefined;
};
export type chatCreateGroupMutation = {
  response: chatCreateGroupMutation$data;
  variables: chatCreateGroupMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clientMutationId",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "_id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "chatCreateGroupMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateGroupChatPayload",
        "kind": "LinkedField",
        "name": "createGroupChat",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Chat",
            "kind": "LinkedField",
            "name": "chat",
            "plural": false,
            "selections": [
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "chatCreateGroupMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateGroupChatPayload",
        "kind": "LinkedField",
        "name": "createGroupChat",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
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
                "name": "id",
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
    "cacheID": "e65cade2d26d111a3dde52d3e7edb418",
    "id": null,
    "metadata": {},
    "name": "chatCreateGroupMutation",
    "operationKind": "mutation",
    "text": "mutation chatCreateGroupMutation(\n  $input: CreateGroupChatInput!\n) {\n  createGroupChat(input: $input) {\n    clientMutationId\n    chat {\n      _id\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "55706f5b33531f34f587c221b50e8951";

export default node;
