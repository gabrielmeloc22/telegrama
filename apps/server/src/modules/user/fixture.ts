import { faker } from "@faker-js/faker";
import { genSaltSync, hashSync } from "bcrypt";
import { type User, UserModel } from "./UserModel";

export const createUser = async ({
	password,
	email,
	username,
}: Partial<User> | undefined = {}) => {
	const salt = genSaltSync();

	const hashedPassword = hashSync(password ?? faker.internet.password(), salt);

	const user = await UserModel.create({
		email: email ?? faker.internet.email(),
		password: hashedPassword,
		username: username ?? faker.internet.userName(),
	});
	await user.save();

	return user;
};
