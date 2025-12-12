import { CheckIcon, XIcon } from "lucide-react";

import type { AdminUser } from "@/common/types/api";
import { cn } from "@/common/utils/cn";
import { formatDate } from "@/common/utils/date";
import { UserActions } from "@/features/admin/user/components/user-actions";

const headers = [
	"ID",
	"Email",
	"Name",
	"Verified",
	"Banned",
	"Created At",
	"Updated At",
	"Actions",
];

interface Props {
	className?: string;
	users: AdminUser[];
}

export const UsersTable = ({ users, className }: Props) => {
	return (
		<div
			className={cn(
				"py-6 px-4 rounded-2xl bg-[#f8f8f8] max-w-full overflow-x-auto whitespace-nowrap",
				className,
			)}
		>
			<table className="w-full border-separate border-spacing-y-4">
				<thead>
					<tr>
						{headers.map((h) => (
							<th
								id={h}
								className="text-start font-semibold text-primary-150/80 pr-10 border-b-primary-150/20 border-b py-4"
								key={h}
							>
								{h}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{users.map(
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
							<tr
								key={id}
								className="[&>td]:text-start [&>td]:text-sm [&>td]:border-b-primary-150/20 [&>td]:border-b [&>td]:py-4 [&>td]:break-all [&>td]:wrap-break-word font-secondary font-semibold"
							>
								<td headers="ID" className="pr-4">
									{id}
								</td>
								<td headers="Email" className="pr-4">
									{email}
								</td>
								<td headers="Name" className="pr-4">
									{!firstName && !lastName
										? "-"
										: `${firstName ?? ""} ${lastName ?? ""}`}
								</td>

								<td headers="Verified" className="pr-4">
									{isVerified ? (
										<CheckIcon size={20} className="stroke-green-500 ml-5" />
									) : (
										<XIcon size={20} className="stroke-red-500 ml-5" />
									)}
								</td>
								<td headers="Banned" className="pr-4">
									{isBanned ? (
										<CheckIcon size={20} className="stroke-green-500 ml-5" />
									) : (
										<XIcon size={20} className="stroke-red-500 ml-5" />
									)}
								</td>
								<td headers="Created At" className="pr-4">
									{formatDate(new Date(createdAt).toLocaleString())}
								</td>
								<td headers="Updated At" className="pr-4">
									{formatDate(new Date(updatedAt).toLocaleString())}
								</td>
								<td>
									<UserActions
										userId={id}
										isBanned={isBanned}
										className="ml-5"
									/>
								</td>
							</tr>
						),
					)}
				</tbody>
			</table>
		</div>
	);
};
