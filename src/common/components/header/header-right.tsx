import { SearchIcon, ShoppingCart, UserRound } from "lucide-react";
import { AppLink } from "@/common/components/ui/link/link";
import { cn } from "@/common/utils/cn";
import { paths } from "@/config/paths";
import { globalSelectors } from "@/store/slice";
import { useAppSelector } from "@/store/store";

interface Props {
	className?: string;
}

export const HeaderRight = ({ className }: Props) => {
	const user = useAppSelector(globalSelectors.getUser);

	return (
		<div className={cn("flex items-center gap-x-2.5", className)}>
			<SearchIcon className="hidden md:inline w-5 md:w-6" />

			<AppLink
				to={user ? paths.cart : paths.auth.signIn}
				className="relative w-5 md:w-6"
			>
				<ShoppingCart className="w-full stroke-slate-700" />

				<span className="absolute -top-1.5 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">
					0
				</span>
			</AppLink>
			<AppLink
				to={user ? paths.profile : paths.auth.signIn}
				className="w-5 md:w-6"
			>
				<UserRound className="w-full fill-primary-150 stroke-primary-150" />
			</AppLink>
		</div>
	);
};
