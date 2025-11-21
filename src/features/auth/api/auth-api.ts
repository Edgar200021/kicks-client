import { api } from "@/common/lib/api";
import { globalActions } from "@/common/store/slice";
import type {
	ForgotPasswordRequest,
	ForgotPasswordResponse,
	ResetPasswordRequest,
	ResetPasswordResponse,
	SignInRequest,
	SignInResponse,
	SignUpRequest,
	SignUpResponse,
	VerifyAccountRequest,
	VerifyAccountResponse,
} from "@/features/auth/types/api";

export const authApi = api.injectEndpoints({
	endpoints: (builder) => ({
		signUp: builder.mutation<SignUpResponse, SignUpRequest>({
			query: (body) => ({
				url: "/auth/sign-up",
				method: "POST",
				body,
			}),
		}),

		signIn: builder.mutation<SignInResponse, SignInRequest>({
			query: (body) => ({
				url: "/auth/sign-in",
				method: "POST",
				body,
			}),
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				const { data } = await queryFulfilled;
				dispatch(globalActions.setUser(data.data));
			},
		}),

		accountVerification: builder.mutation<
			VerifyAccountResponse,
			VerifyAccountRequest
		>({
			query: (body) => ({
				url: "/auth/verify-account",
				method: "POST",
				body,
			}),
		}),

		forgotPassword: builder.mutation<
			ForgotPasswordResponse,
			ForgotPasswordRequest
		>({
			query: (body) => ({
				url: "/auth/forgot-password",
				method: "POST",
				body,
			}),
		}),

		resetPassword: builder.mutation<
			ResetPasswordResponse,
			ResetPasswordRequest
		>({
			query: (body) => ({
				url: "/auth/reset-password",
				method: "POST",
				body,
			}),
		}),

		// logout: builder.mutation<LogoutResponse, LogoutRequest>({
		// 	query: () => ({
		// 		url: "/auth/logout",
		// 		method: "POST",
		// 	}),
		// 	onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
		// 		await queryFulfilled;
		// 		dispatch(authActions.setUser(null));
		// 	},
		// }),
	}),
});

export const {
	useSignUpMutation,
	useSignInMutation,
	useAccountVerificationMutation,
	useForgotPasswordMutation,
	useResetPasswordMutation,
} = authApi;
