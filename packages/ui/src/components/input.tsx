import { cn } from "@ui/lib/utils";
import * as React from "react";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, placeholder = "", ...props }, ref) => {
		return (
			<input
				type={type}
				placeholder={placeholder}
				className={cn(
					"flex h-12 w-full rounded-md border border-input bg-transparent px-4 py-2 text-foreground text-sm ring-offset-background transition-colors disabled:cursor-not-allowed file:border-0 focus:border-2 focus:border-primary hover:border-primary file:bg-transparent file:font-medium file:text-sm placeholder:text-muted disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = "Input";

export { Input };
