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

export const AdminProductFiltersDeleted = ({ target }: Props) => {
	const isDeleted = useAppSelector((state) =>
		adminProductSelectors.getLazyFiltersIsDeleted(state, target),
	);
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
								target,
								data: {
									isDeleted: value === "all" ? undefined : value === "true",
								},
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
