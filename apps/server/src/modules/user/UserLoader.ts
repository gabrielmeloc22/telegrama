import { createLoader } from "@entria/graphql-mongo-helpers";
import { UserModel } from "./UserModel";

export const UserLoader = createLoader({
	loaderName: "UserLoader",
	model: UserModel,
});
