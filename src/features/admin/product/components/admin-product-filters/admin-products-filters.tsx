import { FilterIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/common/components/ui/drawer/drawer.tsx";
import { cn } from "@/common/utils/cn.ts";
import { AdminProductFiltersBrand } from "@/features/admin/product/components/admin-product-filters/brand.tsx";
import { AdminProductFiltersButtons } from "@/features/admin/product/components/admin-product-filters/buttons.tsx";
import { AdminProductFiltersCategory } from "@/features/admin/product/components/admin-product-filters/category.tsx";
import { AdminProductSkuFiltersColor } from "@/features/admin/product/components/admin-product-filters/color.tsx";
import { AdminProductFiltersDate } from "@/features/admin/product/components/admin-product-filters/date.tsx";
import { AdminProductFiltersDeleted } from "@/features/admin/product/components/admin-product-filters/deleted.tsx";
import { AdminProductFiltersGender } from "@/features/admin/product/components/admin-product-filters/gender.tsx";
import { AdminProductSkuFiltersInStock } from "@/features/admin/product/components/admin-product-filters/in-stock.tsx";
import { AdminProductsFiltersLimit } from "@/features/admin/product/components/admin-product-filters/limit.tsx";
import { AdminProductSkuFiltersPrice } from "@/features/admin/product/components/admin-product-filters/price.tsx";
import { AdminProductSkuFiltersSalePrice } from "@/features/admin/product/components/admin-product-filters/sale-price.tsx";
import { AdminProductFiltersSearch } from "@/features/admin/product/components/admin-product-filters/search.tsx";
import { AdminProductSkuFiltersSize } from "@/features/admin/product/components/admin-product-filters/size.tsx";
import { AdminProductFiltersTags } from "@/features/admin/product/components/admin-product-filters/tags.tsx";
import type { GetAllAdminProductsInput } from "@/features/admin/product/schemas/get-all-admin-products.schema.ts";
import type { GetAllAdminProductsSkuInput } from "@/features/admin/product/schemas/get-all-admin-products-sku.schema.ts";
import {
	adminProductActions,
	type ProductFiltersTarget,
} from "@/features/admin/product/store/admin-product-slice.ts";
import { useAppDispatch } from "@/store/store.ts";

type InitialFiltersByTarget<T extends ProductFiltersTarget> = T extends Extract<
	ProductFiltersTarget,
	"product"
>
	? GetAllAdminProductsInput
	: GetAllAdminProductsSkuInput;

interface Props<T extends ProductFiltersTarget> {
	className?: string;
	target: T;
	initialFilters?: InitialFiltersByTarget<T>;
}

export const AdminProductsFilters = <T extends ProductFiltersTarget>({
	className,
	target,
	initialFilters,
}: Props<T>) => {
	const [open, setOpen] = useState(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!initialFilters) return;

		dispatch(
			adminProductActions.setFilters({
				type: "regular",
				filters: {
					target,
					data: initialFilters,
				},
			}),
		);
		dispatch(
			adminProductActions.setFilters({
				type: "lazy",
				filters: {
					target,
					data: initialFilters,
				},
			}),
		);
	}, []);

	return (
		<div className={cn("flex items-center justify-end", className)}>
			<Drawer
				dismissible={target === "product"}
				direction="right"
				open={open}
				onOpenChange={setOpen}
			>
				<DrawerTrigger className="cursor-pointer" title="Filters">
					<FilterIcon className="text-primary-150" />
				</DrawerTrigger>

				<DrawerContent className="p-6 space-y-6">
					<DrawerHeader>
						<DrawerTitle className="text-xl font-semibold">
							Admin Product {target === "sku" ? "Variants" : ""} Filters
						</DrawerTitle>
					</DrawerHeader>

					<div className="grid gap-6">
						<AdminProductFiltersSearch target={target} />
						<AdminProductFiltersDeleted target={target} />
						<AdminProductFiltersGender target={target} />
						<AdminProductFiltersCategory target={target} />
						<AdminProductFiltersBrand target={target} />
						<AdminProductFiltersTags target={target} />
						{target === "sku" && (
							<>
								<AdminProductSkuFiltersInStock />
								<AdminProductSkuFiltersColor />
								<AdminProductSkuFiltersSize />
								<AdminProductSkuFiltersPrice />
								<AdminProductSkuFiltersSalePrice />
							</>
						)}
						<AdminProductFiltersDate target={target} />
						<AdminProductsFiltersLimit target={target} />
					</div>

					<AdminProductFiltersButtons target={target} setOpen={setOpen} />
				</DrawerContent>
			</Drawer>
		</div>
	);
};
