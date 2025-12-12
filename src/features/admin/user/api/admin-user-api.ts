import { api } from "@/common/lib/api";
import type { RootState } from "@/common/store/store";
import type { UUID } from "@/common/types/common";
import { endpoints } from "@/config/endpoints";
import type {
	BlockToggleRequest,
	BlockToggleResponse,
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

		blockToggle: builder.mutation<BlockToggleResponse, BlockToggleRequest>({
			query: (params) => ({
				url: endpoints.admin.users.blockToggle(params.id as UUID),
				method: "PATCH",
			}),
			onQueryStarted: async (
				{ id },
				{ dispatch, queryFulfilled, getState },
			) => {
				const state = getState() as RootState;

				const patchResult = dispatch(
					adminUserApi.util.updateQueryData(
						"getAllUsers",
						state.user.filters,
						(draft) => {
							const index = draft.data.users.findIndex(
								(user) => user.id === id,
							);
							if (index === -1) return;

							const user = draft.data.users[index];

							draft.data.users[index] = { ...user, isBanned: !user.isBanned };
						},
					),
				);

				try {
					await queryFulfilled;
				} catch (_) {
					patchResult.undo();
				}
			},
		}),

		removeUser: builder.mutation<BlockToggleResponse, BlockToggleRequest>({
			query: (params) => ({
				url: endpoints.admin.users.remove(params.id as UUID),
				method: "DELETE",
			}),
			onQueryStarted: async (
				{ id },
				{ dispatch, queryFulfilled, getState },
			) => {
				const state = getState() as RootState;

				const patchResult = dispatch(
					adminUserApi.util.updateQueryData(
						"getAllUsers",
						state.user.filters,
						(draft) => {
							const index = draft.data.users.findIndex(
								(user) => user.id === id,
							);
							if (index === -1) return;

							draft.data.users.splice(index, 1);
						},
					),
				);

				try {
					await queryFulfilled;
				} catch (_) {
					patchResult.undo();
				}
			},
		}),
	}),
});

export const {
	useLazyGetAllUsersQuery,
	useBlockToggleMutation,
	useRemoveUserMutation,
} = adminUserApi;
