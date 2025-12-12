import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { api } from "@/common/lib/api";
import { globalSlice } from "@/common/store/slice";
import { env } from "@/config/env";
import { categorySlice } from "@/features/admin/category/store/category-slice";
import { userSlice } from "@/features/admin/user/store/user-slice";
import { brandSlice } from "@/features/admin/brand/store/brand-slice.ts";
import { adminProductSlice } from "@/features/admin/product/store/admin-product-slice.ts";

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		[globalSlice.name]: globalSlice.reducer,
		[userSlice.name]: userSlice.reducer,
		[categorySlice.name]: categorySlice.reducer,
		[brandSlice.name]: brandSlice.reducer,
		[adminProductSlice.name]: adminProductSlice.reducer,
	},
	devTools: env.ENV !== "production",
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<typeof store>();
