import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GetAllCategoriesInput } from "../schemas/get-all-categories.schema";

type State = {
	filters: GetAllCategoriesInput;
	lazyFilters: GetAllCategoriesInput;
};

const initialState: State = {
	filters: {},
	lazyFilters: {},
};

export const categorySlice = createSlice({
	name: "category",
	initialState,
	reducers: {
		setFilters: (
			state,
			{
				payload: { type, filters },
			}: PayloadAction<{
				type: "regular" | "lazy";
				filters: GetAllCategoriesInput;
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

export const { selectors: categorySelectors, actions: categoryActions } =
	categorySlice;
