/**
 * @generated SignedSource<<7a2ba8244749b7a2a1b038411c3a851c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type LoginMutationErrors = "INVALID_CREDENTIALS" | "INVALID_PASSWORD" | "%future added value";
export type LoginMutationInput = {
  clientMutationId?: string | null | undefined;
  email?: string | null | undefined;
  password?: any | null | undefined;
  username?: string | null | undefined;
};
export type signInMutation$variables = {
  input: LoginMutationInput;
};
export type signInMutation$data = {
  readonly login: {
    readonly errors: ReadonlyArray<LoginMutationErrors> | null | undefined;
    readonly token: string | null | undefined;
  } | null | undefined;
};
export type signInMutation = {
  response: signInMutation$data;
  variables: signInMutation$variables;
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
    "concreteType": "LoginMutationPayload",
    "kind": "LinkedField",
    "name": "login",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "token",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "errors",
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
    "name": "signInMutation",
    "selections": (v1/*: any*/),
    "type": "mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "signInMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "93f56d0594ee50174c0f4450c44b8cf8",
    "id": null,
    "metadata": {},
    "name": "signInMutation",
    "operationKind": "mutation",
    "text": "mutation signInMutation(\n  $input: LoginMutationInput!\n) {\n  login(input: $input) {\n    token\n    errors\n  }\n}\n"
  }
};
})();

(node as any).hash = "aa79abbe3474eed7c9b0f4a48b6cf027";

export default node;
