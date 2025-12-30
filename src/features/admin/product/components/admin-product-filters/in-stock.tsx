import { Label } from "@/common/components/ui/label/label.tsx";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/common/components/ui/select/select.tsx";
import {
	adminProductActions,
	adminProductSelectors,
} from "@/features/admin/product/store/admin-product-slice.ts";
import { useAppDispatch, useAppSelector } from "@/store/store.ts";

export const AdminProductSkuFiltersInStock = () => {
	const inStock = useAppSelector(
		adminProductSelectors.getLazySkuFiltersInStock,
	);
	const dispatch = useAppDispatch();

	return (
		<div className="grid gap-2">
			<Label>In Stock</Label>
			<Select
				value={inStock === undefined ? "all" : String(inStock)}
				onValueChange={(value) =>
					dispatch(
						adminProductActions.setFilters({
							type: "lazy",
							filters: {
								target: "sku",
								data: {
									inStock: value === "all" ? undefined : value === "true",
								},
							},
						}),
					)
				}
			>
				<SelectTrigger className="cursor-pointer">
					<SelectValue placeholder="In Stock" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All</SelectItem>
					<SelectItem value="true">In stock</SelectItem>
					<SelectItem value="false">Not in stock</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
};
