import { Label } from "@/common/components/ui/label/label.tsx";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/common/components/ui/select/select.tsx";
import {
	PRODUCT_SKU_MAX_SIZE,
	PRODUCT_SKU_MIN_SIZE,
} from "@/features/admin/product/const/zod.ts";
import {
	adminProductActions,
	adminProductSelectors,
} from "@/features/admin/product/store/admin-product-slice.ts";
import { useAppDispatch, useAppSelector } from "@/store/store.ts";

export const AdminProductSkuFiltersSize = () => {
	const size = useAppSelector(adminProductSelectors.getLazySkuFiltersSize);
	const dispatch = useAppDispatch();

	return (
		<div className="grid gap-2">
			<Label>Size</Label>
			<Select
				value={size === undefined ? "all" : String(size)}
				onValueChange={(value) =>
					dispatch(
						adminProductActions.setFilters({
							type: "lazy",
							filters: {
								target: "sku",
								data: {
									size: value === "all" ? undefined : +value,
								},
							},
						}),
					)
				}
			>
				<SelectTrigger className="cursor-pointer">
					<SelectValue placeholder="Size" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All</SelectItem>
					{Array.from(
						{ length: PRODUCT_SKU_MAX_SIZE - PRODUCT_SKU_MIN_SIZE + 1 },
						(_, i) => {
							const value = PRODUCT_SKU_MIN_SIZE + i;

							return (
								<SelectItem key={value} value={String(value)}>
									{value}
								</SelectItem>
							);
						},
					)}
				</SelectContent>
			</Select>
		</div>
	);
};
