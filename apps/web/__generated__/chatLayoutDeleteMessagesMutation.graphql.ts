/**
 * @generated SignedSource<<e7441f212682acc44acd1f8fec394af8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteMessageInput = {
  chatId: string;
  clientMutationId?: string | null | undefined;
  ids?: ReadonlyArray<string | null | undefined> | null | undefined;
};
export type chatLayoutDeleteMessagesMutation$variables = {
  input: DeleteMessageInput;
};
export type chatLayoutDeleteMessagesMutation$data = {
  readonly deleteMessage: {
    readonly deletedIds: ReadonlyArray<string | null | undefined> | null | undefined;
  } | null | undefined;
};
export type chatLayoutDeleteMessagesMutation = {
  response: chatLayoutDeleteMessagesMutation$data;
  variables: chatLayoutDeleteMessagesMutation$variables;
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
    "concreteType": "DeleteMessagePayload",
    "kind": "LinkedField",
    "name": "deleteMessage",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "deletedIds",
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
    "name": "chatLayoutDeleteMessagesMutation",
    "selections": (v1/*: any*/),
    "type": "mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "chatLayoutDeleteMessagesMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "85e5452f0a896415c9c1287354b592c1",
    "id": null,
    "metadata": {},
    "name": "chatLayoutDeleteMessagesMutation",
    "operationKind": "mutation",
    "text": "mutation chatLayoutDeleteMessagesMutation(\n  $input: DeleteMessageInput!\n) {\n  deleteMessage(input: $input) {\n    deletedIds\n  }\n}\n"
  }
};
})();

(node as any).hash = "8e9dbb01ae7c1ea3b9deb1c45bf1a6da";

export default node;
