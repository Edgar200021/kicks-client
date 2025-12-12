import type { UUID } from "@/common/types/common";

export const endpoints = {
	auth: {
		signUp: "/auth/sign-up",
		signIn: "/auth/sign-in",
		verifyAccount: "/auth/verify-account",
		forgotPassword: "/auth/forgot-password",
		resetPassword: "/auth/reset-password",
		logout: "/auth/logout",
		getMe: "/auth/me",
	},
	admin: {
		users: {
			getAll: "/admin/user",
			remove: (id: UUID) => `/admin/user/${id}`,
			blockToggle: (id: UUID) => `/admin/user/${id}/block-toggle`,
		},
		categories: {
			getAll: "/admin/category",
			create: "/admin/category",
			remove: (id: UUID) => `/admin/category/${id}`,
			update: (id: UUID) => `/admin/category/${id}`,
		},
		brands: {
			getAll: "/admin/brand",
			create: "/admin/brand",
			remove: (id: UUID) => `/admin/brand/${id}`,
			update: (id: UUID) => `/admin/brand/${id}`,
		},
		products: {
			getAll: "/admin/product",
			getFilters: "/admin/product/filters",
			create: "/admin/product",
			remove: (id: UUID) => `/admin/product/${id}`,
			update: (id: UUID) => `/admin/product/${id}`,
		},
	},
} as const;
