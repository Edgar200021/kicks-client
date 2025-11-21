import { createRouter, RouterProvider } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";

// Import the generated route tree
import { routeTree } from "./routeTree.gen.ts";

import "./styles.css";
import { Provider } from "react-redux";
import { Toaster } from "@/common/components/ui/toast/sonner.tsx";
import { store } from "@/common/store/store.ts";
import reportWebVitals from "./reportWebVitals.ts";

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

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<Provider store={store}>
			<RouterProvider router={router} />
			<Toaster position="top-right" />
		</Provider>,
	);
}

reportWebVitals();