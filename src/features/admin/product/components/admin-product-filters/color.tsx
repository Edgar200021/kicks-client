import { Label } from "@/common/components/ui/label/label.tsx";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/common/components/ui/select/select.tsx";
import { COLORS } from "@/common/constants/colors.ts";
import {
	adminProductActions,
	adminProductSelectors,
} from "@/features/admin/product/store/admin-product-slice.ts";
import { useAppDispatch, useAppSelector } from "@/store/store.ts";

export const AdminProductSkuFiltersColor = () => {
	const color = useAppSelector(adminProductSelectors.getLazySkuFiltersColor);
	const dispatch = useAppDispatch();

	return (
		<div className="grid gap-2">
			<Label>Color</Label>
			<Select
				value={color === undefined ? "all" : String(color)}
				onValueChange={(value) =>
					dispatch(
						adminProductActions.setFilters({
							type: "lazy",
							filters: {
								target: "sku",
								data: {
									color: value === "all" ? undefined : value,
								},
							},
						}),
					)
				}
			>
				<SelectTrigger className="cursor-pointer">
					<SelectValue placeholder="Color" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All</SelectItem>
					{Object.values(COLORS).map((c) => (
						<SelectItem
							value={c}
							key={c}
							className="w-10 h-10 cursor-pointer rounded mb-2 "
							style={{
								backgroundColor: c,
							}}
						/>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};
