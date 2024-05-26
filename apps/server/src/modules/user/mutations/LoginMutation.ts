import { generateToken } from "@/auth";
import type { Context } from "@/context";
import { compare } from "bcrypt";
import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { GraphQLNonEmptyString } from "graphql-scalars";
import { type User, UserModel } from "../UserModel";
import { UserType } from "../UserType";

type LoginInput = {
  username?: string;
  email?: string;
  password: string;
};

type LoginOutput = {
  user: User;
  token: string;
};

export const Login = mutationWithClientMutationId<
  LoginInput,
  Promise<LoginOutput>,
  Context
>({
  name: "LoginMutation",
  inputFields: {
    password: { type: GraphQLNonEmptyString },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
  },
  outputFields: {
    token: { type: new GraphQLNonNull(GraphQLString) },
    user: { type: UserType },
  },
  mutateAndGetPayload: async ({ email, username, password }) => {
    const user = await UserModel.findOne({
      $or: [
        { email: email?.toLowerCase()?.trim() },
        { username: username?.trim() },
      ],
    }).select("+password");

    if (!user) {
      throw new Error("Invalid email or username");
    }

    if (!(await compare(password, user.password))) {
      throw new Error("Invalid password");
    }

    const token = generateToken(user);

    return { token, user };
  },
});
