import { createFileRoute } from "@tanstack/react-router";
import { AuthLayout } from "@/features/auth/components/layouts/auth-layout";

export const Route = createFileRoute("/_base/auth")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AuthLayout />;
}
