import { createFileRoute } from "@tanstack/react-router";
import { paths } from "@/config/paths.ts";
import { AdminLayout } from "@/features/admin/components/layouts/admin-layout.tsx";

export const Route = createFileRoute(`/_admin${paths.admin.root}`)({
	component: RouteComponent,
});

function RouteComponent() {
	return <AdminLayout />;
}