/**
 * @generated SignedSource<<ffc52eae033d163363506ae077b76e84>>
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
    readonly group: boolean | null | undefined;
    readonly name: string;
    readonly users: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly avatar: string | null | undefined;
          readonly id: string;
          readonly username: string;
        } | null | undefined;
      } | null | undefined>;
    } | null | undefined;
  } | null | undefined;
  readonly user: {
    readonly id: string;
    readonly username: string;
  } | null | undefined;
  readonly " $fragmentType": "chatHeaderFragment";
};
export type chatHeaderFragment$key = {
  readonly " $data"?: chatHeaderFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"chatHeaderFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "chatId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "chatHeaderFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "chatId"
        }
      ],
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
          "concreteType": "UserConnection",
          "kind": "LinkedField",
          "name": "users",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "UserEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "User",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    (v0/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "avatar",
                      "storageKey": null
                    },
                    (v1/*: any*/)
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "userId",
          "variableName": "chatId"
        }
      ],
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "user",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "query",
  "abstractKey": null
};
})();

(node as any).hash = "dac46cb90b3b8c6d4e27d93cb518b8d9";

export default node;
