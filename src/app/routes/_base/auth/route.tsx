import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { paths } from "@/config/paths.ts";

export const Route = createFileRoute("/_base/auth")({
	component: RouteComponent,
	beforeLoad: (ctx) => {
		if (ctx.context.user) {
			throw redirect({ to: paths.home });
		}
	},
});

function RouteComponent() {
	return <Outlet />;
}