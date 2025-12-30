import { Label } from "@/common/components/ui/label/label.tsx";
import { Slider } from "@/common/components/ui/slider/slider.tsx";
import { PRODUCT_SKU_MAX_PRICE } from "@/features/admin/product/const/zod.ts";
import {
	adminProductActions,
	adminProductSelectors,
} from "@/features/admin/product/store/admin-product-slice.ts";
import { useAppDispatch, useAppSelector } from "@/store/store.ts";

export const AdminProductSkuFiltersPrice = () => {
	const { minPrice, maxPrice } = useAppSelector(
		adminProductSelectors.getLazySkuFiltersPrice,
	);
	const dispatch = useAppDispatch();

	return (
		<div className="grid gap-10">
			<Label>Price</Label>
			<Slider
				renderLabel={(num) => `$${num}`}
				value={
					minPrice !== undefined && maxPrice !== undefined
						? [minPrice, maxPrice]
						: [0, PRODUCT_SKU_MAX_PRICE]
				}
				min={0}
				max={PRODUCT_SKU_MAX_PRICE}
				onValueChange={([min, max]) => {
					if (min >= max) return;
					dispatch(
						adminProductActions.setFilters({
							type: "lazy",
							filters: {
								target: "sku",
								data: {
									minPrice: min,
									maxPrice: max,
								},
							},
						}),
					);
				}}
			/>
		</div>
	);
};
