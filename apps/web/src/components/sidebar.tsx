import { NavigationStack, NavigationStackItem, Spinner } from "@ui/components";
import { Suspense, useState } from "react";
import { ChatCreate } from "./chat/chat-create";
import { ChatList } from "./chat/chat-list";
import { ChatNewButton } from "./chat/chat-new-button";
import { Topbar } from "./topbar";

export function Sidebar() {
	const [search, setSearch] = useState("");

	return (
		<aside className="relative flex h-screen w-full flex-col border-r dark:border-neutral-700 dark:bg-neutral-800">
			<NavigationStack>
				<NavigationStackItem value={0} forceMount>
					<div className="flex size-full w-full flex-col gap-6 p-2">
						<Topbar onSearch={setSearch} />
						<Suspense
							fallback={
								<div className="flex w-full items-center justify-center">
									<Spinner />
								</div>
							}
						>
							<ChatList filter={search} />
						</Suspense>
					</div>
					<ChatNewButton className="absolute right-6 bottom-8 size-14" />
				</NavigationStackItem>

				<NavigationStackItem value={1}>
					<ChatCreate />
				</NavigationStackItem>
			</NavigationStack>
		</aside>
	);
}
