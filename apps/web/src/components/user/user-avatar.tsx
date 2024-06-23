import { Avatar, AvatarFallback, AvatarImage } from "@ui/components";
import { cn } from "@ui/lib/utils";

type UserAvatarProps = {
	name: string;
	imageUrl?: string | null;
	className?: string;
	color?: "light" | "dark";
};

export function UserAvatar({
	color = "light",
	className,
	name,
	imageUrl,
}: UserAvatarProps) {
	return (
		<Avatar className={cn("size-14", className)}>
			<AvatarImage>
				<img src={imageUrl ?? ""} alt={name} />
			</AvatarImage>
			<AvatarFallback
				className={cn(color === "dark" && "bg-neutral-700 text-neutral-100")}
			>
				<p className="uppercase">{name.slice(0, 2)}</p>
			</AvatarFallback>
		</Avatar>
	);
}
