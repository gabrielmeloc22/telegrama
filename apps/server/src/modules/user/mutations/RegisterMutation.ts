import { generateToken } from "@/auth";
import type { Context } from "@/context";
import { genSaltSync, hashSync } from "bcrypt";
import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { EmailAddressResolver } from "graphql-scalars";
import { type User, UserModel } from "../UserModel";
import { UserType } from "../UserType";

type RegisterInput = {
	username: string;
	email: string;
	password: string;
};

type RegisterOutput = {
	token: string | null;
	user: User | null;
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
	},
	inputFields: {
		username: { type: new GraphQLNonNull(GraphQLString) },
		email: { type: EmailAddressResolver },
		password: { type: new GraphQLNonNull(GraphQLString) },
	},
	mutateAndGetPayload: async ({ email, password, username }, { ctx }) => {
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

		try {
			await user.save();
			ctx.cookies.set("token", token);
		} catch (err) {
			throw new Error(JSON.stringify(err));
		}

		return { token, user };
	},
});
