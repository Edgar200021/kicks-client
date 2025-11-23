import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumb } from "@/common/components/ui/breadcrumb";
import { paths } from "@/config/paths";
import { UsersTable } from "@/features/admin/user/components/users-table";
import { UsersFiltersProvider } from "@/features/admin/user/context/users-filters.context";

export const Route = createFileRoute(`/_admin${paths.admin.users}`)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<UsersFiltersProvider>
			<div className="flex flex-col gap-y-1 font-semibold mb-10">
				<h1 className="font-semibold text-xl md:text-2xl">Users List</h1>
				<Breadcrumb items={["Home", "Users List"]} />
			</div>
			<UsersTable />
		</UsersFiltersProvider>
	);
}
