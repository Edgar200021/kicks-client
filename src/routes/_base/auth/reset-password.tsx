import { createFileRoute } from "@tanstack/react-router";
import { paths } from "@/config/paths";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import { resetPasswordInputSchema } from "../../../features/auth/schemas/reset-password.schema";

export const Route = createFileRoute(`/_base${paths.auth.resetPassword}`)({
	component: RouteComponent,
	validateSearch: resetPasswordInputSchema.pick({ email: true, token: true }),
});

function RouteComponent() {
	const { token, email } = Route.useSearch();

	return (
		<main className="py-40 md:py-60">
			<ResetPasswordForm
				rest={{
					token,
					email,
				}}
			/>
		</main>
	);
}
