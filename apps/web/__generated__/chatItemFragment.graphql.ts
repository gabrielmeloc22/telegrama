/**
 * @generated SignedSource<<5d4a220e6e03c01a28e51e444b3fbe25>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type chatItemFragment$data = {
  readonly group: boolean | null | undefined;
  readonly id: string;
  readonly lastMessage: {
    readonly node: {
      readonly content: string;
      readonly createdAt: any | null | undefined;
      readonly id: string;
    } | null | undefined;
  } | null | undefined;
  readonly name: string;
  readonly user: {
    readonly _id: string;
    readonly avatar: string | null | undefined;
    readonly username: string;
  } | null | undefined;
  readonly " $fragmentType": "chatItemFragment";
};
export type chatItemFragment$key = {
  readonly " $data"?: chatItemFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"chatItemFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "chatItemFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "group",
      "storageKey": null
    },
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
          "name": "_id",
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "MessageEdge",
      "kind": "LinkedField",
      "name": "lastMessage",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Message",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "createdAt",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "content",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Chat",
  "abstractKey": null
};
})();

(node as any).hash = "30839f69d85217d984cb293e68afa171";

export default node;
