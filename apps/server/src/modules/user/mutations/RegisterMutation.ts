import { generateToken } from "@/auth";
import type { Context } from "@/context";
import { genSaltSync, hashSync } from "bcrypt";
import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { type User, UserModel } from "../UserModel";
import { UserType } from "../UserType";

interface RegisterInput {
	username: string;
	email: string;
	password: string;
}

interface RegisterOutput {
	token: string | null;
	user: User | null;
}

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
	},
	inputFields: {
		username: { type: new GraphQLNonNull(GraphQLString) },
		email: { type: new GraphQLNonNull(GraphQLString) },
		password: { type: new GraphQLNonNull(GraphQLString) },
	},
	mutateAndGetPayload: async ({ email, password, username }, ctx) => {
		const userAlreadyExists = !!(await UserModel.findOne({
			$or: [
				{ email: email.trim().toLowerCase() },
				{ username: username.trim() },
			],
		}));

		if (userAlreadyExists) {
			throw new Error("User already exists");
		}

		const salt = genSaltSync();
		const hashedPassword = hashSync(password, salt);

		const user = await UserModel.create({
			email: email.trim(),
			password: hashedPassword,
			username: username.trim(),
		});
		const token = generateToken(user);

		// TODO: find ways to improve error handling
		user.save().catch((err) => {
			throw new Error(err.message);
		});

		return { token, user };
	},
});
