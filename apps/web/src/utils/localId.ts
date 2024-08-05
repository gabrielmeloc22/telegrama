type IdStore = Record<string, number>;

const getIdStore = () =>
	JSON.parse(localStorage.getItem("idStore") ?? "{}") as IdStore;

export const getNextLocalId = (chatId: string) => {
	const idStore = getIdStore();

	return idStore[chatId] ?? 0;
};

export const setNextLocalId = (chatId: string, value: number) => {
	const idStore = getIdStore();
	idStore[chatId] = value;

	localStorage.setItem("idStore", JSON.stringify(idStore));
};
