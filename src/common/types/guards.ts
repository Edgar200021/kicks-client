import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { ApiErrorResponse, ApiValidationErrorResponse } from "@/common/types/api";

export const isRtkErrorWithOriginalStatus = (
	error: unknown,
): error is Extract<FetchBaseQueryError, { originalStatus: number }> => {
	const err = error as FetchBaseQueryError;
	return err && "originalStatus" in err && err.status !== undefined;
};

export const isRtkErrorWithStatus = (
	error: unknown,
): error is Extract<FetchBaseQueryError, { status: number }> => {
	const err = error as FetchBaseQueryError;
	return (
		err &&
		"status" in err &&
		err.status !== undefined &&
		!Number.isNaN(err.status)
	);
};

export const isApiError = (err: unknown): err is ApiErrorResponse => {
	const error = err as ApiErrorResponse;
	return error && error.error !== undefined && error.statusCode !== undefined;
};

export const isApiValidationError = (
	err: unknown,
): err is ApiValidationErrorResponse<[]> => {
	const error = err as ApiValidationErrorResponse<[]>;
	return error && error.errors !== undefined && error.statusCode !== undefined;
};