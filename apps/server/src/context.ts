import type { Context as KoaContext } from "koa";
import { getToken, verifyToken } from "./auth";
import { type DataLoaders, getDataLoaders } from "./dataloaders";
import type { User } from "./modules/user/UserModel";

export type Context = {
	user: User | null;
	dataloaders: DataLoaders;
	ctx: KoaContext;
};

export const buildContext = async (ctx: KoaContext): Promise<Context> => {
	const dataloaders = getDataLoaders();
	const token = getToken(ctx.headers);
	const user = token
		? await verifyToken(token, { dataloaders, user: null, ctx })
		: null;

	return {
		user,
		dataloaders,
		ctx,
	};
};
