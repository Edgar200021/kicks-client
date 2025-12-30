import { createFileRoute } from "@tanstack/react-router";
import { paths } from "@/config/paths.ts";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form.tsx";
import { resetPasswordInputSchema } from "../../../../features/auth/schemas/reset-password.schema.ts";

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
