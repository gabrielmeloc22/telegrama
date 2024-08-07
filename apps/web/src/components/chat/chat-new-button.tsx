import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	NavigationStackTrigger,
} from "@ui/components";
import { Edit2, User, Users } from "lucide-react";

type ChatNewButtonProps = {
	className?: string;
	onNewGroup?: () => void;
};

export function ChatNewButton({ className, onNewGroup }: ChatNewButtonProps) {
	return (
		<DropdownMenu>
			<DropdownMenuContent align="end">
				<NavigationStackTrigger navigate="forwards" asChild>
					<DropdownMenuItem>
						<User className="size-5" />
						New message
					</DropdownMenuItem>
				</NavigationStackTrigger>
				<NavigationStackTrigger navigate={2} asChild>
					<DropdownMenuItem onClick={onNewGroup}>
						<Users className="size-5" />
						New group chat
					</DropdownMenuItem>
				</NavigationStackTrigger>
			</DropdownMenuContent>
			<DropdownMenuTrigger asChild>
				<Button size="icon" className={className}>
					<Edit2 className="size-5" />
				</Button>
			</DropdownMenuTrigger>
		</DropdownMenu>
	);
}
