import { Button, NavigationStackTrigger, Spinner } from "@ui/components";
import { useNavigationStackControls } from "@ui/components/navigation-stack";
import { ArrowLeft } from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";
import { SearchField } from "../search-field";
import { UserList } from "../user/user-list";

export function ChatCreate() {
	const searchRef = useRef<HTMLInputElement>(null);

	const [search, setSearch] = useState("");
	const { reset } = useNavigationStackControls();

	useEffect(() => {
		// searchRef.current?.focus();
	}, []);

	return (
		<div className="flex h-full flex-col gap-4 p-2 dark:bg-neutral-800">
			<div className="flex items-center gap-2">
				<NavigationStackTrigger navigate="backwards" asChild>
					<Button design="unstyled">
						<ArrowLeft className="size-5" />
					</Button>
				</NavigationStackTrigger>
				<SearchField
					ref={searchRef}
					placeholder="Search for a user"
					onSearch={(v) => setSearch(v)}
				/>
			</div>
			<Suspense fallback={<Spinner />}>
				<UserList query={search} onSelect={reset} />
			</Suspense>
		</div>
	);
}
