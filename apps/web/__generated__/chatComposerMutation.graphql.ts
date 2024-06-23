/**
 * @generated SignedSource<<f158b942048ebc8b8f36d1c65c991ea1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SendMessageInput = {
  clientMutationId?: string | null | undefined;
  content?: any | null | undefined;
  to: string;
};
export type chatComposerMutation$variables = {
  input: SendMessageInput;
};
export type chatComposerMutation$data = {
  readonly sendMessage: {
    readonly id: string | null | undefined;
  } | null | undefined;
};
export type chatComposerMutation = {
  response: chatComposerMutation$data;
  variables: chatComposerMutation$variables;
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
    "concreteType": "SendMessagePayload",
    "kind": "LinkedField",
    "name": "sendMessage",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "chatComposerMutation",
    "selections": (v1/*: any*/),
    "type": "mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "chatComposerMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6c3b6cd89d2a4826592bbda5a3a3fdd0",
    "id": null,
    "metadata": {},
    "name": "chatComposerMutation",
    "operationKind": "mutation",
    "text": "mutation chatComposerMutation(\n  $input: SendMessageInput!\n) {\n  sendMessage(input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "d3e93e49a9a5d8e5802406b2f6b0ef9b";

export default node;
