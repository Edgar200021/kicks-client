import type { Nullable } from "@/types/common";

export type ApiSuccessResponse<T> = {
	statusCode: number;
	data: T;
};

export type ApiErrorResponse = {
	statusCode: number;
	error: string;
};

export type ApiValidationErrorResponse<T extends string[]> = {
	statusCode: number;
	errors: Partial<Record<T[number], string>>;
};

export enum UserGender {
	Female = "female",
	Male = "male",
	Other = "other",
}

export enum UserRole {
	Admin = "admin",
	Regular = "regular",
}

export type User = {
	email: string;
	firstName: Nullable<string>;
	lastName: Nullable<string>;
	role: UserRole;
	gender: Nullable<UserGender>;
};
