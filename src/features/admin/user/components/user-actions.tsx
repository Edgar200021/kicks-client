import { BanIcon, EllipsisVertical, TrashIcon } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu/dropdown-menu";
import type { AdminUser } from "@/common/types/api";
import { cn } from "@/common/utils/cn";
import { useBlockToggle } from "@/features/admin/user/hooks/use-block-toggle";
import { useRemoveUser } from "@/features/admin/user/hooks/use-remove-user";

interface Props {
	className?: string;
	userId: AdminUser["id"];
	isBanned: AdminUser["isBanned"];
}

export const UserActions = ({ className, userId, isBanned }: Props) => {
	const { blockToggle, isLoading } = useBlockToggle(userId, isBanned);
	const { removeUser, isLoading: removeLoading } = useRemoveUser(userId);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className={cn("p-1 cursor-pointer", className)}>
				<EllipsisVertical size={18} />
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align="end"
				className="w-40 p-1 bg-white rounded-xl shadow-lg border border-slate-200"
			>
				<DropdownMenuItem
					disabled={isLoading || removeLoading}
					onClick={blockToggle}
					className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-slate-100 cursor-pointer"
				>
					<BanIcon
						size={16}
						className={isBanned ? "text-green-600" : "text-red-600"}
					/>
					<span>{isBanned ? "Unblock" : "Block"}</span>
				</DropdownMenuItem>
				<DropdownMenuItem
					disabled={isLoading || removeLoading}
					onClick={removeUser}
					className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-slate-100 cursor-pointer"
				>
					<TrashIcon size={16} className={"text-red-600"} />
					<span>Delete</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
