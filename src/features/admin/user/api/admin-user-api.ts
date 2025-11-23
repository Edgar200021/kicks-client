import { api } from "@/common/lib/api";
import { endpoints } from "@/config/endpoints";
import type {
	GetAllUsersRequest,
	GetAllUsersResponse,
} from "@/features/admin/user/types/api";

export const adminUserApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getAllUsers: builder.query<GetAllUsersResponse, GetAllUsersRequest>({
			query: (params) => ({
				url: endpoints.admin.users.getAll,
				params,
			}),
		}),
	}),
});

export const { useLazyGetAllUsersQuery } = adminUserApi;
