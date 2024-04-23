import "@/app/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RelayEnvironment from "../relay/RelayEnvironment";

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
					{children}
				</body>
			</html>
		</RelayEnvironment>
	);
}
