import { api } from "@/lib/api";
import type { RootState } from "@/store/store";
import { endpoints } from "@/config/endpoints";
import type {
	CreateBrandRequest,
	CreateBrandResponse,
	GetAllBrandsRequest,
	GetAllBrandsResponse,
	RemoveBrandRequest,
	RemoveBrandResponse,
	UpdateBrandRequest,
	UpdateBrandResponse,
} from "../types/api";

export const adminBrandApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getAllBrands: builder.query<GetAllBrandsResponse, GetAllBrandsRequest>({
			query: (params) => ({
				url: endpoints.admin.brands.getAll,
				params,
			}),
		}),

		createBrand: builder.mutation<CreateBrandResponse, CreateBrandRequest>({
			query: (body) => ({
				url: endpoints.admin.brands.create,
				method: "POST",
				body,
			}),
			onQueryStarted: async (_, { dispatch, queryFulfilled, getState }) => {
				const state = getState() as RootState;

				const { data } = await queryFulfilled;

				dispatch(
					adminBrandApi.util.updateQueryData(
						"getAllBrands",
						state.brand.filters,
						(draft) => {
							draft.data.unshift(data.data);
						},
					),
				);
			},
		}),

		updateBrand: builder.mutation<UpdateBrandResponse, UpdateBrandRequest>({
			query: (body) => ({
				url: endpoints.admin.brands.update(body.id),
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
					adminBrandApi.util.updateQueryData(
						"getAllBrands",
						state.brand.filters,
						(draft) => {
							const index = draft.data.findIndex((brand) => brand.id === id);
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

		removeBrand: builder.mutation<RemoveBrandResponse, RemoveBrandRequest>({
			query: (params) => ({
				url: endpoints.admin.brands.remove(params.id ),
				method: "DELETE",
			}),
			onQueryStarted: async (
				{ id },
				{ dispatch, queryFulfilled, getState },
			) => {
				const state = getState() as RootState;

				const patchResult = dispatch(
					adminBrandApi.util.updateQueryData(
						"getAllBrands",
						state.brand.filters,
						(draft) => {
							const index = draft.data.findIndex((brand) => brand.id === id);
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
	useLazyGetAllBrandsQuery,
	useCreateBrandMutation,
	useUpdateBrandMutation,
	useRemoveBrandMutation,
} = adminBrandApi;