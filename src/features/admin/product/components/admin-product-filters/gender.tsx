import { Label } from "@/common/components/ui/label/label.tsx";
import {
	adminProductActions,
	adminProductSelectors,
} from "@/features/admin/product/store/admin-product-slice.ts";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/common/components/ui/select/select.tsx";
import { useAppDispatch, useAppSelector } from "@/store/store.ts";
import { ProductGender } from "@/common/types/api.ts";

export const AdminProductFiltersGender = () => {
	const gender = useAppSelector(adminProductSelectors.getLazyFiltersSearch);
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
								gender: value === "all" ? undefined : (value as ProductGender),
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