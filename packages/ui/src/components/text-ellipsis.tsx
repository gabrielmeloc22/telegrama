import { cn } from "@ui/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";

export const TextEllipsis = forwardRef<
	HTMLParagraphElement,
	HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
	return (
		<p
			ref={ref}
			className={cn(
				"max-w-[20ch] overflow-hidden text-ellipsis text-nowrap",
				className,
			)}
			{...props}
		/>
	);
});
