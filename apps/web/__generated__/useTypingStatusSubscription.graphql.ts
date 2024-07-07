/**
 * @generated SignedSource<<01686b1897b57a156bc63cc2e4374c74>>
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
export type useTypingStatusSubscription$variables = {
  input: onTypeInput;
};
export type useTypingStatusSubscription$data = {
  readonly onType: {
    readonly typing: boolean | null | undefined;
    readonly user: {
      readonly id: string;
      readonly username: string;
    } | null | undefined;
  } | null | undefined;
};
export type useTypingStatusSubscription = {
  response: useTypingStatusSubscription$data;
  variables: useTypingStatusSubscription$variables;
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
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
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
          }
        ],
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
    "name": "useTypingStatusSubscription",
    "selections": (v1/*: any*/),
    "type": "subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useTypingStatusSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3cbbea74ac67ced2e2b0641ca87389d9",
    "id": null,
    "metadata": {},
    "name": "useTypingStatusSubscription",
    "operationKind": "subscription",
    "text": "subscription useTypingStatusSubscription(\n  $input: onTypeInput!\n) {\n  onType(input: $input) {\n    typing\n    user {\n      id\n      username\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9e2e146dacaf1a830d3e72a90aa0f537";

export default node;
