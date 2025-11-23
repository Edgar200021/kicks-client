import { cn } from "@/common/utils/cn";
import { ProductPreviewSkeleton } from "@/features/product/components/product-preview-skeleton/product-preview-skeleton";

interface Props {
	className?: string;
	length?: number;
}

export const ProductPreviewSkeletonList = ({
	className,
	length = 4,
}: Props) => {
	return (
		<ul
			className={cn(
				"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 content-center justify-center",
				className,
			)}
		>
			{Array.from({ length: length }).map((_, i) => (
				<li className="flex justify-center" key={i}>
					<ProductPreviewSkeleton />
				</li>
			))}
		</ul>
	);
};
