import { Slot } from "@radix-ui/react-slot";
import { cn } from "@ui/lib/utils";
import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
	type HTMLAttributes,
	type SetStateAction,
} from "react";

type NavigationDirection = "backwards" | "forwards";

type NavigationStackContextData = {
	tab: number;
	direction: NavigationDirection | null;
	goForwards: () => void;
	goBackwards: () => void;
	navigate: (index: number) => void;
	navigating: boolean;
	setNavigating: React.Dispatch<React.SetStateAction<boolean>>;
	lastTab: number;
	reset: () => void;
};

const NavigationStackContext = React.createContext<NavigationStackContextData>(
	{} as NavigationStackContextData,
);

type NavigationStackApi = Pick<
	NavigationStackContextData,
	"navigate" | "goBackwards" | "goForwards" | "reset"
>;

const NavigationStack = React.forwardRef<
	HTMLDivElement,
	HTMLAttributes<HTMLDivElement> & {
		setApi?: React.Dispatch<SetStateAction<NavigationStackApi | undefined>>;
	}
>(({ setApi, children, ...props }, ref) => {
	const [tab, setTab] = useState(0);
	const [direction, setDirection] = useState<NavigationDirection | null>(null);
	const [navigating, setNavigating] = useState(false);

	const lastTab = useRef(0);

	const goForwards = useCallback(() => {
		lastTab.current = tab;

		setNavigating(true);
		setDirection("forwards");
		setTab((tab) => tab + 1);
	}, [tab]);

	const goBackwards = useCallback(() => {
		lastTab.current = tab;

		if (tab === 0) return;

		setNavigating(true);
		setDirection("backwards");
		setTab((tab) => tab - 1);
	}, [tab]);

	const navigate = useCallback(
		(index: number) => {
			lastTab.current = tab;

			setNavigating(true);
			setDirection(index > tab ? "forwards" : "backwards");
			setTab(index);
		},
		[tab],
	);

	const reset = useCallback(() => {
		if (tab === 0) return;
		lastTab.current = tab;

		setNavigating(true);
		setDirection("backwards");
		setTab(0);
	}, [tab]);

	useEffect(() => {
		if (setApi) {
			setApi({ goBackwards, goForwards, navigate, reset });
		}
	}, [setApi, goBackwards, goForwards, navigate, reset]);

	return (
		<NavigationStackContext.Provider
			value={{
				lastTab: lastTab.current,
				tab,
				navigating,
				setNavigating,
				direction,
				navigate,
				goBackwards,
				goForwards,
				reset,
			}}
		>
			<div ref={ref} className="relative z-0 size-full outline-none" {...props}>
				{children}
			</div>
		</NavigationStackContext.Provider>
	);
});

const NavigationStackTrigger = React.forwardRef<
	HTMLButtonElement,
	HTMLAttributes<HTMLButtonElement> & {
		navigate: "backwards" | "forwards" | number;
		asChild?: boolean;
	}
>(({ navigate, asChild, ...props }, ref) => {
	const {
		navigate: goTo,
		goBackwards,
		goForwards,
	} = useContext(NavigationStackContext);

	const Component = asChild ? Slot : "button";

	return (
		<Component
			onClick={() => {
				if (typeof navigate === "number") {
					goTo(navigate);
				} else if (navigate === "forwards") {
					goForwards();
				} else if (navigate === "backwards") {
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
		forceMount?: boolean;
	}
>(({ value, forceMount = false, className, ...props }, ref) => {
	const { navigate, tab, lastTab, direction, navigating, setNavigating } =
		useContext(NavigationStackContext);

	const selected = value === tab;

	return (
		(forceMount || selected || (navigating && lastTab === value)) && (
			<section
				// biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === "Escape" && value !== 0 && selected) {
						e.stopPropagation();
						navigate(lastTab);
					}
				}}
				ref={ref}
				onAnimationEnd={(e) => {
					if (selected) {
						e.stopPropagation();
						e.currentTarget.focus();
					}
					setNavigating(false);
				}}
				style={{
					zIndex: value,
					animationDuration: "0.35s",
					transitionTimingFunction: "cubic-bezier(.4, 0, .2, 1)",
				}}
				className={cn(
					"absolute top-0 size-full min-w-full border-red-500 fill-mode-forwards outline-none",
					selected &&
						direction === "forwards" &&
						"slide-in-from-right-[100%] animate-in",
					selected &&
						direction === "backwards" &&
						"slide-in-from-left-[25%] animate-in",
					lastTab === value &&
						direction === "forwards" &&
						"slide-out-to-left-[25%] animate-out",
					lastTab === value &&
						direction === "backwards" &&
						"slide-out-to-right-[100%] animate-out",
					className,
				)}
				{...props}
			/>
		)
	);
});

const useNavigationStackControls = () => {
	const { goBackwards, goForwards, reset } = React.useContext(
		NavigationStackContext,
	);

	return { goBackwards, goForwards, reset };
};

export {
	NavigationStack,
	NavigationStackItem,
	NavigationStackTrigger,
	useNavigationStackControls,
	type NavigationStackApi,
};
