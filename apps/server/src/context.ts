import type { ExecutionContext } from "graphql-helix";
import { type DataLoaders, getDataLoaders } from "./dataloaders";
import type { User } from "./modules/user/UserModel";

export type Context = {
	user: User | null;
	dataloaders: DataLoaders;
};

export const buildContext = async (ctx: ExecutionContext): Promise<Context> => {
	return {
		user: null,
		dataloaders: getDataLoaders(),
	};
};
