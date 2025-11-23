import { Outlet } from "@tanstack/react-router";
import { AdminHeader } from "@/features/admin/components/admin-header";
import { AdminNavbar } from "@/features/admin/components/admin-navbar";

export const AdminLayout = () => {
	return (
		<div className="flex">
			<AdminNavbar className="hidden lg:block" />
			<div className="flex flex-col gap-y-6 w-full">
				<AdminHeader />
				<main className="max-w-[2500px] px-5">
					<Outlet />
				</main>
			</div>
		</div>
	);
};
