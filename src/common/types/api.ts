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
	createdAt: string;
	updatedAt: string;
	isVerified: boolean;
	isBanned: boolean;
	googleId: Nullable<string>;
	facebookId: Nullable<string>;
};

export type Category = {
	id: string;
	createdAt: string;
	updatedAt: string;
	name: string;
};

export type Brand = {
	id: string;
	createdAt: string;
	updatedAt: string;
	name: string;
};

export enum ProductGender {
	Men = "men",
	Unisex = "unisex",
	Women = "women",
}

export type AdminProduct = {
	id: string;
	createdAt: string;
	updatedAt: string;
	title: string;
	description: string;
	gender: ProductGender;
	tags: string[];
	isDeleted: boolean;
	category: Nullable<Pick<Category, "id" | "name">>;
	brand: Nullable<Pick<Brand, "id" | "name">>;
};

export type AdminProductFilters = {
	tags: string[];
	categories: string[];
	brands: string[];
};
