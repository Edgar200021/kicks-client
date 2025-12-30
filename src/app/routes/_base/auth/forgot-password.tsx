import { createFileRoute } from "@tanstack/react-router";
import { paths } from "@/config/paths.ts";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form.tsx";

export const Route = createFileRoute(`/_base${paths.auth.forgotPassword}`)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="py-40 md:py-60">
			<ForgotPasswordForm />
		</main>
	);
}
