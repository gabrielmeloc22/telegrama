/**
 * @generated SignedSource<<d901d286690be46a05ed4fa19818c1b3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type chatMessageFragment$data = {
  readonly content: string;
  readonly createdAt: any | null | undefined;
  readonly delivered: boolean;
  readonly deliveredAt: any | null | undefined;
  readonly from: {
    readonly avatar: string | null | undefined;
    readonly id: string;
    readonly username: string;
  };
  readonly id: string;
  readonly seen: boolean;
  readonly seenAt: any | null | undefined;
  readonly " $fragmentType": "chatMessageFragment";
};
export type chatMessageFragment$key = {
  readonly " $data"?: chatMessageFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"chatMessageFragment">;
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
  "name": "chatMessageFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "from",
      "plural": false,
      "selections": [
        (v0/*: any*/),
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
      "kind": "ScalarField",
      "name": "content",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "seen",
      "storageKey": null
    },
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
      "name": "seenAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "delivered",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "deliveredAt",
      "storageKey": null
    }
  ],
  "type": "Message",
  "abstractKey": null
};
})();

(node as any).hash = "5ed135989febf23ebed8eb3e4156d580";

export default node;
