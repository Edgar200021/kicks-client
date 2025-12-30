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

export const AdminProductFiltersCategory = ({ target }: Props) => {
	const serverFilters = useAppSelector(
		adminProductSelectors.getFiltersFromServer,
	);
	const categoryId = useAppSelector((state) =>
		adminProductSelectors.getLazyFiltersCategoryId(state, target),
	);

	const dispatch = useAppDispatch();

	if (!serverFilters?.availableCategories.length) return null;

	return (
		<div className="grid gap-2">
			<Label>Category</Label>
			<Select
				value={categoryId === undefined ? "all" : String(categoryId)}
				onValueChange={(value) =>
					dispatch(
						adminProductActions.setFilters({
							type: "lazy",
							filters: {
								target,
								data: {
									categoryId: value === "all" ? undefined : value,
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
					{serverFilters.availableCategories.map((c) => {
						return (
							<SelectItem key={c.id} value={c.id}>
								{c.name}
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
		</div>
	);
};
