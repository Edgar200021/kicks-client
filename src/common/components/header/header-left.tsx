import { ChevronDownIcon, Flame } from "lucide-react";
import { useState } from "react";
import { Button } from "@/common/components/ui/button/button";
import {
	Drawer,
	DrawerContent,
	DrawerTrigger,
} from "@/common/components/ui/drawer/drawer";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu/dropdown-menu";
import { AppLink } from "@/common/components/ui/link/link";
import { cn } from "@/common/utils/cn";
import { paths } from "@/config/paths";

interface Props {
	className?: string;
}

export const HeaderLeft = ({ className }: Props) => {
	const [menDropdown, setMenDropdown] = useState(false);
	const [womenDropdown, setWomenDropdown] = useState(false);

	return (
		<nav className={cn("", className)}>
			<div className="md:hidden">
				<Drawer direction="right">
					<DrawerTrigger asChild>
						<Button
							variant="ghost"
							className="relative w-4.5 h-3 p-0 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-0.5 before:bg-black before:transition-all before:duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5  after:bg-black after:transition-all after:duration-300  data-[state=open]:before:top-1/2 data-[state=open]:before:rotate-45 data-[state=open]:after:top-1/2 data-[state=open]:after:-rotate-45 data-[state=open]:[&_span]:opacity-0
               "
						>
							<span className="h-0.5 w-full absolute bg-black top-[50%] -translate-y-1/2 tranition-opacity duration-300"></span>
						</Button>
					</DrawerTrigger>
					<DrawerContent>Content</DrawerContent>
				</Drawer>
			</div>
			<div className="hidden md:flex items-center gap-x-3">
				<div className="flex items-center gap-x-10">
					{/* TODO: */}
					<AppLink
						to={paths.home}
						className="font-semibold text-primary-150 flex  gap-x-0.5"
					>
						<span>New Drops</span>
						<Flame size={20} className="fill-orange-500 stroke-orange-500" />
					</AppLink>

					<DropdownMenu
						open={menDropdown}
						onOpenChange={() => setMenDropdown(false)}
					>
						<DropdownMenuTrigger
							onMouseEnter={() => {
								setMenDropdown(true);
								setWomenDropdown(false);
							}}
							asChild
						>
							<Button
								variant="ghost"
								className="p-0! flex items-center gap-x-1 focus-visible:ring-0! data-[state=open]:[&_svg]:-rotate-180 font-semibold text-base"
							>
								<span>Men</span>
								<ChevronDownIcon className="transition-transform duration-300 ease" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							onMouseLeave={() => setMenDropdown(false)}
							align="start"
						>
							{/* TODO: */}
							<DropdownMenuItem className="cursor-pointer hover:bg-gray-200!">
								Light
							</DropdownMenuItem>
							<DropdownMenuItem className="cursor-pointer">
								Dark
							</DropdownMenuItem>
							<DropdownMenuItem className="cursor-pointer">
								System
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<DropdownMenu
						open={womenDropdown}
						onOpenChange={() => setWomenDropdown(false)}
					>
						<DropdownMenuTrigger
							onMouseEnter={() => {
								setWomenDropdown(true);
								setMenDropdown(false);
							}}
							asChild
						>
							<Button
								variant="ghost"
								className="p-0! flex items-center gap-x-1 focus-visible:ring-0! data-[state=open]:[&_svg]:-rotate-180 font-semibold text-base"
							>
								<span>Women</span>
								<ChevronDownIcon className="transition-transform duration-300 ease" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							onMouseLeave={() => setWomenDropdown(false)}
							align="start"
						>
							{/* TODO: */}
							<DropdownMenuItem className="cursor-pointer">
								Light
							</DropdownMenuItem>
							<DropdownMenuItem className="cursor-pointer">
								Dark
							</DropdownMenuItem>
							<DropdownMenuItem className="cursor-pointer">
								System
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</nav>
	);
};
