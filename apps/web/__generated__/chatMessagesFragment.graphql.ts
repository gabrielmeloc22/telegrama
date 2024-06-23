/**
 * @generated SignedSource<<6491da628e27e6c0d7b4f4b4774c2d73>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type chatMessagesFragment$data = {
  readonly messages: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly from: {
          readonly id: string;
        };
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"chatMessageFragment">;
      } | null | undefined;
    } | null | undefined>;
  };
  readonly " $fragmentType": "chatMessagesFragment";
};
export type chatMessagesFragment$key = {
  readonly " $data"?: chatMessagesFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"chatMessagesFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "messages"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": 50,
      "kind": "LocalArgument",
      "name": "count"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "cursor"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "userId"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "count",
          "cursor": "cursor"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": require('./chatMessagesRefetchQuery.graphql')
    }
  },
  "name": "chatMessagesFragment",
  "selections": [
    {
      "alias": "messages",
      "args": [
        {
          "kind": "Variable",
          "name": "userId",
          "variableName": "userId"
        }
      ],
      "concreteType": "MessageConnection",
      "kind": "LinkedField",
      "name": "__ChatMessagesFragment_messages_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "MessageEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Message",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "User",
                  "kind": "LinkedField",
                  "name": "from",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/)
                  ],
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "chatMessageFragment"
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
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

(node as any).hash = "61241e9fbf596225d8fe3e259a4dbd70";

export default node;
