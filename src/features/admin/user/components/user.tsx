import {
	Calendar,
	Mail,
	UserCheck,
	User as UserIcon,
	UsersRound,
	UserX,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/common/components/ui/badge/badge";
import { Button } from "@/common/components/ui/button/button";
import type { AdminUser as TAdminUser } from "@/common/types/api";
import { cn } from "@/common/utils/cn";
import { UserActions } from "./user-actions";

type Props = {
	className?: string;
	user: TAdminUser;
};

export const AdminUser = ({ className, user }: Props) => {
	const handleCopyEmail = async () => {
		try {
			await navigator.clipboard.writeText(user.email);
			toast.success("Email скопирован");
		} catch (_) {
			toast.error("Error", {
				description: "Не удалось скопировать email",
			});
		}
	};

	return (
		<article
			className={cn(
				"rounded-2xl bg-white min-w-[300px] max-w-[550px] w-full p-4 shadow-md border border-gray-100",
				className,
			)}
		>
			<div className="flex items-start gap-4">
				<div className="shrink-0">
					<div className="w-14 h-14 rounded-xl bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center text-lg font-semibold text-gray-700 uppercase">
						{!user.firstName && !user.lastName
							? "-"
							: `${user.firstName?.["0"]}${user.lastName?.["0"]}`}
					</div>
				</div>

				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between gap-2">
						<div className="min-w-0">
							<h3 className="text-sm font-semibold leading-5 text-slate-900 truncate">
								{user.firstName || user.lastName
									? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
									: user.email}
							</h3>
							<p className="text-xs text-slate-500 truncate mt-0.5 mb-2 max-w-[150px]">
								{user.email}
							</p>
							<div className="flex items-center gap-2 mt-1 flex-wrap">
								{user.googleId && (
									<Badge
										variant="secondary"
										className="bg-blue-50 text-blue-700 border-blue-200"
									>
										Google
									</Badge>
								)}
								{user.facebookId && (
									<Badge
										variant="secondary"
										className="bg-blue-50 text-blue-700 border-blue-200"
									>
										Facebook
									</Badge>
								)}
							</div>
						</div>

						<div className="flex items-center gap-2">
							<span
								className={cn(
									"inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium",
									user.isBanned
										? "bg-red-100 text-red-700"
										: "bg-green-100 text-green-800",
								)}
							>
								{user.isBanned ? (
									<UserX className="w-3 h-3" />
								) : (
									<UserCheck className="w-3 h-3" />
								)}
								{user.isBanned ? "Banned" : "Active"}
							</span>

							<UserActions userId={user.id} isBanned={user.isBanned} />
						</div>
					</div>

					<div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
						<div className="flex items-center gap-2">
							<Mail className="w-4 h-4 text-slate-400" />
							<span className="truncate">{user.email}</span>
						</div>

						<div className="flex items-center gap-2">
							<Calendar className="w-4 h-4 text-slate-400" />
							<span className="truncate">
								Created: {new Date(user.createdAt).toLocaleString()}
							</span>
						</div>

						<div className="flex items-center gap-2">
							<UserIcon className="w-4 h-4 text-slate-400" />
							<span className="truncate">
								Role: <span className="font-medium">{user.role}</span>
							</span>
						</div>

						<div className="flex items-center gap-2">
							<UsersRound className="w-4 h-4 text-slate-400" />
							<span className="truncate">
								Gender:{" "}
								<span className="font-medium">{user.gender ?? "—"}</span>
							</span>
						</div>
					</div>

					<div className="mt-4 flex items-center gap-2">
						<Button
							variant="ghost"
							onClick={handleCopyEmail}
							className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-100 text-sm shadow-sm hover:shadow-md"
						>
							<Mail className="w-4 h-4" />
							<span>Copy email</span>
						</Button>
					</div>
				</div>
			</div>

			<div className="mt-4 pt-3 border-t border-gray-100 text-xs text-slate-500 flex items-center justify-between gap-x-4">
				<span>Updated: {new Date(user.updatedAt).toLocaleString()}</span>
				<span className="flex items-center gap-2">
					<span className="px-2 py-0.5 rounded text-xs bg-slate-100">
						ID: {user.id}
					</span>
				</span>
			</div>
		</article>
	);
};
