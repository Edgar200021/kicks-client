import logoIcon from "@/common/assets/icons/logo.svg";
import { AppLink } from "@/common/components/ui/link/link";
import { cn } from "@/common/utils/cn";
import type { paths } from "@/config/paths";
import sprites from "@/features/admin/assets/icons/sprites.svg";

interface Props {
	className?: string;
}

type AdminPath = (typeof paths)["admin"][keyof (typeof paths)["admin"]];

const links: {
	path: AdminPath;
	icon: `${string}#${string}`;
	label: Uppercase<string>;
}[] = [
	{
		path: "/admin",
		icon: `${sprites}#dashboard`,
		label: "DASHBOARD",
	},
	{
		path: "/admin/users",
		icon: `${sprites}#dashboard`,
		label: "USERS",
	},
	{
		path: "/admin/products",
		icon: `${sprites}#albums`,
		label: "ALL PRODUCTS",
	},
	{
		path: "/admin/orders",
		icon: `${sprites}#document`,
		label: "ORDERS LIST",
	},
];

export const AdminNavbar = ({ className }: Props) => {
	return (
		<div
			className={cn(
				"py-8 px-6 bg-fa-white border-r border-r-gray-300 max-w-[360px] w-full h-dvh",
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
								}}
								to={l.path}
							>
								<svg className="" width={16} height={16}>
									<use xlinkHref={l.icon} />
								</svg>
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
