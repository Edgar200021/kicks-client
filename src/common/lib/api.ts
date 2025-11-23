import {
	type BaseQueryFn,
	createApi,
	type FetchArgs,
	type FetchBaseQueryError,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { TAG_TYPES } from "@/common/constants/redux";
import { globalActions } from "@/common/store/slice";
import { endpoints } from "@/config/endpoints";
import { env } from "@/config/env";

const baseQuery = fetchBaseQuery({
	baseUrl: env.API_URL,
	credentials: "include",
});

const customBaseQuery: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	const result = await baseQuery(args, api, extraOptions);

	const fetchArgs = args as FetchArgs;

	if (result.error?.status === 401) {
		if (fetchArgs && fetchArgs.url !== endpoints.auth.getMe) {
			toast.info("Your session has expired. Please sign in again.");
		}
		api.dispatch(globalActions.setUser(null));
	}

	return result;
};

export const api = createApi({
	reducerPath: "api",
	baseQuery: customBaseQuery,
	endpoints: (builder) => ({
		healthCheck: builder.query<string, null>({
			query: () => ({
				url: "/health",
			}),
		}),
	}),
	tagTypes: TAG_TYPES,
});
