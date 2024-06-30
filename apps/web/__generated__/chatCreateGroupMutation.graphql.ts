/**
 * @generated SignedSource<<5270f24dcdcc58b871816ddea4545ed1>>
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
    "cacheID": "88b5eec7981034f5147f7be89b4f3785",
    "id": null,
    "metadata": {},
    "name": "chatCreateGroupMutation",
    "operationKind": "mutation",
    "text": "mutation chatCreateGroupMutation(\n  $input: CreateGroupChatInput!\n) {\n  createGroupChat(input: $input) {\n    clientMutationId\n  }\n}\n"
  }
};
})();

(node as any).hash = "761f7d92012487d53f891da647659601";

export default node;
