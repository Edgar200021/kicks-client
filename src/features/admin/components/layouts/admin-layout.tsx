import { Outlet } from "@tanstack/react-router";
import { AdminFooter } from "@/features/admin/components/admin-footer.tsx";
import { AdminHeader } from "@/features/admin/components/admin-header";
import { NavbarWrapper } from "@/features/admin/components/navbar-wrapper.tsx";

export const AdminLayout = () => {
	return (
		<div className="flex min-h-screen">
			<NavbarWrapper drawerClassname="hidden" />
			<div className="flex flex-col gap-y-6 w-full min-h-dvh">
				<AdminHeader />
				<div className="max-w-[2500px] px-5 xl:pl-[400px] flex flex-col flex-1 gap-y-5 ">
					<main className="flex-1">
						<Outlet />
					</main>
					<AdminFooter />
				</div>
			</div>
		</div>
	);
};
