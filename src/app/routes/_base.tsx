import { createFileRoute, redirect } from "@tanstack/react-router";
import { BaseLayout } from "@/common/components/layouts/base-layout.tsx";
import { UserRole } from "@/common/types/api.ts";
import { paths } from "@/config/paths.ts";

export const Route = createFileRoute("/_base")({
	component: RouteComponent,
	beforeLoad: (ctx) => {
		if (ctx.context.user && ctx.context.user.role === UserRole.Admin) {
			throw redirect({
				to: paths.admin.root,
			});
		}
	},
});

function RouteComponent() {
	return <BaseLayout />;
}