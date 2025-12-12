import { paths } from "@/config/paths.ts";

type ExtractPaths<T> = T extends string
	? T
	: T extends Record<string, unknown>
		? ExtractPaths<T[keyof T]>
		: never;

export type AdminPath = ExtractPaths<typeof paths.admin>;
