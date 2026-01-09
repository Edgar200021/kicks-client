import {endpoints} from "@/config/endpoints";
import {adminProductActions} from "@/features/admin/product/store/admin-product-slice.ts";
import {api} from "@/lib/api";
import type {RootState} from "@/store/store.ts";
import type {
	CreateProductRequest,
	CreateProductResponse,
	CreateProductSkuRequest,
	CreateProductSkuResponse,
	GetAdminProductFiltersRequest,
	GetAdminProductFiltersResponse,
	GetAdminProductRequest,
	GetAdminProductResponse,
	GetAdminProductSkuRequest,
	GetAdminProductSkuResponse,
	GetAllAdminProductsRequest,
	GetAllAdminProductsResponse,
	GetAllAdminProductsSkuRequest,
	GetAllAdminProductsSkuResponse,
	RemoveProductRequest,
	RemoveProductResponse,
	RemoveProductSkuRequest,
	RemoveProductSkuResponse,
	UpdateProductRequest,
	UpdateProductResponse,
	UpdateProductSkuRequest,
	UpdateProductSkuResponse,
} from "../types/api";
import {buildFormData} from "@/common/utils/form-data.ts";

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
			providesTags: ["adminProducts"],
		}),

		getAllAdminProductsSku: builder.query<
			GetAllAdminProductsSkuResponse,
			GetAllAdminProductsSkuRequest
		>({
			query: (params) => ({
				url: endpoints.admin.products.getAllSku,
				params,
			}),
			providesTags: ["adminProductsSku"],
		}),

		getAdminProduct: builder.query<
			GetAdminProductResponse,
			GetAdminProductRequest
		>({
			query: (params) => ({
				url: endpoints.admin.products.getOne(params.id),
			}),
		}),

		getAdminProductSku: builder.query<
			GetAdminProductSkuResponse,
			GetAdminProductSkuRequest
		>({
			query: (params) => ({
				url: endpoints.admin.products.getOneSku(params.id),
			}),
			providesTags: (_, __, arg) => [
				{type: 'adminProductSku', id: arg.id}
			]
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

		createProduct: builder.mutation<
			CreateProductResponse,
			CreateProductRequest
		>({
			query: (body) => ({
				url: endpoints.admin.products.create,
				method: "POST",
				body,
			}),
			invalidatesTags: ["adminProducts"],
		}),

		createProductSku: builder.mutation<
			CreateProductSkuResponse,
			CreateProductSkuRequest
		>({
			query: (body) => ({
				url: endpoints.admin.products.createSku(body.productId),
				method:
					"POST",
				body: buildFormData(body)
			}),
			invalidatesTags: ["adminProductsSku"],
		}),

		updateProduct: builder.mutation<
			UpdateProductResponse,
			UpdateProductRequest
		>({
			query: ({id, ...body}) => ({
				url: endpoints.admin.products.update(id),
				method: "PATCH",
				body,
			}),
			async onQueryStarted(
				{id, ...rest},
				{dispatch, getState, queryFulfilled},
			) {
				const state = getState() as RootState;

				let shouldInvalidate = false;

				const patchResult = dispatch(
					adminProductApi.util.updateQueryData(
						"getAllAdminProducts",
						state["admin-product"].filters,
						(draft) => {
							const currentProduct = draft.data.products.find(
								(p) => p.id === id,
							);
							const filtersFromServer =
								state["admin-product"].filtersFromServer;

							if (
								!currentProduct ||
								((rest.categoryId || rest.brandId) && !filtersFromServer)
							) {
								shouldInvalidate = true;
								return;
							}

							const category = rest.categoryId
								? filtersFromServer?.categories.find(
									(c) => c.id === rest.categoryId,
								)
								: currentProduct.category;
							const brand = rest.brandId
								? filtersFromServer?.brands.find((b) => b.id === rest.brandId)
								: currentProduct.brand;

							if (!category || !brand) {
								shouldInvalidate = true;
								return;
							}

							draft.data.products[draft.data.products.indexOf(currentProduct)] =
								{
									...currentProduct,
									...rest,
									brand,
									category,
								};
						},
					),
				);

				try {
					await queryFulfilled;
					if (shouldInvalidate) {
						dispatch(adminProductApi.util.invalidateTags(["adminProducts"]));
					}
				} catch (_) {
					patchResult.undo();
				}
			},
		}),

		updateProductSku: builder.mutation<
			UpdateProductSkuResponse,
			UpdateProductSkuRequest
		>({
			query: ({id, ...body}) => ({
				url: endpoints.admin.products.updateSku(id),
				method: "PATCH",
				body: buildFormData(body),
			}),
			invalidatesTags: (_, __, arg) => [
				{type: 'adminProductSku', id: arg.id},
				"adminProductsSku"
			]
		}),

		removeProduct: builder.mutation<
			RemoveProductResponse,
			RemoveProductRequest
		>({
			query: (params) => ({
				url: endpoints.admin.products.remove(params.id),
				method: "DELETE",
			}),
			async onQueryStarted({id}, {dispatch, getState, queryFulfilled}) {
				const patchResult = dispatch(
					adminProductApi.util.updateQueryData(
						"getAllAdminProducts",
						(getState() as RootState)["admin-product"].filters,
						(draft) => {
							const product = draft.data.products.find((p) => p.id === id);
							if (!product) return;

							draft.data.products[draft.data.products.indexOf(product)] = {
								...product,
								isDeleted: !product.isDeleted,
							};
						},
					),
				);

				try {
					await queryFulfilled;
				} catch (e) {
					patchResult.undo();
				}
			},
		}),

		removeProductSku: builder.mutation<
			RemoveProductSkuResponse,
			RemoveProductSkuRequest
		>({
			query: (params) => ({
				url: endpoints.admin.products.removeSku(params.id),
				method: "DELETE",
			}),
			async onQueryStarted({id}, {dispatch, getState, queryFulfilled}) {
				const patchResult = dispatch(
					adminProductApi.util.updateQueryData(
						"getAllAdminProductsSku",
						(getState() as RootState)["admin-product"].skuFilters,
						(draft) => {
							draft.data.productsSku = draft.data.productsSku.filter(p => p.id !== id)
						},
					),
				);

				try {
					await queryFulfilled;
				} catch (e) {
					patchResult.undo();
				}
			},
		}),
	}),
});

export const {
	useLazyGetAllAdminProductsQuery,
	useLazyGetAllAdminProductsSkuQuery,
	useLazyGetAdminProductQuery,
	useLazyGetAdminProductSkuQuery,
	useGetAdminProductFiltersQuery,
	useCreateProductMutation,
	useCreateProductSkuMutation,
	useUpdateProductMutation,
	useUpdateProductSkuMutation,
	useRemoveProductMutation,
	useRemoveProductSkuMutation
} = adminProductApi;