import { Label } from "@/common/components/ui/label/label.tsx";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/common/components/ui/select/select.tsx";
import { ProductGender } from "@/common/types/api.ts";
import {
	adminProductActions,
	adminProductSelectors,
	type ProductFiltersTarget,
} from "@/features/admin/product/store/admin-product-slice.ts";
import { useAppDispatch, useAppSelector } from "@/store/store.ts";

interface Props {
	target: ProductFiltersTarget;
}

export const AdminProductFiltersGender = ({ target }: Props) => {
	const gender = useAppSelector((state) =>
		adminProductSelectors.getLazyFiltersGender(state, target),
	);
	const dispatch = useAppDispatch();

	return (
		<div className="grid gap-2">
			<Label>Gender</Label>
			<Select
				value={gender === undefined ? "all" : String(gender)}
				onValueChange={(value) =>
					dispatch(
						adminProductActions.setFilters({
							type: "lazy",
							filters: {
								target,
								data: {
									gender:
										value === "all" ? undefined : (value as ProductGender),
								},
							},
						}),
					)
				}
			>
				<SelectTrigger className="cursor-pointer">
					<SelectValue placeholder="Gender" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All</SelectItem>
					{Object.values(ProductGender).map((g) => {
						return (
							<SelectItem key={g} value={g}>
								{g.slice(0, 1).toUpperCase()}
								{g.slice(1)}
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
		</div>
	);
};
