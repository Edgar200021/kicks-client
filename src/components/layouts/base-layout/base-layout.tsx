import { Outlet } from "@tanstack/react-router";
import { Header } from "@/components/header/header";

export const BaseLayout = () => {
	return (
		<div className="box">
			<Header />
			<Outlet />
		</div>
	);
};
