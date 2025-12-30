//
import { Input } from "@/common/components/ui/input/input";
import { Label } from "@/common/components/ui/label/label";
import {
	adminProductActions,
	adminProductSelectors,
	type ProductFiltersTarget,
} from "@/features/admin/product/store/admin-product-slice.ts";
import { useAppDispatch, useAppSelector } from "@/store/store.ts";

interface Props {
	target: ProductFiltersTarget;
}

export const AdminProductFiltersSearch = ({ target }: Props) => {
	const search = useAppSelector((state) =>
		adminProductSelectors.getLazyFiltersSearch(state, target),
	);
	const dispatch = useAppDispatch();

	return (
		<div className="grid gap-2">
			<Label htmlFor="search">Search</Label>
			<Input
				id="search"
				placeholder={`Search by ${target === "product" ? "" : "sku, "}title or description`}
				value={search ?? ""}
				onChange={(e) =>
					dispatch(
						adminProductActions.setFilters({
							type: "lazy",
							filters: {
								target,
								data: {
									search: e.target.value,
								},
							},
						}),
					)
				}
			/>
		</div>
	);
};
