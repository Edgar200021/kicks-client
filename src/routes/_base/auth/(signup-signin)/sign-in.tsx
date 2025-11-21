import { createFileRoute } from "@tanstack/react-router";
import { paths } from "@/config/paths";
import { SignInForm } from "@/features/auth/components/sign-in-form";

export const Route = createFileRoute(`/_base${paths.auth.signIn.path}`)({
	component: RouteComponent,
});

function RouteComponent() {
	const { redirectPath } = Route.useSearch();
	return <SignInForm redirectPath={redirectPath} />;
}
