import { Slot } from "@radix-ui/react-slot";
import { cn, mergeRefs } from "@ui/lib/utils";
import React, {
	useContext,
	useEffect,
	useRef,
	useState,
	type HTMLAttributes,
} from "react";

type NavigationDirection = "backwards" | "forwards";

type NavigationStackContextData = {
	tab: number;
	direction: NavigationDirection;
	goForwards: () => void;
	goBackwards: () => void;
	navigating: boolean;
	onNavigationEnd: () => void;
};

const NavigationStackContext = React.createContext<NavigationStackContextData>(
	{} as NavigationStackContextData,
);

const NavigationStack = React.forwardRef<
	HTMLDivElement,
	HTMLAttributes<HTMLDivElement> & {
		value?: number;
	}
>(({ children, value, ...props }, ref) => {
	const wrapper = useRef<HTMLDivElement>(null);

	const [tab, setTab] = useState(0);
	const [direction, setDirection] = useState<NavigationDirection>("forwards");
	const [navigating, setNavigating] = useState(false);

	const goForwards = () => {
		setNavigating(true);
		setDirection("forwards");
		setTab((tab) => tab + 1);
	};

	const goBackwards = () => {
		if (tab <= 0) return;

		setNavigating(true);
		setDirection("backwards");
		setTab((tab) => tab - 1);
	};

	const onNavigationEnd = () => {
		setNavigating(false);
		wrapper.current?.focus();
	};

	return (
		<NavigationStackContext.Provider
			value={{
				tab,
				direction,
				goBackwards,
				goForwards,
				onNavigationEnd,
				navigating,
			}}
		>
			<div
				ref={mergeRefs(ref, wrapper)}
				// biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === "Escape") {
						goBackwards();
					}
				}}
				className="z-0 flex size-full outline-none"
				{...props}
			>
				{children}
			</div>
		</NavigationStackContext.Provider>
	);
});

const NavigationStackTrigger = React.forwardRef<
	HTMLButtonElement,
	HTMLAttributes<HTMLButtonElement> & {
		navigate: "backwards" | "forwards";
		asChild?: boolean;
	}
>(({ navigate, asChild, ...props }, ref) => {
	const { goBackwards, goForwards } = useContext(NavigationStackContext);

	const Component = asChild ? Slot : "button";

	return (
		<Component
			onClick={() => {
				if (navigate === "forwards") {
					goForwards();
				} else {
					goBackwards();
				}
			}}
			ref={ref}
			type="button"
			{...props}
		/>
	);
});

const NavigationStackItem = React.forwardRef<
	HTMLDivElement,
	HTMLAttributes<HTMLDivElement> & {
		value: number;
	}
>(({ children, value, ...props }, ref) => {
	const el = useRef<HTMLDivElement>(null);
	const { tab, direction, navigating, onNavigationEnd } = useContext(
		NavigationStackContext,
	);

	const selected = value === tab;
	const offsetX = -tab * 100;

	useEffect(() => {
		if (selected) {
			el.current?.focus();
		}
	}, [selected]);

	return (
		<section
			ref={ref}
			aria-hidden={!selected}
			onTransitionEnd={(e) => {
				// only trigger on the current element
				if (e.currentTarget === e.target && !selected) {
					onNavigationEnd();
				}
			}}
			style={{
				transitionDuration: selected ? "0.25s" : "0.4s",
				transitionTimingFunction: "cubic-bezier(.4, 0, .2, 1)",
				transform: `translateX(${offsetX}%)`,
			}}
			className={cn("size-full min-w-full transition-transform")}
			{...props}
		>
			{(selected ||
				(navigating &&
					((direction === "forwards" && tab === value + 1) ||
						(direction === "backwards" && tab === value - 1)))) &&
				children}
		</section>
	);
});

export { NavigationStack, NavigationStackItem, NavigationStackTrigger };
