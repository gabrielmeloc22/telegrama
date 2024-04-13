import jwt, { type JwtPayload } from "jsonwebtoken";
import type { IncomingHttpHeaders } from "node:http";
import type { Context } from "./context";
import { UserLoader } from "./modules/user/UserLoader";
import type { User } from "./modules/user/UserModel";

type TokenPayload = {
	id: string;
} & JwtPayload;

export const getToken = (headers: IncomingHttpHeaders) => {
	if (!headers.authorization || !headers.authorization.startsWith("Bearer ")) {
		return null;
	}
	return headers.authorization.split(" ")[1];
};

export const generateToken = (user: User) =>
	jwt.sign({ id: user._id }, process.env.JWT_SECRET);

export const verifyToken = async (token: string, context: Context) => {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;

		return await UserLoader.load(context, decoded.id);
	} catch (_) {
		return null;
	}
};
