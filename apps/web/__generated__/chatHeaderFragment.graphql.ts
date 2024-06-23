/**
 * @generated SignedSource<<04fe09830b6ddd5bfebd8a19597c7dc1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type chatHeaderFragment$data = {
  readonly chat: {
    readonly name: string;
  } | null | undefined;
  readonly user: {
    readonly username: string;
  } | null | undefined;
  readonly " $fragmentType": "chatHeaderFragment";
};
export type chatHeaderFragment$key = {
  readonly " $data"?: chatHeaderFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"chatHeaderFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Variable",
    "name": "userId",
    "variableName": "userId"
  }
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "userId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "chatHeaderFragment",
  "selections": [
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "Chat",
      "kind": "LinkedField",
      "name": "chat",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "user",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "username",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "query",
  "abstractKey": null
};
})();

(node as any).hash = "055928c3a3895ee9033ee2a71d72f85e";

export default node;
