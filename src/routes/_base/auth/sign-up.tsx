import { createFileRoute } from "@tanstack/react-router";
import { paths } from "@/config/paths";

export const Route = createFileRoute(`/_base${paths.auth.signUp}`)({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_base/auth/sign-up"!</div>;
}
