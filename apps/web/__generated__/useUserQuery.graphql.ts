/**
 * @generated SignedSource<<79841e800860469dd83300fa26f85211>>
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
    "cacheID": "6d8ea2c14d48ba7288fbd76a61d8be4c",
    "id": null,
    "metadata": {},
    "name": "useUserQuery",
    "operationKind": "query",
    "text": "query useUserQuery {\n  me {\n    id\n    username\n    avatar\n  }\n}\n"
  }
};
})();

(node as any).hash = "caa588b456f63dd0a936e0374e22ac4f";

export default node;
