import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, ms: number = 1000) => {
	const [debouncedValue, setDebouncedvalue] = useState<T>();

	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebouncedvalue(value);
		}, ms);

		return () => clearTimeout(timerId);
	}, [value, ms]);

	return debouncedValue;
};
