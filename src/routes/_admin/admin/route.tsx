import { createFileRoute } from "@tanstack/react-router";
import { paths } from "@/config/paths";
import { AdminLayout } from "@/features/admin/components/layouts/admin-layout";

export const Route = createFileRoute(`/_admin${paths.admin.root}`)({
	component: RouteComponent,
});

function RouteComponent() {
	return <AdminLayout />;
}
