import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { UserRole } from "@/common/types/api.ts";
import { paths } from "@/config/paths.ts";

export const Route = createFileRoute("/_admin")({
	component: RouteComponent,
	beforeLoad: (ctx) => {
		if (!ctx.context.user || ctx.context.user.role !== UserRole.Admin) {
			throw redirect({
				to: !ctx.context.user ? paths.auth.signIn : paths.home,
				...(!ctx.context.user
					? {
							search: {
								redirectPath: location.pathname,
							},
						}
					: {}),
			});
		}
	},
});

function RouteComponent() {
	return (
		<div>
			<Outlet />
		</div>
	);
}