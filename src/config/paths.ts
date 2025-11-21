export const paths = {
	home: "/",
	profile: "/profile",
	admin: {
		root: "/admin",
	},
	auth: {
		signIn: {
			path: "/auth/(signup-signin)/sign-in",
			href: "/auth/sign-in",
		},
		signUp: {
			path: "/auth/(signup-signin)/sign-up",
			href: "/auth/sign-up",
		},
		accountVerification: "/auth/account-verification",
		forgotPassword: "/auth/forgot-password",
		resetPassword: "/auth/reset-password",
	},
	cart: "/cart",
} as const;
