import type { ApiSuccessResponse, User } from "@/common/types/api";
import type { ForgotPasswordInput } from "@/features/auth/schemas/forgot-password.schema";
import type { ResetPasswordInput } from "@/features/auth/schemas/reset-password.schema";
import type { SignInInput } from "@/features/auth/schemas/sign-in.schema";
import type { SignUpInput } from "@/features/auth/schemas/sign-up.schema";
import type { VerifyAccountInput } from "@/features/auth/schemas/verify-account.schema";

export type SignUpRequest = SignUpInput;
export type SignUpResponse = ApiSuccessResponse<string>;

export type SignInRequest = SignInInput;
export type SignInResponse = ApiSuccessResponse<User>;

export type VerifyAccountRequest = VerifyAccountInput;
export type VerifyAccountResponse = ApiSuccessResponse<null>;

export type ForgotPasswordRequest = ForgotPasswordInput;
export type ForgotPasswordResponse = ApiSuccessResponse<string>;

export type ResetPasswordRequest = ResetPasswordInput;
export type ResetPasswordResponse = ApiSuccessResponse<string>;
