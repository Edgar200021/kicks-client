import {Label} from "@/common/components/ui/label/label.tsx";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/common/components/ui/select/select.tsx";
import {useAppDispatch, useAppSelector} from "@/store/store.ts";
import {
	adminProductActions,
	adminProductSelectors,
} from "@/features/admin/product/store/admin-product-slice.ts";

export const AdminProductFiltersBrand = () => {
	const serverFilters = useAppSelector(
		adminProductSelectors.getFiltersFromServer,
	);
	const brandId = useAppSelector(adminProductSelectors.getLazyFiltersBrandId);

	const dispatch = useAppDispatch();

	if (!serverFilters?.availableBrands.length) return null;

	return (
		<div className="grid gap-2">
			<Label>Brand</Label>
			<Select
				value={brandId === undefined ? "all" : String(brandId)}
				onValueChange={(value) =>
					dispatch(
						adminProductActions.setFilters({
							type: "lazy",
							filters: {
								brandId: value === "all" ? undefined : value,
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
					{serverFilters.availableBrands.map((b) => {
						return (
							<SelectItem
								key={b.id}
								value={b.id}
							>
								{b.name}
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
		</div>
	);
};