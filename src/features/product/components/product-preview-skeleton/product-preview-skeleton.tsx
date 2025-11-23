import { cn } from "@/common/utils/cn";

interface Props {
	className?: string;
}

export const ProductPreviewSkeleton = ({ className }: Props) => {
	return (
		<div
			className={cn(
				"flex flex-col border rounded-2xl p-4 bg-card space-y-4 min-w-[250px] max-w-[320px]! w-full animate-pulse",
				className,
			)}
		>
			<div className="h-6 w-12 rounded-full bg-muted" />

			<div className="h-48 w-full rounded-xl bg-muted" />

			<div className="h-4 w-full rounded bg-muted" />
			<div className="h-4 w-full rounded bg-muted -mt-2" />
			<div className="h-4 w-1/2 rounded bg-muted -mt-2" />

			<div className="h-10 w-full rounded-lg bg-muted" />
		</div>
	);
};
