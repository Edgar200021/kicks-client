import { api } from "@/common/lib/api";
import { endpoints } from "@/config/endpoints";
import type {
	GetAdminProductFiltersRequest,
	GetAdminProductFiltersResponse,
	GetAllAdminProductsRequest,
	GetAllAdminProductsResponse,
} from "../types/api";
import { adminProductActions } from "@/features/admin/product/store/admin-product-slice.ts";

export const adminProductApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getAllAdminProducts: builder.query<
			GetAllAdminProductsResponse,
			GetAllAdminProductsRequest
		>({
			query: (params) => ({
				url: endpoints.admin.products.getAll,
				params,
			}),
		}),

		getAdminProductFilters: builder.query<
			GetAdminProductFiltersResponse,
			GetAdminProductFiltersRequest
		>({
			query: () => ({
				url: endpoints.admin.products.getFilters,
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				const { data } = await queryFulfilled;
				dispatch(adminProductActions.setServerFilters(data.data));
			},
		}),

		// createBrand: builder.mutation<CreateBrandResponse, CreateBrandRequest>({
		// 	query: (body) => ({
		// 		url: endpoints.admin.brands.create,
		// 		method: "POST",
		// 		body,
		// 	}),
		// 	onQueryStarted: async (_, { dispatch, queryFulfilled, getState }) => {
		// 		const state = getState() as RootState;
		//
		// 		const { data } = await queryFulfilled;
		//
		// 		dispatch(
		// 			adminProductApi.util.updateQueryData(
		// 				"getAllBrands",
		// 				state.brand.filters,
		// 				(draft) => {
		// 					draft.data.unshift(data.data);
		// 				},
		// 			),
		// 		);
		// 	},
		// }),
		//
		// updateBrand: builder.mutation<UpdateBrandResponse, UpdateBrandRequest>({
		// 	query: (body) => ({
		// 		url: endpoints.admin.brands.update(body.id as UUID),
		// 		method: "PATCH",
		// 		body: {
		// 			name: body.name,
		// 		},
		// 	}),
		// 	onQueryStarted: async (
		// 		{ id, name },
		// 		{ dispatch, queryFulfilled, getState },
		// 	) => {
		// 		const state = getState() as RootState;
		//
		// 		const patchResult = dispatch(
		// 			adminProductApi.util.updateQueryData(
		// 				"getAllBrands",
		// 				state.brand.filters,
		// 				(draft) => {
		// 					const index = draft.data.findIndex((brand) => brand.id === id);
		// 					if (index === -1) return;
		//
		// 					draft.data[index] = { ...draft.data[index], name };
		// 				},
		// 			),
		// 		);
		//
		// 		try {
		// 			await queryFulfilled;
		// 		} catch (_) {
		// 			patchResult.undo();
		// 		}
		// 	},
		// }),
		//
		// removeBrand: builder.mutation<RemoveBrandResponse, RemoveBrandRequest>({
		// 	query: (params) => ({
		// 		url: endpoints.admin.brands.remove(params.id as UUID),
		// 		method: "DELETE",
		// 	}),
		// 	onQueryStarted: async (
		// 		{ id },
		// 		{ dispatch, queryFulfilled, getState },
		// 	) => {
		// 		const state = getState() as RootState;
		//
		// 		const patchResult = dispatch(
		// 			adminProductApi.util.updateQueryData(
		// 				"getAllBrands",
		// 				state.brand.filters,
		// 				(draft) => {
		// 					const index = draft.data.findIndex((brand) => brand.id === id);
		// 					if (index === -1) return;
		//
		// 					draft.data.splice(index, 1);
		// 				},
		// 			),
		// 		);
		//
		// 		try {
		// 			await queryFulfilled;
		// 		} catch (_) {
		// 			patchResult.undo();
		// 		}
		// 	},
		// }),
	}),
});

export const {
	useLazyGetAllAdminProductsQuery,
	useGetAdminProductFiltersQuery,
} = adminProductApi;
