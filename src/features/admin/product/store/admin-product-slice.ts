import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
	AdminProduct,
	AdminProductFilters,
	AdminProductSku,
} from "@/common/types/api.ts";
import type { GetAllAdminProductsInput } from "@/features/admin/product/schemas/get-all-admin-products.schema.ts";
import type { GetAllAdminProductsSkuInput } from "@/features/admin/product/schemas/get-all-admin-products-sku.schema.ts";

type State = {
	filters: GetAllAdminProductsInput;
	lazyFilters: GetAllAdminProductsInput;
	skuFilters: GetAllAdminProductsSkuInput;
	lazySkuFilters: GetAllAdminProductsSkuInput;
	filtersFromServer?: AdminProductFilters;
	selectedProduct?: AdminProduct;
	selectedProductSku?: AdminProductSku;
};

const initialState: State = {
	filters: {},
	lazyFilters: {},
	skuFilters: {},
	lazySkuFilters: {},
};

export type ProductFiltersTarget = "sku" | "product";

export const adminProductSlice = createSlice({
	name: "admin-product",
	initialState,
	reducers: {
		setFilters: (
			state,
			{
				payload: { type, filters },
			}: PayloadAction<{
				type: "regular" | "lazy";
				filters:
					| {
							target: Extract<ProductFiltersTarget, "product">;
							data: GetAllAdminProductsInput;
					  }
					| {
							target: Extract<ProductFiltersTarget, "sku">;
							data: GetAllAdminProductsSkuInput;
					  };
			}>,
		) => {
			const key = filters.target === "product" ? "filters" : "skuFilters";
			const lazyKey =
				filters.target === "product" ? "lazyFilters" : "lazySkuFilters";

			if (type === "regular") {
				state[key] = { ...state[key], ...filters.data };
			}

			if (type === "lazy")
				state[lazyKey] = { ...state[lazyKey], ...filters.data };
		},

		setServerFilters: (
			state,
			{ payload }: PayloadAction<AdminProductFilters>,
		) => {
			state.filtersFromServer = payload;
		},

		setSelectedProduct: (
			state,
			{
				payload: { target, data },
			}: PayloadAction<
				| {
						target: Extract<ProductFiltersTarget, "product">;
						data: AdminProduct;
				  }
				| {
						target: Extract<ProductFiltersTarget, "sku">;
						data: AdminProductSku;
				  }
			>,
		) => {
			if (target === "product") {
				state.selectedProduct = data;
				return;
			}

			state.selectedProductSku = data;
		},

		clearFilters: (
			state,
			{
				payload: { type, target },
			}: PayloadAction<{
				type: "regular" | "lazy";
				target: ProductFiltersTarget;
			}>,
		) => {
			if (type === "regular")
				target === "product" ? (state.filters = {}) : (state.skuFilters = {});
			if (type === "lazy")
				target === "product"
					? (state.lazyFilters = {})
					: (state.lazySkuFilters = {});
		},
	},
	selectors: {
		getSelectedProduct: (state) => state.selectedProduct,

		getFiltersFromServer: (state) => state.filtersFromServer,
		getFilters: (state, target: ProductFiltersTarget) =>
			target === "product" ? state.filters : state.skuFilters,
		getFiltersPage: (state, target: ProductFiltersTarget) =>
			target === "product" ? state.filters.page : state.skuFilters.page,

		getLazyFilters: (state, target: ProductFiltersTarget) =>
			target === "product" ? state.lazyFilters : state.lazySkuFilters,
		getLazyFiltersLimit: (state, target: ProductFiltersTarget) =>
			target === "product"
				? state.lazyFilters.limit
				: state.lazySkuFilters.limit,
		getLazyFiltersSearch: (state, target: ProductFiltersTarget) =>
			target === "product"
				? state.lazyFilters.search
				: state.lazySkuFilters.search,

		getLazyFiltersIsDeleted: (state, target: ProductFiltersTarget) =>
			target === "product"
				? state.lazyFilters.isDeleted
				: state.lazySkuFilters.isDeleted,

		getLazyFiltersGender: (state, target: ProductFiltersTarget) =>
			target === "product"
				? state.lazyFilters.gender
				: state.lazySkuFilters.gender,

		getLazyFiltersTags: (state, target: ProductFiltersTarget) =>
			target === "product" ? state.lazyFilters.tags : state.lazySkuFilters.tags,

		getLazyFiltersCategoryId: (state, target: ProductFiltersTarget) =>
			target === "product"
				? state.lazyFilters.categoryId
				: state.lazySkuFilters.categoryId,

		getLazyFiltersBrandId: (state, target: ProductFiltersTarget) =>
			target === "product"
				? state.lazyFilters.brandId
				: state.lazySkuFilters.brandId,

		getLazyFiltersStartDate: (state, target: ProductFiltersTarget) =>
			target === "product"
				? state.lazyFilters.startDate
				: state.lazySkuFilters.startDate,

		getLazyFiltersEndDate: (state, target: ProductFiltersTarget) =>
			target === "product"
				? state.lazyFilters.endDate
				: state.lazySkuFilters.endDate,

		getLazySkuFiltersInStock: (state) => state.lazySkuFilters.inStock,
		getLazySkuFiltersSize: (state) => state.lazySkuFilters.size,
		getLazySkuFiltersColor: (state) => state.lazySkuFilters.color,
		getLazySkuFiltersPrice: (state) => ({
			minPrice: state.lazySkuFilters.minPrice,
			maxPrice: state.lazySkuFilters.maxPrice,
		}),
		getLazySkuFiltersSalePrice: (state) => ({
			minSalePrice: state.lazySkuFilters.minSalePrice,
			maxSalePrice: state.lazySkuFilters.maxSalePrice,
		}),
	},
});

export const {
	selectors: adminProductSelectors,
	actions: adminProductActions,
} = adminProductSlice;
