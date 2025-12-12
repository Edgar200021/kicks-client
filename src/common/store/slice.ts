import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/common/types/api";
import type { Nullable } from "@/common/types/common";

type GlobalState = {
	user: Nullable<User>;
};

const initialState: GlobalState = { user: null };

export const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		setUser: (state, { payload }: PayloadAction<Nullable<User>>) => {
			state.user = payload;
		},
	},
	selectors: {
		getUser: (state) => state.user,
	},
});

export const { selectors: globalSelectors, actions: globalActions } =
	globalSlice;
