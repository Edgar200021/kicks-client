import {
	type RootState,
	useAppDispatch,
	useAppSelector,
} from "@/common/store/store.ts";
import {
	adminProductActions,
	adminProductSelectors,
} from "@/features/admin/product/store/admin-product-slice.ts";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
	categoryActions,
	categorySelectors,
} from "@/features/admin/category/store/category-slice.ts";
import {
	brandActions,
	brandSelectors,
} from "@/features/admin/brand/store/brand-slice.ts";
import {
	userActions,
	userSelectors,
} from "@/features/admin/user/store/user-slice.ts";
import type { GetAllAdminProductsInput } from "@/features/admin/product/schemas/get-all-admin-products.schema.ts";
import type { GetAllBrandsInput } from "@/features/admin/brand/schemas/get-all-brands.schema.ts";
import type { GetAllCategoriesInput } from "@/features/admin/category/schemas/get-all-categories.schema.ts";
import type { GetAllUsersInput } from "@/features/admin/user/schemas/get-all-users.schema.ts";
import { paths } from "@/config/paths.ts";
import type { UnknownAction } from "redux";
import type { AdminPath } from "@/features/admin/types/path.ts";

type AdminFilterType = "products" | "brands" | "categories" | "users";

type FilterMap = {
	products: GetAllAdminProductsInput;
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
			clearFilters: (kind: "regular" | "lazy") => UnknownAction;
		};
		path: AdminPath;
	};
};

const adminFiltersConfig: Config = {
	products: {
		selectors: adminProductSelectors,
		actions: adminProductActions,
		path: paths.admin.products.root,
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