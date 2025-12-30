import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumb } from "@/common/components/ui/breadcrumb";
import { Button } from "@/common/components/ui/button/button.tsx";
import { AppLink } from "@/common/components/ui/link/link.tsx";
import { paths } from "@/config/paths.ts";
import { AdminProductsFilters } from "@/features/admin/product/components/admin-product-filters/admin-products-filters.tsx";
import { AdminProductsWrapper } from "@/features/admin/product/components/admin-products-wrapper.tsx";
import { CreateUpdateProductForm } from "@/features/admin/product/components/create-update-product-form.tsx";
import { getAllAdminProductsInputSchema } from "@/features/admin/product/schemas/get-all-admin-products.schema.ts";

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
				<div className="flex gap-x-2">
					<CreateUpdateProductForm
						type={{ action: "create" }}
						renderTrigger={(setOpen) => (
							<Button onClick={() => setOpen((prev) => !prev)}>
								Create product
							</Button>
						)}
					/>
					<AppLink
						to={paths.admin.products.sku}
						className="inline-flex items-center justify-center border border-primary-150 text-primary-150 rounded-2xl px-6 py-2 shadow-sm hover:bg-primary-50 hover:text-primary-800 transition-colors"
					>
						Variants
					</AppLink>
				</div>
				<AdminProductsFilters target="product" initialFilters={search} />
			</div>
			<AdminProductsWrapper className="pb-10" />
		</>
	);
}
