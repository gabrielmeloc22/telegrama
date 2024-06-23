/**
 * @generated SignedSource<<b8249ba27589cad0680f7f22a539a4aa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type useUserQuery$variables = Record<PropertyKey, never>;
export type useUserQuery$data = {
  readonly me: {
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "useUserQuery",
    "selections": (v0/*: any*/),
    "type": "query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "useUserQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "ecff99879fb7f32da28f13341d7b7615",
    "id": null,
    "metadata": {},
    "name": "useUserQuery",
    "operationKind": "query",
    "text": "query useUserQuery {\n  me {\n    _id\n    id\n    username\n    avatar\n  }\n}\n"
  }
};
})();

(node as any).hash = "0aa471e1c2b54e8aa5530927c7523a9c";

export default node;
