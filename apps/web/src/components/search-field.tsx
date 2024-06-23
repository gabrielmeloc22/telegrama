import { useDebounce } from "@/utils/hooks/useDebounce";
import { Input, Slot } from "@ui/components";
import { cn } from "@ui/lib/utils";
import {
	forwardRef,
	useEffect,
	useState,
	type InputHTMLAttributes,
} from "react";

type SearchFieldProps = {
	onSearch: (value: string) => void;
	debounceTime?: number;
};

export const SearchField = forwardRef<
	HTMLInputElement,
	InputHTMLAttributes<HTMLInputElement> & SearchFieldProps
>(({ onSearch, className, debounceTime = 500, ...props }, ref) => {
	const [inputValue, setInputValue] = useState("");

	const debouncedSearch = useDebounce(inputValue, debounceTime);

	useEffect(() => {
		onSearch(debouncedSearch);
	}, [debouncedSearch, onSearch]);

	return (
		<Slot {...props}>
			<Input
				ref={ref}
				className={cn("rounded-full dark:bg-neutral-900", className)}
				onChange={(e) => {
					setInputValue(e.currentTarget.value.trim());
				}}
			/>
		</Slot>
	);
});
