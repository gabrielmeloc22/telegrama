"use client";

import { useUser } from "@/hooks/useUser";
import { Button, Tabs, TabsContent } from "@ui/components";
import { useEffect, useState } from "react";
import { SignIn } from "./sign-in";
import { SignUp } from "./sign-up";

import { ArrowLeft } from "lucide-react";

type AuthProviderProps = {
	children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
	const [value, setValue] = useState("sign-in");
	const [client, setClient] = useState(false);
	const me = useUser(!client);

	// avoid hydration errors
	// TODO: find a better way to handle sign-in/sign-up mutations
	useEffect(() => {
		setClient(true);
	}, []);

	if (!client) {
		return null;
	}

	return !me ? (
		<Tabs
			onValueChange={setValue}
			value={value}
			className="mt-[15%] flex h-screen flex-col items-center gap-12 *:max-w-md"
		>
			<header className="flex w-full flex-col gap-4 text-center">
				<h1 className="font-bold text-3xl text-primary">telegrama</h1>
			</header>

			<main className="flex w-full flex-col rounded-lg border border-input p-10">
				<TabsContent
					value="sign-in"
					className="flex flex-col items-center gap-4"
				>
					<SignIn />
					<p className="flex gap-2 text-sm">
						Don't have an account?{" "}
						<Button design="link" onClick={() => setValue("sign-up")}>
							Sign up here.
						</Button>
					</p>
				</TabsContent>
				<TabsContent value="sign-up">
					<Button design="unstyled" onClick={() => setValue("sign-in")}>
						<ArrowLeft />
					</Button>
					<SignUp />
				</TabsContent>
			</main>
		</Tabs>
	) : (
		children
	);
}
