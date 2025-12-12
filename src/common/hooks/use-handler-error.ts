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

		handleError(error);
	}, [error, options?.disabled]);

	const handleError = useCallback((error: unknown) => {
		if (isRtkErrorWithStatus(error) && error.status === 429) {
			toast.error("Too many requests");
			return;
		}

		const err =
			isRtkErrorWithOriginalStatus(error) || isRtkErrorWithStatus(error)
				? error.data
				: error;

		if (isApiValidationError(err)) {
			setApiValidationErrors(err.errors);
			options?.validationErrorCb?.(err.errors);
			return;
		}

		toast.error(
			isApiError(err)
				? err.error
				: err instanceof Error
					? err.message
					: "Something went wrong",
		);
	}, []);

	const clearErrors = useCallback(() => {
		setApiValidationErrors({});
	}, []);

	return { apiValidationErrors, clearErrors, handleError };
};
