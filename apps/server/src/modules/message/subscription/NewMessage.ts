import type { Context } from "@/context";
import { events, pubSub } from "@/pubsub";
import { GraphQLNonNull, GraphQLString } from "graphql";
import { fromGlobalId, toGlobalId } from "graphql-relay";
import { subscriptionWithClientId } from "graphql-relay-subscription";
import { withFilter } from "graphql-subscriptions";
import { MessageLoader } from "../MessageLoader";
import { MessageConnection } from "../MessageType";

type NewMessageInput = {
  chatId: string;
};

type NewMessage = {
  id: string;
  chatId: string;
};

export const NewMessage = subscriptionWithClientId<
  NewMessage,
  Context,
  NewMessageInput
>({
  name: "NewMessage",
  inputFields: {
    chatId: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    message: {
      type: MessageConnection.edgeType,
      resolve: async (msg, _args, ctx) => {
        const node = await MessageLoader.load(ctx, msg.id);
        if (!node) return null;

        return {
          node,
          cursor: toGlobalId("Message", node.id),
        };
      },
    },
  },
  subscribe: (input, ctx) => {
    const resolver = withFilter(
      () => pubSub.asyncIterator(events.message.new),
      (payload: NewMessage, input: NewMessageInput) => {
        return fromGlobalId(input.chatId).id === payload.chatId;
      }
    );
    return resolver(null, input, ctx);
  },
});
