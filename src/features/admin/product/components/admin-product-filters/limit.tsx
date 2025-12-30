import { Label } from "@/common/components/ui/label/label.tsx";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/common/components/ui/select/select.tsx";
import { GET_ALL_ADMIN_PRODUCTS_MAX_LIMIT } from "@/features/admin/product/const/zod.ts";
import {
	adminProductActions,
	adminProductSelectors,
	type ProductFiltersTarget,
} from "@/features/admin/product/store/admin-product-slice.ts";
import { useAppDispatch, useAppSelector } from "@/store/store.ts";

interface Props {
	target: ProductFiltersTarget;
}

export const AdminProductsFiltersLimit = ({ target }: Props) => {
	const limit = useAppSelector((state) =>
		adminProductSelectors.getLazyFiltersLimit(state, target),
	);
	const dispatch = useAppDispatch();

	return (
		<div className="grid gap-2">
			<Label>Rows per page</Label>
			<Select
				value={limit?.toString()}
				onValueChange={(value) =>
					dispatch(
						adminProductActions.setFilters({
							type: "lazy",
							filters: {
								target,
								data: {
									limit: Number(value),
								},
							},
						}),
					)
				}
			>
				<SelectTrigger className="cursor-pointer">
					<SelectValue placeholder="Rows per page" />
				</SelectTrigger>
				<SelectContent>
					{Array.from(
						{
							length: Math.floor(GET_ALL_ADMIN_PRODUCTS_MAX_LIMIT / 25),
						},
						(_, i) => (i + 1) * 25,
					).map((v) => (
						<SelectItem key={v} value={String(v)}>
							{v}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};
