import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumb } from "@/common/components/ui/breadcrumb";
import { Button } from "@/common/components/ui/button/button.tsx";
import { paths } from "@/config/paths.ts";
import { CategoriesFilters } from "@/features/admin/category/components/categories-filters.tsx";
import { CategoriesWrapper } from "@/features/admin/category/components/categories-wrapper.tsx";
import { CreateUpdateCategoryForm } from "@/features/admin/category/components/create-update-category-form.tsx";
import { getAllCategoriesInputSchema } from "@/features/admin/category/schemas/get-all-categories.schema.ts";

export const Route = createFileRoute(`/_admin${paths.admin.categories}`)({
	component: RouteComponent,
	validateSearch: getAllCategoriesInputSchema,
});

function RouteComponent() {
	const search = Route.useSearch();

	return (
		<>
			<div className="flex flex-col gap-y-1 font-semibold mb-10">
				<h1 className="font-semibold text-2xl md:text-3xl">Categories List</h1>
				<Breadcrumb items={["Home", "Categories List"]} />
			</div>
			<div className="flex items-center justify-between gap-x-10 mb-10">
				<CreateUpdateCategoryForm
					renderTrigger={(setOpen) => (
						<Button onClick={() => setOpen((prev) => !prev)}>
							Create category
						</Button>
					)}
				/>
				<CategoriesFilters initialFilters={search} />
			</div>
			<CategoriesWrapper className="pb-10" />
		</>
	);
}
