import type { SignInInput } from "@/features/auth/schemas/sign-in.schema";
import type { SignUpInput } from "@/features/auth/schemas/sign-up.schema";
import type { VerifyAccountInput } from "@/features/auth/schemas/verify-account.schema";
import type { ApiSuccessResponse, User } from "@/types/api";

export type SignUpRequest = SignUpInput;
export type SignUpResponse = ApiSuccessResponse<null>;

export type SignInRequest = SignInInput;
export type SignInResponse = ApiSuccessResponse<User>;

export type VerifyAccountRequest = VerifyAccountInput;
export type VerifyAccountResponse = ApiSuccessResponse<null>;
