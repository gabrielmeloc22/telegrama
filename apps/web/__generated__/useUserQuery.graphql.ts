/**
 * @generated SignedSource<<09b1cbc6a93dd02da0b8a508f95856d0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type useUserQuery$variables = {
  skip: boolean;
};
export type useUserQuery$data = {
  readonly me?: {
    readonly _id: string;
    readonly avatar: string | null | undefined;
    readonly id: string;
    readonly username: string;
  } | null | undefined;
};
export type useUserQuery = {
  response: useUserQuery$data;
  variables: useUserQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "skip"
  }
],
v1 = [
  {
    "condition": "skip",
    "kind": "Condition",
    "passingValue": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "_id",
            "storageKey": null
          },
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
          }
        ],
        "storageKey": null
      }
    ]
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUserQuery",
    "selections": (v1/*: any*/),
    "type": "query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUserQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3b5aaea98b51b0faae51eb0c35ca51b4",
    "id": null,
    "metadata": {},
    "name": "useUserQuery",
    "operationKind": "query",
    "text": "query useUserQuery(\n  $skip: Boolean!\n) {\n  me @skip(if: $skip) {\n    _id\n    id\n    username\n    avatar\n  }\n}\n"
  }
};
})();

(node as any).hash = "4e21faa9ca00cbd5c78d4a56980c1541";

export default node;
