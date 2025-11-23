import { useHandleError } from "@/common/hooks/use-handler-error";
import {
	isRtkErrorWithOriginalStatus,
	isRtkErrorWithStatus,
} from "@/common/types/guards";
import { useGetMeQuery } from "@/features/auth/api/auth-api";

export const useGetMe = () => {
	const { data, error, isLoading } = useGetMeQuery(null);
	const shouldSkipErrorHandling =
		(isRtkErrorWithStatus(error) && error.status === 401) ||
		(isRtkErrorWithOriginalStatus(error) && error.originalStatus === 401);

	useHandleError(error, {
		disabled: shouldSkipErrorHandling,
	});

	if (error && !shouldSkipErrorHandling) {
		throw new Error("Failed to get user details");
	}

	return { data, isLoading };
};
