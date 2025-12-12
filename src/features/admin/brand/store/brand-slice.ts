import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GetAllBrandsInput } from "@/features/admin/brand/schemas/get-all-brands.schema.ts";

type State = {
	filters: GetAllBrandsInput;
	lazyFilters: GetAllBrandsInput;
};

const initialState: State = {
	filters: {},
	lazyFilters: {},
};

export const brandSlice = createSlice({
	name: "brand",
	initialState,
	reducers: {
		setFilters: (
			state,
			{
				payload: { type, filters },
			}: PayloadAction<{
				type: "regular" | "lazy";
				filters: GetAllBrandsInput;
			}>,
		) => {
			if (type === "regular") state.filters = { ...state.filters, ...filters };
			if (type === "lazy")
				state.lazyFilters = { ...state.lazyFilters, ...filters };
		},

		clearFilters: (state, { payload }: PayloadAction<"regular" | "lazy">) => {
			if (payload === "regular") state.filters = {};
			if (payload === "lazy") state.lazyFilters = {};
		},
	},
	selectors: {
		getFilters: (state) => state.filters,
		getLazyFilters: (state) => state.lazyFilters,
	},
});

export const { selectors: brandSelectors, actions: brandActions } = brandSlice;
