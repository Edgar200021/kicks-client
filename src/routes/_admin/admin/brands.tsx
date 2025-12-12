import { createFileRoute } from "@tanstack/react-router";
import { paths } from "@/config/paths";

import { getAllBrandsInputSchema } from "@/features/admin/brand/schemas/get-all-brands.schema.ts";
import { Breadcrumb } from "@/common/components/ui/breadcrumb";
import { CreateUpdateBrandForm } from "@/features/admin/brand/components/create-update-brand-form.tsx";
import { Button } from "@/common/components/ui/button/button.tsx";
import { BrandsFilters } from "@/features/admin/brand/components/brands-filters.tsx";
import { BrandsWrapper } from "@/features/admin/brand/components/brands-wrapper.tsx";

export const Route = createFileRoute(`/_admin${paths.admin.brands}`)({
	component: RouteComponent,
	validateSearch: getAllBrandsInputSchema,
});

function RouteComponent() {
	const search = Route.useSearch();

	return (
		<>
			<div className="flex flex-col gap-y-1 font-semibold mb-10">
				<h1 className="font-semibold text-2xl md:text-3xl">Brands List</h1>
				<Breadcrumb items={["Home", "Brands List"]} />
			</div>
			<div className="flex items-center justify-between gap-x-10 mb-10">
				<CreateUpdateBrandForm
					renderTrigger={(setOpen) => (
						<Button onClick={() => setOpen((prev) => !prev)}>
							Create brand
						</Button>
					)}
				/>
				<BrandsFilters initialFilters={search} />
			</div>
			<BrandsWrapper className="pb-10" />
		</>
	);
}
