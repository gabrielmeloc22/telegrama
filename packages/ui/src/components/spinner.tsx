import React, { type HTMLAttributes } from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@ui/lib/utils";

const Spinner = React.forwardRef<
	HTMLSpanElement,
	HTMLAttributes<HTMLSpanElement & {}>
>(({ className, ...props }, ref) => (
	<span
		ref={ref}
		role="status"
		aria-live="polite"
		className={cn("flex size-7", className)}
		{...props}
	>
		<LoaderCircle className="size-full animate-spin" />
		<div className="sr-only">loading...</div>
	</span>
));

export { Spinner };
