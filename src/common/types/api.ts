import type { Nullable } from "@/common/types/common";

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

export type WithPageCountResponse<K extends string, T> = {
	pageCount: number;
} & Record<K, T>;

export enum UserGender {
	Male = "male",
	Female = "female",
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

export type AdminUser = User & {
	id: string;
	isVerified: boolean;
	isBanned: boolean;
	createdAt: string;
	updatedAt: string;
	googleId: Nullable<string>;
	facebookId: Nullable<string>;
};
