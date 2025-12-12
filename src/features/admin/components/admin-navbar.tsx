import type { ReactNode } from "react";
import logoIcon from "@/common/assets/icons/logo.svg";
import { AppLink } from "@/common/components/ui/link/link";
import { cn } from "@/common/utils/cn";
import { paths } from "@/config/paths";
import sprites from "@/features/admin/assets/icons/sprites.svg";
import type { AdminPath } from "@/features/admin/types/path.ts";

interface Props {
	className?: string;
}

const links: {
	path: AdminPath;
	icon: ReactNode;
	label: Uppercase<string>;
}[] = [
	{
		path: paths.admin.root,
		icon: (
			<svg width={16} height={16}>
				<use xlinkHref={`${sprites}#dashboard`} />
			</svg>
		),
		label: "DASHBOARD",
	},
	{
		path: paths.admin.users,
		icon: (
			<svg width={16} height={16}>
				<use xlinkHref={`${sprites}#users`} />
			</svg>
		),
		label: "USERS LIST",
	},
	{
		path: paths.admin.products.root,
		icon: (
			<svg width={16} height={16}>
				<use xlinkHref={`${sprites}#albums`} />
			</svg>
		),
		label: "ALL PRODUCTS",
	},
	{
		path: paths.admin.orders,
		icon: (
			<svg width={16} height={16}>
				<use xlinkHref={`${sprites}#document`} />
			</svg>
		),
		label: "ORDERS LIST",
	},
	{
		//TODO:
		path: paths.admin.categories,
		icon: (
			<svg width={16} height={16}>
				<use xlinkHref={`${sprites}#document`} />
			</svg>
		),
		label: "CATEGORIES LIST",
	},
	{
		path: paths.admin.brands,
		icon: (
			<svg width={24} height={24}>
				<use xlinkHref={`${sprites}#brand`} />
			</svg>
		),
		label: "BRAND LIST",
	},
];

export const AdminNavbar = ({ className }: Props) => {
	return (
		<div
			className={cn(
				"py-8 px-6 bg-fa-white border-r border-r-gray-300 min-w-[300px] max-w-[360px] w-full min-h-dvh",
				className,
			)}
		>
			<img
				src={logoIcon}
				alt="Kicks"
				className="mb-12 max-w-32 w-full mx-auto"
				height={32}
			/>
			<nav>
				<ul className="flex flex-col gap-y-4">
					{links.map((l) => (
						<li key={l.path}>
							<AppLink
								className="flex items-center gap-x-2.5 p-4.5 text-primary-150 uppercase hover:bg-blue rounded-xl hover:text-white transition-colors duration-300 ease"
								activeProps={{
									className: "bg-blue text-white",
								}}
								activeOptions={{
									exact: true,
									includeSearch: false,
								}}
								to={l.path}
							>
								{l.icon}
								<span className="text-sm font-medium uppercase tracking-[0.32px]">
									{l.label}
								</span>
							</AppLink>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
};
