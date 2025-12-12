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

export const AdminProductFiltersCategory = () => {
	const serverFilters = useAppSelector(
		adminProductSelectors.getFiltersFromServer,
	);
	const category = useAppSelector(adminProductSelectors.getLazyFiltersCategory);

	const dispatch = useAppDispatch();

	if (!!serverFilters.categories.length) return null;

	return (
		<div className="grid gap-2">
			<Label>Category</Label>
			<Select
				value={category === undefined ? "all" : String(category)}
				onValueChange={(value) =>
					dispatch(
						adminProductActions.setFilters({
							type: "lazy",
							filters: {
								category: value === "all" ? undefined : value,
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
					{serverFilters.categories.map((g) => {
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
