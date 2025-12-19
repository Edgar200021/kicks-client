import { createFileRoute } from "@tanstack/react-router";
import { paths } from "@/config/paths.ts";
import { AccountVerification } from "@/features/auth/components/account-verification.tsx";
import { verifyAccountInputSchema } from "../../../../features/auth/schemas/verify-account.schema.ts";

export const Route = createFileRoute(`/_base${paths.auth.accountVerification}`)(
	{
		component: RouteComponent,
		validateSearch: verifyAccountInputSchema,
	},
);

function RouteComponent() {
	const { token } = Route.useSearch();
	return (
		<div>
			<AccountVerification token={token} />
		</div>
	);
}