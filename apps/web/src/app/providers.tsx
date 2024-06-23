"use client";

import { AuthProvider } from "@/components/auth";
import RelayEnvironment from "@/relay/relay-environment";
import { Spinner } from "@ui/components";
import { Suspense } from "react";

type ProviderProps = {
	children: React.ReactNode;
};

export function Providers({ children }: ProviderProps) {
	return (
		<RelayEnvironment>
			<Suspense
				fallback={
					<div className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-4">
						<div className="flex flex-col items-center justify-center">
							<p className="font-bold text-lg text-primary">Telegrama</p>
							<p className="text-muted text-sm">Loading your messages...</p>
						</div>
						<Spinner className="size-4" />
					</div>
				}
			>
				<AuthProvider>{children}</AuthProvider>
			</Suspense>
		</RelayEnvironment>
	);
}
