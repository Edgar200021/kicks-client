import { createRouter, RouterProvider } from "@tanstack/react-router";
import MainErrorBoundary from "@/common/components/errors/main-error-boundary.tsx";
import { Spinner } from "@/common/components/ui/spinner/spinner.tsx";
import { globalSelectors } from "@/store/slice.ts";
import { useAppSelector } from "@/store/store.ts";
import { useGetMe } from "@/features/auth/hooks/use-get-me.ts";
import { Toaster } from "../common/components/ui/toast/sonner.tsx";
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

	if (isLoading)
		return (
			<div className="h-screen flex items-center justify-center">
				<Spinner size="xl" />
			</div>
		);

	return (
		<>
			<RouterProvider
				router={router}
				context={{ user }}
				defaultErrorComponent={MainErrorBoundary}
			/>
			<Toaster
				position="top-right"
				toastOptions={{
					className: "w-[550px]! min-w-[300px]!",
				}}
			/>
		</>
	);
};