/**
 * @generated SignedSource<<06c24e1e216775ed51db3a0b1fdba5a6>>
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
      readonly id: string;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "CreateGroupChatPayload",
    "kind": "LinkedField",
    "name": "createGroupChat",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "clientMutationId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Chat",
        "kind": "LinkedField",
        "name": "chat",
        "plural": false,
        "selections": [
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "chatCreateGroupMutation",
    "selections": (v1/*: any*/),
    "type": "mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "chatCreateGroupMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "af32d45b8499d05cf1e8b8131dda92c2",
    "id": null,
    "metadata": {},
    "name": "chatCreateGroupMutation",
    "operationKind": "mutation",
    "text": "mutation chatCreateGroupMutation(\n  $input: CreateGroupChatInput!\n) {\n  createGroupChat(input: $input) {\n    clientMutationId\n    chat {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6f534c4d87353e791527f753278e8b8a";

export default node;
