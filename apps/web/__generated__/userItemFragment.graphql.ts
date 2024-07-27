/**
 * @generated SignedSource<<86027dcdf51aef8e0b87cae366a386f9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type userItemFragment$data = {
  readonly avatar: string | null | undefined;
  readonly id: string;
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
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "de4746298be1a797f82df0f66f69ccb6";

export default node;
