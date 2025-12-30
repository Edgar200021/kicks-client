import { Calendar, Hash, Tag } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/common/components/ui/badge/badge";
import { Button } from "@/common/components/ui/button/button";
import type { Brand } from "@/common/types/api.ts";
import { cn } from "@/common/utils/cn";
import { BrandsActions } from "@/features/admin/brand/components/brands-actions.tsx"; // если будут действия

type Props = {
	className?: string;
	brand: Brand;
};

export const AdminBrand = ({ className, brand }: Props) => {
	const handleCopyName = async () => {
		try {
			await navigator.clipboard.writeText(brand.name);
			toast.success("Brand name copied");
		} catch (_) {
			toast.error("Error", {
				description: "Failed to copy brand name",
			});
		}
	};

	return (
		<article
			className={cn(
				"rounded-2xl bg-white min-w-[250px] max-w-[550px] w-full p-4 shadow-md border border-gray-100",
				className,
			)}
		>
			<div className="flex items-start gap-4">
				<div className="shrink-0">
					<div className="w-14 h-14 rounded-xl bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center text-lg font-semibold text-gray-700 uppercase">
						{brand.name?.[0] ?? "-"}
					</div>
				</div>

				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between gap-2">
						<div className="min-w-0">
							<h3 className="text-sm font-semibold leading-5 text-slate-900 truncate">
								{brand.name}
							</h3>

							<p className="text-xs text-slate-500 break-all mt-0.5">
								ID: {brand.id}
							</p>

							<div className="flex items-center gap-2 mt-2">
								<Badge variant="secondary">Category</Badge>
							</div>
						</div>
						<BrandsActions brandId={brand.id} brandName={brand.name} />
					</div>

					<div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
						<div className="flex items-center gap-2">
							<Calendar className="w-4 h-4 text-slate-400" />
							<span className="truncate">
								Created: {new Date(brand.createdAt).toLocaleString()}
							</span>
						</div>

						<div className="flex items-center gap-2">
							<Calendar className="w-4 h-4 text-slate-400" />
							<span className="truncate">
								Updated: {new Date(brand.updatedAt).toLocaleString()}
							</span>
						</div>

						<div className="flex items-center gap-2">
							<Tag className="w-4 h-4 text-slate-400" />
							<span className="truncate">Name: {brand.name}</span>
						</div>

						<div className="flex items-center gap-2">
							<Hash className="w-4 h-4 text-slate-400" />
							<span className="truncate font-medium">{brand.id}</span>
						</div>
					</div>

					<div className="mt-4 flex items-center gap-2">
						<Button
							variant="ghost"
							onClick={handleCopyName}
							className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-100 text-sm shadow-sm hover:shadow-md"
						>
							<Tag className="w-4 h-4" />
							<span>Copy name</span>
						</Button>
					</div>
				</div>
			</div>

			<div className="mt-4 pt-3 border-t border-gray-100 text-xs text-slate-500 flex items-center justify-between gap-x-4">
				<span>Updated: {new Date(brand.updatedAt).toLocaleString()}</span>
			</div>
		</article>
	);
};
