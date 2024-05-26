/**
 * @generated SignedSource<<bbfbd82160613aca7c5398124cd52beb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LoginMutationInput = {
  clientMutationId?: string | null | undefined;
  email?: string | null | undefined;
  password?: any | null | undefined;
  username?: string | null | undefined;
};
export type loginMutation$variables = {
  input: LoginMutationInput;
};
export type loginMutation$data = {
  readonly login: {
    readonly token: string;
    readonly user: {
      readonly " $fragmentSpreads": FragmentRefs<"authFragment">;
    } | null | undefined;
  } | null | undefined;
};
export type loginMutation = {
  response: loginMutation$data;
  variables: loginMutation$variables;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "token",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "loginMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "LoginMutationPayload",
        "kind": "LinkedField",
        "name": "login",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "authFragment"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "loginMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "LoginMutationPayload",
        "kind": "LinkedField",
        "name": "login",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "username",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "avatar",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "email",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "15f40988b916e1206dae1bcd3dc90287",
    "id": null,
    "metadata": {},
    "name": "loginMutation",
    "operationKind": "mutation",
    "text": "mutation loginMutation(\n  $input: LoginMutationInput!\n) {\n  login(input: $input) {\n    token\n    user {\n      ...authFragment\n      id\n    }\n  }\n}\n\nfragment authFragment on User {\n  id\n  username\n  avatar\n  email\n}\n"
  }
};
})();

(node as any).hash = "4eabdfa3a2e5a47956959486c756205c";

export default node;
