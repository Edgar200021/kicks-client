import { Outlet } from "@tanstack/react-router";
import { Footer } from "@/common/components/footer/footer";
import { Header } from "@/common/components/header/header";

export const BaseLayout = () => {
	return (
		<div className="box">
			<Header className="mb-20" />
			<Outlet />
			<Footer className="pt-[58px]" />
		</div>
	);
};