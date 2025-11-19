import {
	type BaseQueryFn,
	createApi,
	type FetchArgs,
	type FetchBaseQueryError,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { env } from "@/config/env";
import { TAG_TYPES } from "@/constants/redux";
import { globalActions } from "@/store/slice";

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

	if (result.error?.status === 401) {
		api.dispatch(globalActions.setUser(null));
		return result;
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
