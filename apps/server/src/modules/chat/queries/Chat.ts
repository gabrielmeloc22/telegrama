import type { Context } from "@/context";
import {
  type GraphQLFieldConfig,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { ChatLoader } from "../ChatLoader";
import { ChatType } from "../ChatType";
import { ChatModel } from "../ChatModel";

type ChatQueryArguments = {
  chatId: string;
};

export const Chat: GraphQLFieldConfig<unknown, Context, ChatQueryArguments> = {
  type: ChatType,
  description: "A chat",
  args: {
    chatId: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_, args, ctx) => {
    if (
      !ctx.user ||
      !(await ChatModel.findOne({
        _id: args.chatId,
        users: { $elemMatch: { $eq: ctx.user?.id } },
      }))
    ) {
      throw new Error("Not authorized");
    }

    return ChatLoader.load(ctx, args.chatId);
  },
};
