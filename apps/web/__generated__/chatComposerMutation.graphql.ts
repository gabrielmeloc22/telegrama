/**
 * @generated SignedSource<<044397bd0e49826331bef9a610ec0757>>
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
    readonly clientMutationId: string | null | undefined;
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
    "cacheID": "1ca479e1bc361f1a3c9e5e1a853c58cc",
    "id": null,
    "metadata": {},
    "name": "chatComposerMutation",
    "operationKind": "mutation",
    "text": "mutation chatComposerMutation(\n  $input: SendMessageInput!\n) {\n  sendMessage(input: $input) {\n    clientMutationId\n  }\n}\n"
  }
};
})();

(node as any).hash = "efbc4d12ac37b09e427dedfb7e1f6052";

export default node;
