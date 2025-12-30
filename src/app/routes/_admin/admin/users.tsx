import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumb } from "@/common/components/ui/breadcrumb";
import { paths } from "@/config/paths.ts";
import { UsersFilters } from "@/features/admin/user/components/users-filters.tsx";
import { UsersWrapper } from "@/features/admin/user/components/users-wrapper.tsx";
import { getAllUsersInputSchema } from "@/features/admin/user/schemas/get-all-users.schema.ts";

export const Route = createFileRoute(`/_admin${paths.admin.users}`)({
	component: RouteComponent,
	validateSearch: getAllUsersInputSchema,
});

function RouteComponent() {
	const search = Route.useSearch();

	return (
		<>
			<div className="flex flex-col gap-y-1 font-semibold mb-10">
				<h1 className="font-semibold text-2xl md:text-3xl">Users List</h1>
				<Breadcrumb items={["Home", "Users List"]} />
			</div>
			<UsersFilters initialFilters={search} className="mb-10" />
			<UsersWrapper className="pb-10" />
		</>
	);
}
