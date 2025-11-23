import { CheckIcon, Users, XIcon } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import z from "zod";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/common/components/ui/table";
import { useHandleError } from "@/common/hooks/use-handler-error";
import { cn } from "@/common/utils/cn";
import { formatDate } from "@/common/utils/date";
import { useLazyGetAllUsersQuery } from "@/features/admin/user/api/admin-user-api";
import { useUsersFilters } from "@/features/admin/user/context/users-filters.context";
import { getAllUsersInputSchema } from "../schemas/get-all-users.schema";

const headers = [
	"ID",
	"Email",
	"Name",
	"Verified",
	"Banned",
	"Created At",
	"Updated At",
];

export const UsersTable = () => {
	const { filters } = useUsersFilters();
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

	return (
		<Table className="bg-[#f8f8f8] rounded-2xl border-collapse border-spacing-y-1">
			<TableHeader className="text-2xl">
				<TableRow>
					{headers.map((h) => (
						<TableHead
							key={h}
							className={cn("w-[100px] text-primary-150/80 capitalize")}
						>
							{h}
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody className="text-xl">
				{data?.data.users.map(
					({
						id,
						email,
						firstName,
						lastName,
						isVerified,
						isBanned,
						createdAt,
						updatedAt,
					}) => (
						<TableRow key={id} className="border-b! border-b-primary-150/20!">
							<TableCell>{id}</TableCell>
							<TableCell>{email}</TableCell>
							<TableCell className="capitalize">
								{!firstName && !lastName
									? "-"
									: `${firstName ?? ""} ${lastName ?? ""}`}
							</TableCell>
							<TableCell>
								{isVerified ? (
									<CheckIcon className="stroke-green-500" />
								) : (
									<XIcon className="stroke-red-500" />
								)}
							</TableCell>
							<TableCell>
								{isBanned ? (
									<CheckIcon className="stroke-green-500" />
								) : (
									<XIcon className="stroke-red-500" />
								)}
							</TableCell>
							<TableCell>
								{formatDate(new Date(createdAt).toLocaleString())}
							</TableCell>
							<TableCell>
								{formatDate(new Date(updatedAt).toLocaleString())}
							</TableCell>
						</TableRow>
					),
				)}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Total</TableCell>
					<TableCell className="text-right">$2,500.00</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
};
