import { Slottable } from "@radix-ui/react-slot";
import { cn } from "@ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { Spinner } from "./spinner";

const variants = cva(
  "rounded-md flex justify-center w-fit text-sm transition-colors font-medium",
  {
    variants: {
      design: {
        primary: "bg-primary text-primary-foreground hover:bg-secondary",
        outline:
          "border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
      },
      size: {
        sm: "py-1 px-2",
        md: "py-2 px-4",
        lg: "py-3 px-8",
      },
    },
  }
);
export type ButtonVariantProps = VariantProps<typeof variants>;

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
    ref
  ) => (
    <button
      type={type}
      ref={ref}
      disabled={props.disabled || isLoading}
      aria-busy={isLoading}
      className={cn(variants({ design, size }), className)}
      {...props}
    >
      <Slottable>{children}</Slottable>
      {isLoading && <Spinner />}
    </button>
  )
);
