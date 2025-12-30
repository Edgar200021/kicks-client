import type { Dispatch, SetStateAction } from "react";
import { Button } from "@/common/components/ui/button/button.tsx";
import {
	DrawerClose,
	DrawerFooter,
} from "@/common/components/ui/drawer/drawer.tsx";
import { useSetAdminFilters } from "@/features/admin/hooks/use-set-admin-filters.ts";
import type { ProductFiltersTarget } from "@/features/admin/product/store/admin-product-slice.ts";

export const AdminProductFiltersButtons = ({
	setOpen,
	target,
}: {
	setOpen: Dispatch<SetStateAction<boolean>>;
	target: ProductFiltersTarget;
}) => {
	const { lazyFilters, handleApply, handleReset, isEqual } = useSetAdminFilters(
		target === "product" ? "products" : "productsSku",
	);

	return (
		<DrawerFooter>
			<div className="grid grid-cols-2 gap-x-4">
				<Button
					disabled={isEqual}
					onClick={() => {
						handleApply();
						setOpen(false);
					}}
				>
					Apply
				</Button>
				<Button
					disabled={Object.keys(lazyFilters).length === 0}
					onClick={() => {
						handleReset();
						setOpen(false);
					}}
				>
					Reset
				</Button>
			</div>

			<DrawerClose asChild>
				<Button onClick={() => setOpen(false)} variant="outline">
					Close
				</Button>
			</DrawerClose>
		</DrawerFooter>
	);
};
