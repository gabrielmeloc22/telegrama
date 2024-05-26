import type { Context } from "@/context";
import { connectionDefinitions } from "@entria/graphql-mongo-helpers";
import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { globalIdField } from "graphql-relay";
import { MessageLoader } from "../message/MessageLoader";
import { MessageType } from "../message/MessageType";
import { addTypeLoader, nodeInterface } from "../node/register";
import { UserModel } from "../user/UserModel";
import { UserType } from "../user/UserType";
import { ChatLoader } from "./ChatLoader";
import type { Chat } from "./ChatModel";

export const ChatType: GraphQLObjectType<Chat, Context> = new GraphQLObjectType<
  Chat,
  Context
>({
  name: "Chat",
  fields: () => ({
    id: globalIdField("Chat"),
    _id: {
      type: new GraphQLNonNull(GraphQLString),
      description: "mongoose_id",
    },
    user: {
      type: UserType,
      description: "The recipient when not a group chat",
      resolve: (chat, _, ctx) => {
        return (
          chat.users.length === 2 &&
          UserModel.findById(
            chat.users.find(({ _id }) => !_id.toString() === ctx.user?.id)
          )
        );
      },
    },
    name: {
      type: GraphQLString,
      resolve: async (chat) => chat.name,
    },
    lastMessage: {
      type: MessageType,
      resolve: async (chat, _args, ctx) =>
        chat.lastMessage ? MessageLoader.load(ctx, chat.lastMessage) : null,
    },
    group: {
      type: GraphQLBoolean,
      resolve: (chat) => chat.users.length > 2,
    },
    users: {
      description: "Group chat users",
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: (chat) => UserModel.find({ _id: { $in: chat.users } }),
    },
  }),
  interfaces: [nodeInterface],
});

addTypeLoader(ChatType, ChatLoader.load);

export const ChatConnection = connectionDefinitions({
  name: "Chat",
  nodeType: ChatType,
});
