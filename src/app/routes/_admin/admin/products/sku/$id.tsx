import {createFileRoute} from "@tanstack/react-router";
import {paths} from "@/config/paths.ts";
import {Spinner} from "@/common/components/ui/spinner/spinner.tsx";
import {Breadcrumb} from "@/common/components/ui/breadcrumb";
import {
	AdminProductDetailsForm
} from "@/features/admin/product/components/admin-product-details-form.tsx";
import {useGetAdminProductSku} from "@/features/admin/product/hooks/use-get-admin-product-sku.ts";

export const Route = createFileRoute(
	`/_admin${paths.admin.products.skuDetail}`,
)({
	component: RouteComponent,
});

function RouteComponent() {
	const {id} = Route.useParams();
	const {productSku, isLoading, error} = useGetAdminProductSku(id);

	if (isLoading)
		return (
			<div className="h-screen flex items-center justify-center">
				<Spinner size="xl" />
			</div>
		);

	if (error || !productSku) return;

	return (
		<>
			<div className="flex flex-col gap-y-1 font-semibold mb-10">
				<h1 className="font-semibold text-2xl md:text-3xl">Products Details</h1>
				<Breadcrumb items={["Home", "All Products", "Update Product Variant"]} />
			</div>
			<AdminProductDetailsForm
				type={{
					action: "update",
					data: productSku,
				}}
				className="pb-20"
			/>
		</>
	);

}