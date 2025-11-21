import { createFileRoute } from "@tanstack/react-router";
import { paths } from "@/config/paths";
import { SignUpForm } from "@/features/auth/components/sign-up-form";

export const Route = createFileRoute(`/_base${paths.auth.signUp.path}`)({
	component: RouteComponent,
});

function RouteComponent() {
	const { redirectPath } = Route.useSearch();

	return <SignUpForm redirectPath={redirectPath} />;
}
