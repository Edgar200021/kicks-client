import {
	Bell,
	ChevronDownIcon,
	ChevronRightIcon,
	LogOut,
	SearchIcon,
} from "lucide-react";
import { Button } from "@/common/components/ui/button/button";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu/dropdown-menu";
import { AppLink } from "@/common/components/ui/link/link";
import { useGetUser } from "@/common/hooks/use-get-user";
import { useLogout } from "@/common/hooks/use-logout";
import { cn } from "@/common/utils/cn";
import {NavbarWrapper} from "@/features/admin/components/NavbarWrapper.tsx";

interface Props {
	className?: string;
}

export const AdminHeader = ({ className }: Props) => {
	const user = useGetUser();
	const { logout, isLoading } = useLogout();

	return (
		<header
			className={cn(
				"bg-fa-white py-7 w-full border-b border-r-gray-300",
				className,
			)}
		>
			<div className="max-w-[2500px] px-5 flex items-center justify-between">
				<NavbarWrapper/>
				<div className="ml-auto flex items-center gap-x-8">
					<SearchIcon size={20} className="text-primary-150 cursor-pointer" />
					<Bell className="cursor-pointer fill-blue stroke-blue" size={20} />
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								className="hover:bg-blue hover:border-blue hover:text-white data-[state=open]:bg-blue data-[state=open]:border-blue data-[state=open]:text-white data-[state=open]:[&_svg]:-rotate-180 p-5"
							>
								<span>{user.firstName}</span>
								<ChevronDownIcon className="transition-transform duration-300 ease" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							side="bottom"
							align="end"
							className="p-4 w-[233px] mt-5"
						>
							<DropdownMenuLabel className="font-semibold text-xl">
								{user.firstName}
							</DropdownMenuLabel>
							<DropdownMenuSeparator className="mb-3" />
							<div className="space-y-4 font-third font-medium text-xl uppercase">
								<DropdownMenuItem className="p-0 hover:bg-transparent!">
									{/**TODO: */}
									<AppLink
										disabled={isLoading}
										className="font-medium text-sm flex items-center justify-between w-full text-primary-150 py-1"
									>
										<span>Change Password</span>
										<ChevronRightIcon className="text-primary-150" />
									</AppLink>
								</DropdownMenuItem>
								<DropdownMenuItem className="p-0 hover:bg-transparent!">
									<Button
										onClick={async () => await logout()}
										disabled={isLoading}
										variant="ghost"
										className="font-medium text-sm flex items-center justify-between w-full text-primary-150 py-1 px-0! h-fit uppercase"
									>
										<span>Log Out</span>
										<LogOut className="text-primary-150" />
									</Button>
								</DropdownMenuItem>
							</div>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
};