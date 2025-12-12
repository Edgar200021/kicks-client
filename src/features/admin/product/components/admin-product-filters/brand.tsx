import { Label } from "@/common/components/ui/label/label.tsx";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/common/components/ui/select/select.tsx";
import { useAppDispatch, useAppSelector } from "@/common/store/store.ts";
import {
	adminProductActions,
	adminProductSelectors,
} from "@/features/admin/product/store/admin-product-slice.ts";

export const AdminProductFiltersBrand = () => {
	const serverFilters = useAppSelector(
		adminProductSelectors.getFiltersFromServer,
	);
	const brand = useAppSelector(adminProductSelectors.getLazyFiltersBrand);

	const dispatch = useAppDispatch();

	if (!!serverFilters.brands.length) return null;

	return (
		<div className="grid gap-2">
			<Label>Brand</Label>
			<Select
				value={brand === undefined ? "all" : String(brand)}
				onValueChange={(value) =>
					dispatch(
						adminProductActions.setFilters({
							type: "lazy",
							filters: {
								brand: value === "all" ? undefined : value,
							},
						}),
					)
				}
			>
				<SelectTrigger className="cursor-pointer">
					<SelectValue placeholder="Category" />
				</SelectTrigger>
				<SelectContent side="bottom">
					<SelectItem value="all">All</SelectItem>
					{serverFilters.brands.map((g) => {
						return (
							<SelectItem key={g} value={g}>
								{g}
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
		</div>
	);
};