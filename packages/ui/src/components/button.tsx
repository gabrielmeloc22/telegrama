import { type ButtonHTMLAttributes, forwardRef } from "react";

export const Button = forwardRef<
	HTMLButtonElement,
	ButtonHTMLAttributes<HTMLButtonElement & {}>
>(({ type = "button", ...props }, ref) => (
	<button type={type} ref={ref} {...props} />
));
