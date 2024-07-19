import "@/app/globals.css";
import "@repo/ui/styles";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

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
		<html lang="en" className="dark">
			<body className={inter.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
