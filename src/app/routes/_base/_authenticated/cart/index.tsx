import { createFileRoute } from "@tanstack/react-router";
import { paths } from "@/config/paths.ts";

export const Route = createFileRoute(`/_base/_authenticated${paths.cart}/`)({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_base/_authenticated/cart/"!</div>;
}
