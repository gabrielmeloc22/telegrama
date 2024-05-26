/**
 * @generated SignedSource<<cfa59af379513e4942e6206621cf7e34>>
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
export type signUpMutation$variables = {
  input: RegisterUserInput;
};
export type signUpMutation$data = {
  readonly register: {
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
    "cacheID": "66dd23d210dcae92f1ea1c34e58b6a99",
    "id": null,
    "metadata": {},
    "name": "signUpMutation",
    "operationKind": "mutation",
    "text": "mutation signUpMutation(\n  $input: RegisterUserInput!\n) {\n  register(input: $input) {\n    token\n  }\n}\n"
  }
};
})();

(node as any).hash = "7ccb1de92d60cc47ad30bd70a4a99d20";

export default node;
