import { createFileRoute } from "@tanstack/react-router";
import { AuthLayout } from "@/features/auth/components/layouts/auth-layout";

export const Route = createFileRoute("/_base/auth/(signup-signin)")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AuthLayout />;
}
