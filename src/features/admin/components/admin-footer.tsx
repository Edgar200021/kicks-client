import { cn } from "@/common/utils/cn.ts";

interface Props {
	className?: string;
}

export const AdminFooter = ({ className }: Props) => {
	return (
		<footer
			className={cn(
				" py-4 border-t-[0.50px] border-t-[#23232133] flex items-center justify-between gap-x-5 font-secondary",
				className,
			)}
		>
			<span className="text-sm text-primary-150">
				© {new Date().getFullYear()} - kicks Dashboard
			</span>
			<ul className="flex items center gap-x-4 font-semibold text-sm">
				<li>About</li>
				<li>Careers</li>
				<li>Policy</li>
				<li>Contact</li>
			</ul>
		</footer>
	);
};
