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
			getAll: "admin/user",
		},
	},
} as const;
