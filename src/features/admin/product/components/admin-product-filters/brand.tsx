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
	type ProductFiltersTarget,
} from "@/features/admin/product/store/admin-product-slice.ts";
import { useAppDispatch, useAppSelector } from "@/store/store.ts";

interface Props {
	target: ProductFiltersTarget;
}

export const AdminProductFiltersBrand = ({ target }: Props) => {
	const serverFilters = useAppSelector(
		adminProductSelectors.getFiltersFromServer,
	);
	const brandId = useAppSelector((state) =>
		adminProductSelectors.getLazyFiltersBrandId(state, target),
	);

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
								target,
								data: {
									brandId: value === "all" ? undefined : value,
								},
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
							<SelectItem key={b.id} value={b.id}>
								{b.name}
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
		</div>
	);
};
