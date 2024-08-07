"use client";

import { Sidebar } from "@/components/sidebar";
import { useInboxSubscription } from "@/hooks/useInboxSubscription";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	useInboxSubscription();

	return (
		<div className="flex dark:bg-neutral-950/20">
			<div className="w-1/2 max-w-[420px]">
				<Sidebar />
			</div>
			<div className="w-full">{children}</div>
		</div>
	);
}
