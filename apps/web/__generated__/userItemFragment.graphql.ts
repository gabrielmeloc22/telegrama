/**
 * @generated SignedSource<<4ce9f37472a287649fe70f2eba652b1e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type userItemFragment$data = {
  readonly _id: string;
  readonly avatar: string | null | undefined;
  readonly username: string;
  readonly " $fragmentType": "userItemFragment";
};
export type userItemFragment$key = {
  readonly " $data"?: userItemFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"userItemFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "userItemFragment",
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
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "3ed15fb7f5a0f8b1acccbbe72ea57c1d";

export default node;
