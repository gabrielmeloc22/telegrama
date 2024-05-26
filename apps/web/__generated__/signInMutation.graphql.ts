/**
 * @generated SignedSource<<71a7b3ace6092302442518eb1b54b416>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
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
    readonly token: string;
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
    "cacheID": "bd993aa4126099cecaa476bd8b538eae",
    "id": null,
    "metadata": {},
    "name": "signInMutation",
    "operationKind": "mutation",
    "text": "mutation signInMutation(\n  $input: LoginMutationInput!\n) {\n  login(input: $input) {\n    token\n  }\n}\n"
  }
};
})();

(node as any).hash = "4fa36ed103325b0e115e52cb17a6a6a1";

export default node;
