import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Toaster } from "sonner";
import MainErrorBoundary from "@/common/components/errors/main-error-boundary.tsx";
import { Spinner } from "@/common/components/ui/spinner/spinner.tsx";
import { globalSelectors } from "@/common/store/slice.ts";
import { useAppSelector } from "@/common/store/store.ts";
import { useGetMe } from "@/features/auth/hooks/use-get-me.ts";
import { routeTree } from "./routeTree.gen.ts";

const router = createRouter({
	routeTree,
	context: {
		user: null,
	},
	defaultPreload: "intent",
	scrollRestoration: true,
	defaultStructuralSharing: true,
	defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

export const App = () => {
	const user = useAppSelector(globalSelectors.getUser);
	const { isLoading } = useGetMe();

	if (isLoading) return <Spinner size="xl" />;

	return (
		<>
			<RouterProvider
				router={router}
				context={{ user }}
				defaultErrorComponent={MainErrorBoundary}
			/>
			<Toaster position="top-right" />
		</>
	);
};
