import { createFileRoute } from "@tanstack/react-router";
import { AuthLayout } from "@/features/auth/components/layouts/auth-layout";
import { redirectPathSearchSchema } from "@/features/auth/schemas/redirect-path-search.schema";

export const Route = createFileRoute("/_base/auth/(signup-signin)")({
	component: RouteComponent,
	validateSearch: redirectPathSearchSchema,
});

function RouteComponent() {
	return <AuthLayout />;
}
