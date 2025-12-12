import { Outlet } from "@tanstack/react-router";
import { cn } from "@/common/utils/cn";
import { JoinClub } from "@/features/auth/components/join-club";

interface Props {
	className?: string;
}

export const AuthLayout = ({ className }: Props) => {
	return (
		<main
			className={cn(
				"flex flex-col gap-y-6 md:flex-row md:gap-y-0 md:gap-x-5 md:justify-between items-start",
				className,
			)}
		>
			<Outlet />
			<JoinClub />
		</main>
	);
};
