import {createFileRoute} from "@tanstack/react-router";
import {Breadcrumb} from "@/common/components/ui/breadcrumb";
import {paths} from "@/config/paths.ts";
import {
	AdminProductsSkuList
} from "@/features/admin/product/components/admin-products-sku-list.tsx";
import {
	getAllAdminProductsSkuInputSchema
} from "@/features/admin/product/schemas/get-all-admin-products-sku.schema.ts";
import {AppLink} from "@/common/components/ui/link/link.tsx";
import {
	AdminProductsFilters
} from "@/features/admin/product/components/admin-product-filters/admin-products-filters.tsx";

export const Route = createFileRoute(`/_admin${paths.admin.products.sku}/`)({
	component: RouteComponent,
	validateSearch: getAllAdminProductsSkuInputSchema,
});

function RouteComponent() {
	const search = Route.useSearch();

	return (
		<>
			<div className="flex flex-col gap-y-1 font-semibold mb-10">
				<h1 className="font-semibold text-2xl md:text-3xl">
					Product Variants
				</h1>
				<Breadcrumb items={["Home", "Products", "Variants"]} />
			</div>
			<div className="flex items-center gap-x-10 justify-between mb-10">
				<AppLink
					className="inline-flex items-center justify-center border border-primary-150 text-primary-150 rounded-2xl px-6 py-2 shadow-sm hover:bg-primary-50 hover:text-primary-800 transition-colors"
					to={paths.admin.products.root}
				>Products</AppLink>
				<AdminProductsFilters
					initialFilters={search}
					target="sku"
				/>
			</div>

			<AdminProductsSkuList className="pb-10" />
		</>
	);
}