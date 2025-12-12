import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GetAllUsersInput } from "@/features/admin/user/schemas/get-all-users.schema";

type State = {
	filters: GetAllUsersInput;
	lazyFilters: GetAllUsersInput;
};

const initialState: State = {
	filters: {},
	lazyFilters: {},
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setFilters: (
			state,
			{
				payload: { type, filters },
			}: PayloadAction<{ type: "regular" | "lazy"; filters: GetAllUsersInput }>,
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
		getFiltersPage: (state) => state.filters.page,
		getLazyFilters: (state) => state.lazyFilters,
	},
});

export const { selectors: userSelectors, actions: userActions } = userSlice;
