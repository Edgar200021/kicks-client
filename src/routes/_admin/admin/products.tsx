import { createFileRoute } from "@tanstack/react-router";
import { paths } from "@/config/paths";

export const Route = createFileRoute(`/_admin${paths.admin.products}`)({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_admin/admin/products"!</div>;
}
