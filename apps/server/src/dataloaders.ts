import { MessageLoader } from "./modules/message/MessageLoader";
import { UserLoader } from "./modules/user/UserLoader";

export type DataLoaders = {
	UserLoader: ReturnType<typeof UserLoader.getLoader>;
	MessageLoader: ReturnType<typeof MessageLoader.getLoader>;
};

export const getDataLoaders = (): DataLoaders => {
	return {
		UserLoader: UserLoader.getLoader(),
		MessageLoader: MessageLoader.getLoader(),
	};
};
