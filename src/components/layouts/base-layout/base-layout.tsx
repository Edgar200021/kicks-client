import { Outlet } from "@tanstack/react-router";
import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";

export const BaseLayout = () => {
	return (
		<div className="box">
			<Header className="mb-20" />
			<Outlet />
			<Footer className="py-[58px]" />
		</div>
	);
};
