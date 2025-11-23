export const paths = {
	home: "/",
	profile: "/profile",
	admin: {
		root: "/admin",
		users: "/admin/users",
		products: "/admin/products",
		orders: "/admin/orders",
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
