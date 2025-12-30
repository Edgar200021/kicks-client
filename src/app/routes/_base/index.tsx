import { createFileRoute } from "@tanstack/react-router";

import { paths } from "@/config/paths.ts";

export const Route = createFileRoute(`/_base${paths.home}`)({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Main</div>;
}
