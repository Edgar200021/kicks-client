import { createFileRoute } from "@tanstack/react-router";
import { paths } from "@/config/paths";

export const Route = createFileRoute(`/_base${paths.cart}/`)({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_base/cart/"!</div>;
}
