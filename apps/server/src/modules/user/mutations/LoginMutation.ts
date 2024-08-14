import { generateToken } from "@/auth";
import type { Context } from "@/context";
import { compare } from "bcrypt";
import {
	GraphQLEnumType,
	GraphQLList,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { GraphQLNonEmptyString } from "graphql-scalars";
import { type User, UserModel } from "../UserModel";
import { UserType } from "../UserType";

type LoginInput = {
	username?: string;
	email?: string;
	password: string;
};

type LoginErrors = "INVALID_CREDENTIALS" | "INVALID_PASSWORD";

type LoginOutput = {
	user: User | null;
	token: string | null;
	errors: LoginErrors[] | null;
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
		token: { type: GraphQLString },
		user: { type: UserType },
		errors: {
			type: new GraphQLList(
				new GraphQLNonNull(
					new GraphQLEnumType({
						name: "LoginMutationErrors",
						values: {
							INVALID_CREDENTIALS: { value: "INVALID_CREDENTIALS" },
							INVALID_PASSWORD: { value: "INVALID_PASSWORD" },
						},
					}),
				),
			),
		},
	},
	mutateAndGetPayload: async ({ email, username, password }) => {
		const cleanEmail = email?.toLowerCase()?.trim();
		const cleanUsername = username?.trim();

		const user = await UserModel.findOne({
			$or: [{ email: cleanEmail }, { username: cleanUsername }],
		}).select("+password");

		if (!user) {
			return { errors: ["INVALID_CREDENTIALS"], token: null, user: null };
		}
		if (!(await compare(password, user.password))) {
			return { errors: ["INVALID_PASSWORD"], token: null, user: null };
		}

		const token = generateToken(user);

		return { token, user, errors: null };
	},
});
