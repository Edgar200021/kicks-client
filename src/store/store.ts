import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { env } from "@/config/env";
import { globalSlice } from "@/store/slice";

export const store = configureStore({
	reducer: {
		[globalSlice.name]: globalSlice.reducer,
	},
	devTools: env.ENV !== "production",
	// middleware: (getDefaultMiddleware) =>
	// 	getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<typeof store>();
