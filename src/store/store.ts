import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { env } from "@/config/env.ts";
import { brandSlice } from "@/features/admin/brand/store/brand-slice.ts";
import { categorySlice } from "@/features/admin/category/store/category-slice.ts";
import { adminProductSlice } from "@/features/admin/product/store/admin-product-slice.ts";
import { userSlice } from "@/features/admin/user/store/user-slice.ts";
import { api } from "@/lib/api.ts";
import { globalSlice } from "@/store/slice.ts";

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
