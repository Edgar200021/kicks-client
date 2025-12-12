//
import { Input } from "@/common/components/ui/input/input";
import { Label } from "@/common/components/ui/label/label";
import { useAppDispatch, useAppSelector } from "@/common/store/store.ts";
import {
	adminProductActions,
	adminProductSelectors,
} from "@/features/admin/product/store/admin-product-slice.ts";

export const AdminProductFiltersSearch = () => {
	const search = useAppSelector(adminProductSelectors.getLazyFiltersSearch);
	const dispatch = useAppDispatch();

	return (
		<div className="grid gap-2">
			<Label htmlFor="search">Search</Label>
			<Input
				id="search"
				placeholder="Search by title or description"
				value={search ?? ""}
				onChange={(e) =>
					dispatch(
						adminProductActions.setFilters({
							type: "lazy",
							filters: { search: e.target.value },
						}),
					)
				}
			/>
		</div>
	);
};
