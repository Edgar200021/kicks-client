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
			remove: (id: string) => `/admin/user/${id}`,
			blockToggle: (id: string) => `/admin/user/${id}/block-toggle`,
		},
		categories: {
			getAll: "/admin/category",
			create: "/admin/category",
			remove: (id: string) => `/admin/category/${id}`,
			update: (id: string) => `/admin/category/${id}`,
		},
		brands: {
			getAll: "/admin/brand",
			create: "/admin/brand",
			remove: (id: string) => `/admin/brand/${id}`,
			update: (id: string) => `/admin/brand/${id}`,
		},
		products: {
			getAll: "/admin/product",
			getFilters: "/admin/product/filters",
			create: "/admin/product",
			remove: (id: string) => `/admin/product/${id}`,
			update: (id: string) => `/admin/product/${id}`,
		},
	},
} as const;