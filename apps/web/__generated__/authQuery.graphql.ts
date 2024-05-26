/**
 * @generated SignedSource<<b96e7e671c925d260c2d6cb49128ce54>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type authQuery$variables = Record<PropertyKey, never>;
export type authQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"authFragment">;
  } | null | undefined;
};
export type authQuery = {
  response: authQuery$data;
  variables: authQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "authQuery",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "authFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "authQuery",
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
    ]
  },
  "params": {
    "cacheID": "24d7d91b4dc884f7ecc96541b886c72f",
    "id": null,
    "metadata": {},
    "name": "authQuery",
    "operationKind": "query",
    "text": "query authQuery {\n  me {\n    ...authFragment\n    id\n  }\n}\n\nfragment authFragment on User {\n  id\n  username\n  avatar\n  email\n}\n"
  }
};

(node as any).hash = "201dd7bf487a128c6b9575638a352361";

export default node;
