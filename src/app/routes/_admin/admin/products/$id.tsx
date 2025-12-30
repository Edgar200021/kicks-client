import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumb } from "@/common/components/ui/breadcrumb";
import { Spinner } from "@/common/components/ui/spinner/spinner.tsx";
import { paths } from "@/config/paths.ts";
import { AdminProductDetailsForm } from "@/features/admin/product/components/admin-product-details-form.tsx";
import { useGetAdminProduct } from "@/features/admin/product/hooks/use-get-admin-product.ts";

export const Route = createFileRoute(`/_admin${paths.admin.products.detail}`)({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const { product, isLoading, error } = useGetAdminProduct(id);

	if (isLoading)
		return (
			<div className="h-screen flex items-center justify-center">
				<Spinner size="xl" />
			</div>
		);

	if (error || !product) return;

	return (
		<>
			<div className="flex flex-col gap-y-1 font-semibold mb-10">
				<h1 className="font-semibold text-2xl md:text-3xl">Products Details</h1>
				<Breadcrumb items={["Home", "All Products", "Add New Product"]} />
			</div>
			<AdminProductDetailsForm
				type={{
					action: "create",
					data: product,
				}}
				className="pb-20"
			/>
		</>
	);
}
