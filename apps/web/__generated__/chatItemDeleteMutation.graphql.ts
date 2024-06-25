/**
 * @generated SignedSource<<4f0b76d2960d26c483df316064e14efb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteChatInput = {
  chatId: string;
  clientMutationId?: string | null | undefined;
};
export type chatItemDeleteMutation$variables = {
  input: DeleteChatInput;
};
export type chatItemDeleteMutation$data = {
  readonly deleteChat: {
    readonly deletedId: string | null | undefined;
  } | null | undefined;
};
export type chatItemDeleteMutation = {
  response: chatItemDeleteMutation$data;
  variables: chatItemDeleteMutation$variables;
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
    "concreteType": "DeleteChatPayload",
    "kind": "LinkedField",
    "name": "deleteChat",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "deletedId",
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
    "name": "chatItemDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "chatItemDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "786630c41dd950acec0dbd385f2e7cd1",
    "id": null,
    "metadata": {},
    "name": "chatItemDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation chatItemDeleteMutation(\n  $input: DeleteChatInput!\n) {\n  deleteChat(input: $input) {\n    deletedId\n  }\n}\n"
  }
};
})();

(node as any).hash = "434c309acce6bd14750e75255293bd25";

export default node;
