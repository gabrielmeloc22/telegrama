import { clsx, type ClassValue } from "clsx";
import type React from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// biome-ignore lint/suspicious/noExplicitAny:
export function mergeRefs(...refs: React.ForwardedRef<any>[]) {
	return (instance: unknown) => {
		for (const ref of refs) {
			if (typeof ref === "function") {
				ref(instance);
			} else if (ref !== null) {
				ref.current = instance;
			}
		}
	};
}
