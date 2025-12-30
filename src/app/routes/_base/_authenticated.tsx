import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { paths } from "@/config/paths.ts";

export const Route = createFileRoute("/_base/_authenticated")({
	component: RouteComponent,
	beforeLoad: (ctx) => {
		if (!ctx.context.user) {
			throw redirect({
				to: paths.auth.signIn,
				search: {
					redirectPath: location.pathname,
				},
			});
		}
	},
});

function RouteComponent() {
	return <Outlet />;
}
