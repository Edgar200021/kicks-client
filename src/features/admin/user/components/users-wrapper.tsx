import { useEffect } from "react";
import { toast } from "sonner";
import z from "zod";
import { Spinner } from "@/common/components/ui/spinner/spinner";
import { useHandleError } from "@/common/hooks/use-handler-error";
import { useAppSelector } from "@/store/store";
import { cn } from "@/common/utils/cn";
import { useLazyGetAllUsersQuery } from "@/features/admin/user/api/admin-user-api";
import { UsersPagination } from "@/features/admin/user/components/users-pagination";
import { UsersTable } from "@/features/admin/user/components/users-table";
import { getAllUsersInputSchema } from "@/features/admin/user/schemas/get-all-users.schema";
import { userSelectors } from "@/features/admin/user/store/user-slice";
import { AdminUser } from "./user";

interface Props {
	className?: string;
}

export const UsersWrapper = ({ className }: Props) => {
	const filters = useAppSelector(userSelectors.getFilters);
	const [getAllUsers, { data, isLoading, isFetching, error }] =
		useLazyGetAllUsersQuery();

	useHandleError(error);

	useEffect(() => {
		(async () => {
			const { error, data } =
				await getAllUsersInputSchema.safeParseAsync(filters);

			if (error) {
				toast.error("Validation error", {
					description: z.prettifyError(error),
				});
				return;
			}

			getAllUsers(data);
		})();
	}, [filters]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center pt-[450px]">
				<Spinner size="xl" />
			</div>
		);
	}

	return (
		<div
			className={cn(
				"",
				{
					"opacity-70": isFetching,
				},
				className,
			)}
		>
			<UsersTable
				users={data?.data.users ?? []}
				className="mb-6 hidden min-[1700px]:block"
			/>
			{!!data?.data.users.length && (
				<ul className="min-[1700px]:hidden grid grid-cols-1 min-[800px]:grid-cols-2 gap-6 mb-6">
					{data.data.users.map((u) => (
						<li className="flex h-full" key={u.id}>
							<AdminUser user={u} />
						</li>
					))}
				</ul>
			)}
			{data?.data && (
				<UsersPagination
					className="max-[1700px]:justify-center"
					totalPages={data.data.pageCount}
				/>
			)}
		</div>
	);
};