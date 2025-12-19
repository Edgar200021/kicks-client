import { Outlet } from "@tanstack/react-router";
import { AdminHeader } from "@/features/admin/components/admin-header";
import {NavbarWrapper} from "@/features/admin/components/NavbarWrapper.tsx";

export const AdminLayout = () => {
	return (
		<div className="flex min-h-screen">
		<NavbarWrapper drawerClassname="hidden"/>
			<div className="flex flex-col gap-y-6 w-full">
				<AdminHeader />
				<main className="max-w-[2500px] px-5 xl:pl-[400px]">
					<Outlet />
				</main>
			</div>
		</div>
	);
};