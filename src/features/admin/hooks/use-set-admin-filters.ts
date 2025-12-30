import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo } from "react";
import type { UnknownAction } from "redux";
import { paths } from "@/config/paths.ts";
import type { GetAllBrandsInput } from "@/features/admin/brand/schemas/get-all-brands.schema.ts";
import {
	brandActions,
	brandSelectors,
} from "@/features/admin/brand/store/brand-slice.ts";
import type { GetAllCategoriesInput } from "@/features/admin/category/schemas/get-all-categories.schema.ts";
import {
	categoryActions,
	categorySelectors,
} from "@/features/admin/category/store/category-slice.ts";
import type { GetAllAdminProductsInput } from "@/features/admin/product/schemas/get-all-admin-products.schema.ts";
import type { GetAllAdminProductsSkuInput } from "@/features/admin/product/schemas/get-all-admin-products-sku.schema.ts";
import { adminProductActions } from "@/features/admin/product/store/admin-product-slice.ts";
import type { AdminPath } from "@/features/admin/types/path.ts";
import type { GetAllUsersInput } from "@/features/admin/user/schemas/get-all-users.schema.ts";
import {
	userActions,
	userSelectors,
} from "@/features/admin/user/store/user-slice.ts";
import {
	type RootState,
	useAppDispatch,
	useAppSelector,
} from "@/store/store.ts";

type AdminFilterType =
	| "products"
	| "productsSku"
	| "brands"
	| "categories"
	| "users";

type FilterMap = {
	products: GetAllAdminProductsInput;
	productsSku: GetAllAdminProductsSkuInput;
	brands: GetAllBrandsInput;
	categories: GetAllCategoriesInput;
	users: GetAllUsersInput;
};

type Config = {
	[K in AdminFilterType]: {
		selectors: {
			getFilters: (s: RootState) => FilterMap[K];
			getLazyFilters: (s: RootState) => FilterMap[K];
		};
		actions: {
			setFilters: (payload: {
				type: "regular" | "lazy";
				filters: FilterMap[K];
			}) => UnknownAction;
			clearFilters: (type: "regular" | "lazy") => UnknownAction;
		};
		path: AdminPath;
	};
};

const adminFiltersConfig: Config = {
	products: {
		selectors: {
			getFilters: (state) => state["admin-product"].filters,
			getLazyFilters: (state) => state["admin-product"].lazyFilters,
		},
		actions: {
			setFilters: ({ type, filters }) =>
				adminProductActions.setFilters({
					type: type,
					filters: {
						target: "product",
						data: filters,
					},
				}) as UnknownAction,
			clearFilters: (type) =>
				adminProductActions.clearFilters({ type, target: "product" }),
		},
		path: paths.admin.products.root,
	},
	productsSku: {
		selectors: {
			getFilters: (state) => state["admin-product"].skuFilters,
			getLazyFilters: (state) => state["admin-product"].lazySkuFilters,
		},
		actions: {
			setFilters: ({ type, filters }) =>
				adminProductActions.setFilters({
					type: type,
					filters: {
						target: "sku",
						data: filters,
					},
				}) as UnknownAction,
			clearFilters: (type) =>
				adminProductActions.clearFilters({ type, target: "sku" }),
		},
		path: paths.admin.products.sku,
	},
	brands: {
		selectors: brandSelectors,
		actions: brandActions,
		path: paths.admin.brands,
	},
	categories: {
		selectors: categorySelectors,
		actions: categoryActions,
		path: paths.admin.categories,
	},
	users: {
		selectors: userSelectors,
		actions: userActions,
		path: paths.admin.users,
	},
};

export const useSetAdminFilters = <T extends AdminFilterType>(
	type: T,
	initialFilters?: FilterMap[T],
) => {
	const { selectors, actions, path } = useMemo(
		() => adminFiltersConfig[type],
		[type],
	);

	const filters: FilterMap[T] = useAppSelector(selectors.getFilters);
	const lazyFilters: FilterMap[T] = useAppSelector(selectors.getLazyFilters);

	const navigate = useNavigate({
		from: path,
	});
	const dispatch = useAppDispatch();

	const isEqual = JSON.stringify(filters) === JSON.stringify(lazyFilters);

	useEffect(() => {
		if (!initialFilters) return;
		dispatch(
			actions.setFilters({
				type: "regular",
				filters: initialFilters,
			}),
		);

		dispatch(
			actions.setFilters({
				type: "lazy",
				filters: initialFilters,
			}),
		);
	}, []);

	const handleApply = () => {
		if (isEqual) return;

		dispatch(
			actions.setFilters({
				type: "regular",
				filters: lazyFilters,
			}),
		);

		navigate({
			to: path,
			search: (prev) => ({ ...prev, ...lazyFilters }),
		});
	};

	const handleReset = useCallback(() => {
		dispatch(actions.clearFilters("lazy"));
		dispatch(actions.clearFilters("regular"));

		navigate({
			to: path,
			search: undefined,
		});
	}, []);

	const setFilters = useCallback(
		(next: FilterMap[T]) => {
			dispatch(actions.setFilters({ type: "lazy", filters: next }));
		},
		[actions, dispatch],
	);

	return {
		handleApply,
		handleReset,
		setFilters,
		lazyFilters,
		isEqual,
	};
};
