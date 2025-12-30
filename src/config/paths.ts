export const paths = {
	home: "/",
	profile: "/profile",
	admin: {
		root: "/admin",
		users: "/admin/users",
		products: {
			root: "/admin/products",
			detail: `/admin/products/$id`,
			sku: "/admin/products/sku",
			skuDetail: "/admin/products/sku/$id",
		},
		orders: "/admin/orders",
		categories: "/admin/categories",
		brands: "/admin/brands",
	},
	auth: {
		signIn: "/auth/sign-in",
		signUp: "/auth/sign-up",
		accountVerification: "/auth/account-verification",
		forgotPassword: "/auth/forgot-password",
		resetPassword: "/auth/reset-password",
	},
	cart: "/cart",
} as const;
