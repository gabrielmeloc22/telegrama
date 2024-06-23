/**
 * @generated SignedSource<<9bd1ccf594dbfc52c484b9dc73411eb3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type onTypeInput = {
  chatId: string;
  clientSubscriptionId?: string | null | undefined;
};
export type chatMessagesTypingStatusSubscription$variables = {
  input: onTypeInput;
};
export type chatMessagesTypingStatusSubscription$data = {
  readonly onType: {
    readonly typing: boolean | null | undefined;
    readonly userId: string | null | undefined;
  } | null | undefined;
};
export type chatMessagesTypingStatusSubscription = {
  response: chatMessagesTypingStatusSubscription$data;
  variables: chatMessagesTypingStatusSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "onTypePayload",
    "kind": "LinkedField",
    "name": "onType",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "typing",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "userId",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "chatMessagesTypingStatusSubscription",
    "selections": (v1/*: any*/),
    "type": "subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "chatMessagesTypingStatusSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "747fb9dfcf3c2938d21b178f71e2152d",
    "id": null,
    "metadata": {},
    "name": "chatMessagesTypingStatusSubscription",
    "operationKind": "subscription",
    "text": "subscription chatMessagesTypingStatusSubscription(\n  $input: onTypeInput!\n) {\n  onType(input: $input) {\n    typing\n    userId\n  }\n}\n"
  }
};
})();

(node as any).hash = "02159fb207639f3a41d0115702714c3e";

export default node;
