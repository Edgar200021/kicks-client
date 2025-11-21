import { createFileRoute } from "@tanstack/react-router";
import { BaseLayout } from "@/common/components/layouts/base-layout/base-layout";

export const Route = createFileRoute("/_base")({
	component: RouteComponent,
});

function RouteComponent() {
	return <BaseLayout />;
}