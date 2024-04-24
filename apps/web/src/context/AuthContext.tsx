"use client";

import { useUser } from "@/hooks/useUser";
import { createContext } from "react";
import type { useUserQuery$data } from "../../__generated__/useUserQuery.graphql";
import { Login } from "@/components/login";

type AuthContextData = {
	me: useUserQuery$data["me"];
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

type AuthProviderProps = {
	children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
	const me = useUser();

	return (
		<AuthContext.Provider value={{ me }}>
			{me ? children : <Login />}
		</AuthContext.Provider>
	);
}
