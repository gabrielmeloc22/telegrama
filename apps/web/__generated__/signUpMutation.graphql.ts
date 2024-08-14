/**
 * @generated SignedSource<<21b95dec261cfa1256fb5c0de7a9010f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RegisterMutationErrors = "EMAIL_TAKEN" | "USERNAME_TAKEN" | "%future added value";
export type RegisterUserInput = {
  clientMutationId?: string | null | undefined;
  email?: any | null | undefined;
  password: string;
  username: string;
};
export type signUpMutation$variables = {
  input: RegisterUserInput;
};
export type signUpMutation$data = {
  readonly register: {
    readonly errors: ReadonlyArray<RegisterMutationErrors> | null | undefined;
    readonly token: string | null | undefined;
  } | null | undefined;
};
export type signUpMutation = {
  response: signUpMutation$data;
  variables: signUpMutation$variables;
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
        "name": "errors",
        "storageKey": null
      },
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
    "name": "signUpMutation",
    "selections": (v1/*: any*/),
    "type": "mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "signUpMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a6c30a7b101ecbb9544722512c98f18c",
    "id": null,
    "metadata": {},
    "name": "signUpMutation",
    "operationKind": "mutation",
    "text": "mutation signUpMutation(\n  $input: RegisterUserInput!\n) {\n  register(input: $input) {\n    errors\n    token\n  }\n}\n"
  }
};
})();

(node as any).hash = "b0598d4169075ac85d3ee1b413d17191";

export default node;
