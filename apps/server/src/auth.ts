import jwt from "jsonwebtoken";
import type { Context } from "./context";
import { UserLoader } from "./modules/user/UserLoader";
import type { User } from "./modules/user/UserModel";

type TokenPayload = {
	id: string;
};

export const generateToken = (user: User) =>
	jwt.sign({ id: user._id }, process.env.JWT_SECRET);

export const verifyToken = async (token: string, context: Context) => {
	try {
		const decoded = jwt.verify(process.env.JWT_SECRET, token) as TokenPayload;
		const user = await UserLoader.load(
			{ dataloaders: context.dataLoaders },
			decoded.id,
		);
		return user;
	} catch (_) {
		return null;
	}
};
