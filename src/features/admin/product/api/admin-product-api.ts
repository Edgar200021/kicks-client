import {api} from "@/lib/api";
import {endpoints} from "@/config/endpoints";
import type {
	CreateProductRequest,
	CreateProductResponse,
	GetAdminProductFiltersRequest,
	GetAdminProductFiltersResponse,
	GetAllAdminProductsRequest,
	GetAllAdminProductsResponse,
	RemoveProductRequest,
	RemoveProductResponse,
	UpdateProductRequest,
	UpdateProductResponse,
} from "../types/api";
import {adminProductActions} from "@/features/admin/product/store/admin-product-slice.ts";
import type {RootState} from "@/store/store.ts";

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
			providesTags: ["adminProducts"]
		}),

		getAdminProductFilters: builder.query<
			GetAdminProductFiltersResponse,
			GetAdminProductFiltersRequest
		>({
			query: () => ({
				url: endpoints.admin.products.getFilters,
			}),
			async onQueryStarted(_, {dispatch, queryFulfilled}) {
				const {data} = await queryFulfilled;
				dispatch(adminProductActions.setServerFilters(data.data));
			},
		}),


		createProduct: builder.mutation<CreateProductResponse, CreateProductRequest>({
			query: body => ({
				url: endpoints.admin.products.create,
				method: "POST",
				body
			}),
			invalidatesTags: ["adminProducts"]
		}),


		updateProduct: builder.mutation<UpdateProductResponse, UpdateProductRequest>({
			query: ({id, ...body}) => ({
				url: endpoints.admin.products.update(id),
				method: "PATCH",
				body
			}),
			async onQueryStarted({id, ...rest}, {dispatch, getState, queryFulfilled}) {
				const state = getState() as RootState

				let shouldInvalidate = false

				const patchResult = dispatch(adminProductApi.util.updateQueryData("getAllAdminProducts", state['admin-product'].filters, (draft) => {
					const currentProduct = draft.data.products.find(p => p.id === id);
					const filtersFromServer = state["admin-product"].filtersFromServer

					if (!currentProduct || ((rest.categoryId || rest.brandId) && !filtersFromServer)) {
						shouldInvalidate = true
						return
					}

					const category = rest.categoryId ? filtersFromServer?.categories.find(c => c.id === rest.categoryId) : currentProduct.category
					const brand = rest.brandId ? filtersFromServer?.brands.find(b => b.id === rest.brandId) : currentProduct.brand

					if (!category || !brand) {
						shouldInvalidate = true
						return
					}

					draft.data.products[draft.data.products.indexOf(currentProduct)] = {
						...currentProduct,
						...rest,
						brand,
						category
					}
				}))

				try {
					await queryFulfilled
					if (shouldInvalidate) {
						dispatch(adminProductApi.util.invalidateTags(["adminProducts"]))
					}
				} catch (_) {
					patchResult.undo()
				}
			}
		}),

		removeProduct: builder.mutation<RemoveProductResponse, RemoveProductRequest>({
			query: (params) => ({
				url: endpoints.admin.products.remove(params.id),
				method: "DELETE",
			}),
			invalidatesTags: ["adminProducts"]
		}),
	}),
});

export const {
	useLazyGetAllAdminProductsQuery,
	useGetAdminProductFiltersQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useRemoveProductMutation
} = adminProductApi;