/**
 * @generated SignedSource<<22d1730d3d890d5e1ed3298758f0993e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RegisterUserInput = {
  clientMutationId?: string | null | undefined;
  email?: any | null | undefined;
  password: string;
  username: string;
};
export type registerUserMutation$variables = {
  input: RegisterUserInput;
};
export type registerUserMutation$data = {
  readonly register: {
    readonly token: string | null | undefined;
  } | null | undefined;
};
export type registerUserMutation = {
  response: registerUserMutation$data;
  variables: registerUserMutation$variables;
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
    "concreteType": "RegisterUserPayload",
    "kind": "LinkedField",
    "name": "register",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "token",
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
    "name": "registerUserMutation",
    "selections": (v1/*: any*/),
    "type": "mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "registerUserMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f1a5228d0cf33e1ff75caaa29e405346",
    "id": null,
    "metadata": {},
    "name": "registerUserMutation",
    "operationKind": "mutation",
    "text": "mutation registerUserMutation(\n  $input: RegisterUserInput!\n) {\n  register(input: $input) {\n    token\n  }\n}\n"
  }
};
})();

(node as any).hash = "4de06e8b20de0f0ff8dfe9ff75bead99";

export default node;
