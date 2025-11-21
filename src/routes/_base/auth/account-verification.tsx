import { createFileRoute } from "@tanstack/react-router";
import { paths } from "@/config/paths";
import { AccountVerification } from "@/features/auth/components/account-verification";
import { verifyAccountInputSchema } from "../../../features/auth/schemas/verify-account.schema";

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
