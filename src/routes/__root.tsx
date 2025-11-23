import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Footer } from "@/common/components/footer/footer";
import { Header } from "@/common/components/header/header";
import { BaseNotFound } from "@/common/components/not-found/base-not-found";
import type { User } from "@/common/types/api";
import type { Nullable } from "@/common/types/common";
import { env } from "@/config/env";

interface RouterContext {
	user: Nullable<User>;
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: () => {
		return (
			<>
				<Outlet />
				{env.ENV !== "production" && (
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
				)}
			</>
		);
	},
	notFoundComponent: () => <BaseNotFound />,
});
