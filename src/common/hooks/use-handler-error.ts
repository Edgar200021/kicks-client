import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { ApiValidationErrorResponse } from "@/common/types/api";
import {
	isApiError,
	isApiValidationError,
	isRtkErrorWithOriginalStatus,
	isRtkErrorWithStatus,
} from "@/common/types/guards";

export const useHandleError = <T extends string[] = []>(
	error?: unknown,
	options?: {
		disabled?: boolean;
		validationErrorCb?: (err: ApiValidationErrorResponse<T>["errors"]) => void;
	},
) => {
	const [apiValidationErrors, setApiValidationErrors] = useState<
		ApiValidationErrorResponse<T>["errors"]
	>({});

	useEffect(() => {
		if (!error || options?.disabled) return;

		if (isRtkErrorWithStatus(error) && error.status === 429) {
			toast.error("Too many requests");
			return;
		}

		if (isApiValidationError(error)) {
			setApiValidationErrors(error.errors);
			options?.validationErrorCb?.(error.errors);
			return;
		}

		const err =
			isRtkErrorWithOriginalStatus(error) || isRtkErrorWithStatus(error)
				? error.data
				: error;

		toast.error(
			isApiError(err)
				? err.error
				: err instanceof Error
					? err.message
					: "Something went wrong",
		);
	}, [error, options?.disabled, options?.validationErrorCb]);

	const clearErrors = useCallback(() => {
		setApiValidationErrors({});
	}, []);

	return { apiValidationErrors, clearErrors };
};