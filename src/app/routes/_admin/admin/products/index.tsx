import {createFileRoute} from "@tanstack/react-router";
import {paths} from "@/config/paths.ts";
import {Breadcrumb} from "@/common/components/ui/breadcrumb";

import {AdminProductsWrapper} from "@/features/admin/product/components/admin-products-wrapper.tsx";
import {
	AdminProductsFilters
} from "@/features/admin/product/components/admin-product-filters/admin-products-filters.tsx";
import {
	getAllAdminProductsInputSchema
} from "@/features/admin/product/schemas/get-all-admin-products.schema.ts";
import {
	CreateUpdateProductForm
} from "@/features/admin/product/components/create-update-product-form.tsx";
import {Button} from "@/common/components/ui/button/button.tsx";

export const Route = createFileRoute(`/_admin${paths.admin.products.root}/`)({
	component: RouteComponent,
	validateSearch: getAllAdminProductsInputSchema,
});

function RouteComponent() {
	const search = Route.useSearch();

	return (
		<>
			<div className="flex flex-col gap-y-1 font-semibold mb-10">
				<h1 className="font-semibold text-2xl md:text-3xl">Products List</h1>
				<Breadcrumb items={["Home", "Products List"]} />
			</div>
			<div className="flex items-center justify-between gap-x-10 mb-10">
				<CreateUpdateProductForm
					type={{action: "create"}}
					renderTrigger={(setOpen) => <Button onClick={() => setOpen((prev) => !prev)}>
						Create product
					</Button>}
				/>
				<AdminProductsFilters initialFilters={search} />
			</div>
			<AdminProductsWrapper className="pb-10" />
		</>
	);
}