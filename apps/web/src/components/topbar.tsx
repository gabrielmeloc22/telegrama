import { useUser } from "@/hooks/useUser";
import { logout } from "@/utils/auth";
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@ui/components";
import base64url from "base64-url";
import { Bookmark, LogOut, Menu, Settings } from "lucide-react";
import Link from "next/link";
import { SearchField } from "./search-field";

type TopBarProps = {
	onSearch: (value: string) => void;
};

export function Topbar({ onSearch }: TopBarProps) {
	const user = useUser();

	return (
		<nav className="flex items-center gap-2 px-2">
			<DropdownMenu>
				<DropdownMenuContent align="start">
					<DropdownMenuItem>
						<Settings className="size-5" />
						Settings
					</DropdownMenuItem>
					<Link href={`/c/${base64url.escape(user?.id ?? "")}`}>
						<DropdownMenuItem>
							<Bookmark className="size-5" />
							Saved messages
						</DropdownMenuItem>
					</Link>
					<DropdownMenuItem
						onClick={() => {
							logout();
							location.reload();
						}}
					>
						<LogOut className="size-5" />
						Logout
					</DropdownMenuItem>
				</DropdownMenuContent>
				<DropdownMenuTrigger asChild>
					<Button design="ghost" className="rounded-full p-3">
						<Menu className="size-6" />
					</Button>
				</DropdownMenuTrigger>
			</DropdownMenu>
			<SearchField placeholder="Search" onSearch={onSearch} />
		</nav>
	);
}
