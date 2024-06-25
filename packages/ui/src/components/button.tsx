import { Slottable } from "@radix-ui/react-slot";
import { cn } from "@ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { Spinner } from "./spinner";

export const buttonVariants = cva(
	"rounded-md flex justify-center items-center w-fit text-sm transition-colors font-medium disabled:opacity-60 disabled:cursor-not-allowed outline-none",
	{
		variants: {
			design: {
				primary:
					"bg-primary text-primary-foreground enabled:hover:bg-secondary",
				"primary-ghost": "text-primary hover:bg-primary/10",
				outline:
					"border border-primary text-primary enabled:hover:bg-primary enabled:hover:text-primary-foreground",
				link: "enabled:hover:underline text-primary",
				ghost: "hover:bg-muted/20",
				"error-ghost": "text-red-500 hover:bg-red-500/10",
				unstyled: "",
			},
			size: {
				sm: "py-1 px-2",
				md: "py-2 px-4",
				lg: "py-3 px-8",
				icon: "aspect-square rounded-full size-fit p-3",
			},
		},
		compoundVariants: [
			{
				design: "link",
				className: "p-0",
			},
			{ design: "unstyled", className: "p-0" },
		],
	},
);
export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement> &
		ButtonVariantProps & {
			isLoading?: boolean;
		}
>(
	(
		{
			type = "button",
			className,
			design = "primary",
			size = "md",
			isLoading = false,
			children,
			...props
		},
		ref,
	) => (
		<button
			type={type}
			ref={ref}
			disabled={props.disabled || isLoading}
			aria-busy={isLoading}
			className={cn(buttonVariants({ size, design }), className)}
			{...props}
		>
			<Slottable>{children}</Slottable>
			{isLoading && <Spinner className="ml-2 size-5" />}
		</button>
	),
);
