import { cn } from "@/common/utils/cn";

interface BreadcrumbProps {
	items: string[];
	className?: string;
}

export const Breadcrumb = ({ className, items }: BreadcrumbProps) => {
	return (
		<span
			className={cn(
				"font-semibold opacity-80 font-secondary md:text-2xl",
				className,
			)}
		>
			{items.join(" > ")}
		</span>
	);
};
