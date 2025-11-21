import logoIcon from "@/common/assets/icons/logo.svg";
import { HeaderLeft } from "@/common/components/header/header-left";
import { HeaderRight } from "@/common/components/header/header-right";
import { AppLink } from "@/common/components/ui/link/link";
import { cn } from "@/common/utils/cn";
import { paths } from "@/config/paths";

interface Props {
	className?: string;
}

export const Header = ({ className }: Props) => {
	return (
		<header
			className={cn(
				"rounded-[12px] p-4 bg-white flex items-center gap-x-4 justify-between",
				className,
			)}
		>
			<HeaderLeft />

			<AppLink to={paths.home} className="md:-ml-24 lg:-ml-40">
				<img className="md:w-32 md:h-8" src={logoIcon} alt="kicks" />
			</AppLink>

			<HeaderRight />
		</header>
	);
};
