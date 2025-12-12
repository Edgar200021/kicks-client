import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GetAllAdminProductsInput } from "@/features/admin/product/schemas/get-all-admin-products.schema.ts";
import type { AdminProductFilters } from "@/common/types/api.ts";

type State = {
	filters: GetAllAdminProductsInput;
	lazyFilters: GetAllAdminProductsInput;
	filtersFromServer: AdminProductFilters;
};

const initialState: State = {
	filters: {},
	lazyFilters: {},
	filtersFromServer: {
		tags: [],
		brands: [],
		categories: [],
	},
};

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
				filters: GetAllAdminProductsInput;
			}>,
		) => {
			if (type === "regular") state.filters = { ...state.filters, ...filters };
			if (type === "lazy")
				state.lazyFilters = { ...state.lazyFilters, ...filters };
		},

		setServerFilters: (
			state,
			{ payload }: PayloadAction<AdminProductFilters>,
		) => {
			state.filtersFromServer = payload;
		},

		clearFilters: (state, { payload }: PayloadAction<"regular" | "lazy">) => {
			if (payload === "regular") state.filters = {};
			if (payload === "lazy") state.lazyFilters = {};
		},
	},
	selectors: {
		getFiltersFromServer: (state) => state.filtersFromServer,
		getFilters: (state) => state.filters,
		getFiltersPage: (state) => state.filters.page,

		getLazyFilters: (state) => state.lazyFilters,
		getLazyFiltersSearch: (state) => state.lazyFilters.search,
		getLazyFiltersIsDeleted: (state) => state.lazyFilters.isDeleted,
		getLazyFiltersGender: (state) => state.lazyFilters.gender,
		getLazyFiltersTags: (state) => state.lazyFilters.tags,
		getLazyFiltersCategory: (state) => state.lazyFilters.category,
		getLazyFiltersBrand: (state) => state.lazyFilters.brand,
		getLazyFiltersStartDate: (state) => state.lazyFilters.startDate,
		getLazyFiltersEndDate: (state) => state.lazyFilters.endDate,
	},
});

export const {
	selectors: adminProductSelectors,
	actions: adminProductActions,
} = adminProductSlice;
