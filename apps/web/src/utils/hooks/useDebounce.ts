import { useEffect, useState } from "react";

/**
 *  @param {String} value
 *  @param {Number} timeout
 * @return {unknown} debounced value
 *
 *  @example
 *  const debounced = useDebounce(query, 500);
 */
export const useDebounce = <T = unknown>(value: T, timeout: number): T => {
	const [debounced, setDebounced] = useState(value);

	useEffect(() => {
		const t = setTimeout(() => {
			setDebounced(value);
		}, timeout);

		return () => clearTimeout(t);
	}, [value, timeout]);

	return debounced;
};
