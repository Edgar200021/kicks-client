import {  FilterIcon } from "lucide-react";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/common/components/ui/drawer/drawer.tsx";

import { cn } from "@/common/utils/cn.ts";
import type { GetAllAdminProductsInput } from "@/features/admin/product/schemas/get-all-admin-products.schema.ts";
import {
	AdminProductFiltersSearch
} from "@/features/admin/product/components/admin-product-filters/search.tsx";
import {
	AdminProductFiltersDeleted
} from "@/features/admin/product/components/admin-product-filters/deleted.tsx";
import {
	AdminProductFiltersGender
} from "@/features/admin/product/components/admin-product-filters/gender.tsx";
import {
	AdminProductFiltersCategory
} from "@/features/admin/product/components/admin-product-filters/category.tsx";
import {
	AdminProductFiltersBrand
} from "@/features/admin/product/components/admin-product-filters/brand.tsx";
import {
	AdminProductFiltersTags
} from "@/features/admin/product/components/admin-product-filters/tags.tsx";
import {
	AdminProductFiltersDate
} from "@/features/admin/product/components/admin-product-filters/date.tsx";
import {
	AdminProductsFiltersLimit
} from "@/features/admin/product/components/admin-product-filters/limit.tsx";
import {
	AdminProductFiltersButtons
} from "@/features/admin/product/components/admin-product-filters/buttons.tsx";
import {useState} from "react";

interface Props {
	className?: string;
	initialFilters?: GetAllAdminProductsInput;
}

export const AdminProductsFilters = ({ className, initialFilters }: Props) => {
	const [open, setOpen] = useState(false)

	return (
		<div className={cn("flex items-center justify-end", className)}>
			<Drawer direction="right" open={open} onOpenChange={setOpen}>
				<DrawerTrigger className="cursor-pointer" title="Filters">
					<FilterIcon className="text-primary-150" />
				</DrawerTrigger>

				<DrawerContent className="p-6 space-y-6">
					<DrawerHeader>
						<DrawerTitle className="text-xl font-semibold">
							Admin Products Filters
						</DrawerTitle>
					</DrawerHeader>

					<div className="grid gap-6">
						<AdminProductFiltersSearch/>

					<AdminProductFiltersDeleted/>
						<AdminProductFiltersGender/>
						<AdminProductFiltersCategory/>
						<AdminProductFiltersBrand/>
						<AdminProductFiltersTags/>

				<AdminProductFiltersDate/>
						<AdminProductsFiltersLimit/>
					</div>

					<AdminProductFiltersButtons  setOpen={setOpen} initialFilters={initialFilters}/>
				</DrawerContent>
			</Drawer>
		</div>
	);
};