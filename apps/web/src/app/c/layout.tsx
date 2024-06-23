"use client";

import { Sidebar } from "@/components/sidebar";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@ui/components";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="flex dark:bg-neutral-950/20">
			<ResizablePanelGroup direction="horizontal">
				<ResizablePanel maxSize={30} defaultSize={20} className="min-w-[300px]">
					<Sidebar />
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel>{children}</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
