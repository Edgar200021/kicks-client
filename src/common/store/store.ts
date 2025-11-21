import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { api } from "@/common/lib/api";
import { globalSlice } from "@/common/store/slice";
import { env } from "@/config/env";

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		[globalSlice.name]: globalSlice.reducer,
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
