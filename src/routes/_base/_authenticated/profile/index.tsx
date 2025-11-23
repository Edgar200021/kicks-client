import { createFileRoute } from "@tanstack/react-router";
import { paths } from "@/config/paths";

export const Route = createFileRoute(`/_base/_authenticated${paths.profile}/`)({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_base/profile/"!</div>;
}
