import {
	createFileRoute,
	useNavigate,
	useRouter,
} from "@tanstack/react-router";
import { SignInForm } from "@/features/auth/components/sign-in-form.tsx";
import { redirectPathSearchSchema } from "@/features/auth/schemas/redirect-path-search.schema.ts";

export const Route = createFileRoute("/_base/auth/(signup-signin)/sign-in")({
	component: RouteComponent,
	validateSearch: redirectPathSearchSchema,
});

function RouteComponent() {
	const { redirectPath } = Route.useSearch();

	const router = useRouter();
	const navigate = useNavigate();

	return (
		<SignInForm
			redirectPath={redirectPath}
			onSuccess={() => {
				if (redirectPath) {
					return navigate({ to: redirectPath });
				}

				router.invalidate();
			}}
		/>
	);
}