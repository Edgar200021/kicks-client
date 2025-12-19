import { createFileRoute } from "@tanstack/react-router";
import { paths } from "@/config/paths.ts";

export const Route = createFileRoute(`/_admin${paths.admin.products.sku}`)({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_admin/admin/products/sku"!</div>;
}
