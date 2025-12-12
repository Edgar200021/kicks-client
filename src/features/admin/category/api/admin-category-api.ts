import { api } from "@/common/lib/api";
import type { RootState } from "@/common/store/store";
import type { UUID } from "@/common/types/common";
import { endpoints } from "@/config/endpoints";
import type {
	CreateCategoryRequest,
	CreateCategoryResponse,
	GetAllCategoriesRequest,
	GetAllCategoriesResponse,
	RemoveCategoryRequest,
	RemoveCategoryResponse,
	UpdateCategoryRequest,
	UpdateCategoryResponse,
} from "../types/api";

export const adminCategoryApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getAllCategories: builder.query<
			GetAllCategoriesResponse,
			GetAllCategoriesRequest
		>({
			query: (params) => ({
				url: endpoints.admin.categories.getAll,
				params,
			}),
		}),

		createCategory: builder.mutation<
			CreateCategoryResponse,
			CreateCategoryRequest
		>({
			query: (body) => ({
				url: endpoints.admin.categories.create,
				method: "POST",
				body,
			}),
			onQueryStarted: async (_, { dispatch, queryFulfilled, getState }) => {
				const state = getState() as RootState;

				const { data } = await queryFulfilled;

				dispatch(
					adminCategoryApi.util.updateQueryData(
						"getAllCategories",
						state.category.filters,
						(draft) => {
							draft.data.unshift(data.data);
						},
					),
				);
			},
		}),

		updateCategory: builder.mutation<
			UpdateCategoryResponse,
			UpdateCategoryRequest
		>({
			query: (body) => ({
				url: endpoints.admin.categories.update(body.id as UUID),
				method: "PATCH",
				body: {
					name: body.name,
				},
			}),
			onQueryStarted: async (
				{ id, name },
				{ dispatch, queryFulfilled, getState },
			) => {
				const state = getState() as RootState;

				const patchResult = dispatch(
					adminCategoryApi.util.updateQueryData(
						"getAllCategories",
						state.category.filters,
						(draft) => {
							const index = draft.data.findIndex(
								(category) => category.id === id,
							);
							if (index === -1) return;

							draft.data[index] = { ...draft.data[index], name };
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

		removeCategory: builder.mutation<
			RemoveCategoryResponse,
			RemoveCategoryRequest
		>({
			query: (params) => ({
				url: endpoints.admin.categories.remove(params.id as UUID),
				method: "DELETE",
			}),
			onQueryStarted: async (
				{ id },
				{ dispatch, queryFulfilled, getState },
			) => {
				const state = getState() as RootState;

				const patchResult = dispatch(
					adminCategoryApi.util.updateQueryData(
						"getAllCategories",
						state.category.filters,
						(draft) => {
							const index = draft.data.findIndex(
								(category) => category.id === id,
							);
							if (index === -1) return;

							draft.data.splice(index, 1);
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
	useLazyGetAllCategoriesQuery,
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
	useRemoveCategoryMutation,
} = adminCategoryApi;
