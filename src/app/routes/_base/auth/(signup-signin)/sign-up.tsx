import { createFileRoute } from "@tanstack/react-router";
import { SignUpForm } from "@/features/auth/components/sign-up-form.tsx";

export const Route = createFileRoute("/_base/auth/(signup-signin)/sign-up")({
	component: RouteComponent,
});

function RouteComponent() {
	return <SignUpForm />;
}