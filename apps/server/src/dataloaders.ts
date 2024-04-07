import { UserLoader } from "./modules/user/UserLoader";

export type DataLoaders = {
	UserLoader: ReturnType<typeof UserLoader.getLoader>;
};

export const getDataLoaders = (): DataLoaders => {
	return {
		UserLoader: UserLoader.getLoader(),
	};
};
