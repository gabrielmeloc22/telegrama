/**
 * @generated SignedSource<<85068fd092b1f04e246d8345d9696e5e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SendTypingStatusInput = {
  chatId: string;
  clientMutationId?: string | null | undefined;
  typing: boolean;
  userId: string;
};
export type chatComposerSendTypingStatusMutation$variables = {
  input: SendTypingStatusInput;
};
export type chatComposerSendTypingStatusMutation$data = {
  readonly sendTypingStatus: {
    readonly clientMutationId: string | null | undefined;
  } | null | undefined;
};
export type chatComposerSendTypingStatusMutation = {
  response: chatComposerSendTypingStatusMutation$data;
  variables: chatComposerSendTypingStatusMutation$variables;
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
    "concreteType": "SendTypingStatusPayload",
    "kind": "LinkedField",
    "name": "sendTypingStatus",
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
    "name": "chatComposerSendTypingStatusMutation",
    "selections": (v1/*: any*/),
    "type": "mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "chatComposerSendTypingStatusMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5be208f7be281418f33778c0c2fa44ce",
    "id": null,
    "metadata": {},
    "name": "chatComposerSendTypingStatusMutation",
    "operationKind": "mutation",
    "text": "mutation chatComposerSendTypingStatusMutation(\n  $input: SendTypingStatusInput!\n) {\n  sendTypingStatus(input: $input) {\n    clientMutationId\n  }\n}\n"
  }
};
})();

(node as any).hash = "ea68f419de4656986cb88461f8e80704";

export default node;
