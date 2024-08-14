import { generateToken } from "@/auth";
import type { Context } from "@/context";
import { genSalt, hash } from "bcrypt";
import {
	GraphQLEnumType,
	GraphQLList,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { EmailAddressResolver } from "graphql-scalars";
import { type User, UserModel } from "../UserModel";
import { UserType } from "../UserType";

type RegisterInput = {
	username: string;
	email: string;
	password: string;
};

type RegisterError = "USERNAME_TAKEN" | "EMAIL_TAKEN";

type RegisterOutput = {
	token: string | null;
	user: User | null;
	errors: RegisterError[] | null;
};

export const Register = mutationWithClientMutationId<
	RegisterInput,
	Promise<RegisterOutput>,
	Context
>({
	name: "RegisterUser",
	outputFields: {
		token: {
			type: GraphQLString,
		},
		user: {
			type: UserType,
		},
		errors: {
			type: new GraphQLList(
				new GraphQLNonNull(
					new GraphQLEnumType({
						name: "RegisterMutationErrors",
						values: {
							USERNAME_TAKEN: { value: "USERNAME_TAKEN" },
							EMAIL_TAKEN: { value: "EMAIL_TAKEN" },
						},
					}),
				),
			),
		},
	},
	inputFields: {
		username: { type: new GraphQLNonNull(GraphQLString) },
		email: { type: EmailAddressResolver },
		password: { type: new GraphQLNonNull(GraphQLString) },
	},
	mutateAndGetPayload: async ({ email, password, username }) => {
		const cleanUsername = username.trim();
		const cleanEmail = email.trim().toLowerCase();

		const duplicateUser = await UserModel.findOne({
			$or: [{ email: cleanEmail }, { username: cleanUsername }],
		});

		if (duplicateUser) {
			const errors: RegisterError[] = [];

			if (duplicateUser.email === cleanEmail) {
				errors.push("EMAIL_TAKEN");
			}
			if (duplicateUser.username === cleanUsername) {
				errors.push("USERNAME_TAKEN");
			}

			return { errors, token: null, user: null };
		}

		const salt = await genSalt();
		const hashedPassword = await hash(password, salt);

		const user = await UserModel.create({
			email: cleanEmail,
			password: hashedPassword,
			username: cleanUsername,
		});
		const token = generateToken(user);

		try {
			await user.save();
		} catch (err) {
			throw new Error(JSON.stringify(err));
		}

		return { token, user, errors: null };
	},
});
