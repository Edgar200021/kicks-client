import { api } from "@/lib/api";
import { globalActions } from "@/store/slice";
import { endpoints } from "@/config/endpoints";
import type {
	ForgotPasswordRequest,
	ForgotPasswordResponse,
	GetMeRequest,
	GetMeResponse,
	LogoutRequest,
	LogoutResponse,
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
				url: endpoints.auth.signUp,
				method: "POST",
				body,
			}),
		}),

		signIn: builder.mutation<SignInResponse, SignInRequest>({
			query: (body) => ({
				url: endpoints.auth.signIn,
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
				url: endpoints.auth.verifyAccount,
				method: "POST",
				body,
			}),
		}),

		forgotPassword: builder.mutation<
			ForgotPasswordResponse,
			ForgotPasswordRequest
		>({
			query: (body) => ({
				url: endpoints.auth.forgotPassword,
				method: "POST",
				body,
			}),
		}),

		resetPassword: builder.mutation<
			ResetPasswordResponse,
			ResetPasswordRequest
		>({
			query: (body) => ({
				url: endpoints.auth.resetPassword,
				method: "POST",
				body,
			}),
		}),

		logout: builder.mutation<LogoutResponse, LogoutRequest>({
			query: () => ({
				url: endpoints.auth.logout,
				method: "POST",
			}),
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				await queryFulfilled;
				dispatch(globalActions.setUser(null));
			},
		}),

		getMe: builder.query<GetMeResponse, GetMeRequest>({
			query: () => ({
				url: endpoints.auth.getMe,
			}),
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				const { data } = await queryFulfilled;
				dispatch(globalActions.setUser(data.data));
			},
		}),
	}),
});

export const {
	useSignUpMutation,
	useSignInMutation,
	useAccountVerificationMutation,
	useForgotPasswordMutation,
	useResetPasswordMutation,
	useLogoutMutation,
	useGetMeQuery,
} = authApi;