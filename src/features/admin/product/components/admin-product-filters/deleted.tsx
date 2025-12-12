import { Label } from "@/common/components/ui/label/label.tsx";
import { useAppDispatch, useAppSelector } from "@/common/store/store.ts";
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

export const AdminProductFiltersDeleted = () => {
	const isDeleted = useAppSelector(adminProductSelectors.getLazyFiltersSearch);
	const dispatch = useAppDispatch();

	return (
		<div className="grid gap-2">
			<Label>Deleted</Label>
			<Select
				value={isDeleted === undefined ? "all" : String(isDeleted)}
				onValueChange={(value) =>
					dispatch(
						adminProductActions.setFilters({
							type: "lazy",
							filters: {
								isDeleted: value === "all" ? undefined : value === "true",
							},
						}),
					)
				}
			>
				<SelectTrigger className="cursor-pointer">
					<SelectValue placeholder="Deleted" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All</SelectItem>
					<SelectItem value="true">Deleted</SelectItem>
					<SelectItem value="false">Not deleted</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
};
