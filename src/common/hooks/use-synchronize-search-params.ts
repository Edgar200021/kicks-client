import { useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const useSynchronizeSearchParams = <T extends string[] = string[]>(
	keys: T,
) => {
	const search = useSearch({
		strict: false,
	});
	const [searchMap, setSearchMap] =
		useState<Partial<Record<T[number], string | number | boolean>>>();

	console.log(search);

	useEffect(() => {
		const searchMap = Object.entries(search).reduce(
			(acc, [key, val]) => {
				if (!keys.includes(key)) return acc;

				acc[key as T[number]] = val;
				return acc;
			},
			{} as Partial<Record<T[number], string | number | boolean>>,
		);

		setSearchMap(searchMap);
	}, []);

	return searchMap;
};
