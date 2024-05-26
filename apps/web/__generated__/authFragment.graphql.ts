/**
 * @generated SignedSource<<972ef5201ad99bdac9dc8051cf14957d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type authFragment$data = {
  readonly avatar: string | null | undefined;
  readonly email: string | null | undefined;
  readonly id: string;
  readonly username: string;
  readonly " $fragmentType": "authFragment";
};
export type authFragment$key = {
  readonly " $data"?: authFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"authFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "authFragment",
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
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "abe504757d3f44ea7b11b449561dc0f8";

export default node;
