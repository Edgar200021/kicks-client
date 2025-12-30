import { Label } from "@/common/components/ui/label/label.tsx";
import { Slider } from "@/common/components/ui/slider/slider.tsx";
import { PRODUCT_SKU_MAX_PRICE } from "@/features/admin/product/const/zod.ts";
import {
	adminProductActions,
	adminProductSelectors,
} from "@/features/admin/product/store/admin-product-slice.ts";
import { useAppDispatch, useAppSelector } from "@/store/store.ts";

export const AdminProductSkuFiltersSalePrice = () => {
	const { minSalePrice, maxSalePrice } = useAppSelector(
		adminProductSelectors.getLazySkuFiltersSalePrice,
	);
	const dispatch = useAppDispatch();

	return (
		<div className="grid gap-10">
			<Label>Sale Price</Label>
			<Slider
				renderLabel={(num) => `$${num}`}
				value={
					minSalePrice !== undefined && maxSalePrice !== undefined
						? [minSalePrice, maxSalePrice]
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
									minSalePrice: min,
									maxSalePrice: max,
								},
							},
						}),
					);
				}}
			/>
		</div>
	);
};
