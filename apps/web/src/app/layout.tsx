import "@/app/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import RelayEnvironment from "@/relay/relay-environment";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Telegrama",
	description: "Yet another messaging app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<RelayEnvironment>
			<html lang="en" className="dark">
				<body className={inter.className}>
					<Suspense fallback={<p>loading...</p>}>
						<AuthProvider>{children}</AuthProvider>
					</Suspense>
				</body>
			</html>
		</RelayEnvironment>
	);
}
