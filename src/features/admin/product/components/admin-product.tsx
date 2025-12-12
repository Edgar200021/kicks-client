import { Calendar, Package, Trash2, CheckCircle } from "lucide-react";
import type { AdminProduct as TAdminProduct } from "@/common/types/api";
import { cn } from "@/common/utils/cn";
import { formatDate } from "@/common/utils/date";
import { AdminProductActions } from "./admin-product-actions";

type Props = {
	className?: string;
	product: TAdminProduct;
};

export const AdminProduct = ({ className, product }: Props) => {
	return (
		<article
			className={cn(
				"rounded-2xl bg-white min-w-[300px] w-full p-4 shadow-md border border-gray-100",
				className,
			)}
		>
			<div className="flex items-start justify-between gap-3">
				<div className="min-w-0">
					<h3 className="text-sm font-semibold text-slate-900 truncate">
						{product.title}
					</h3>
					<p className="text-xs text-slate-500 truncate mt-0.5">
						{product.description || "—"}
					</p>
				</div>

				<AdminProductActions adminProduct={product} />
			</div>

			<div className="mt-3 flex items-center gap-2">
				<span
					className={cn(
						"inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium",
						product.isDeleted
							? "bg-red-100 text-red-700"
							: "bg-green-100 text-green-800",
					)}
				>
					{product.isDeleted ? (
						<Trash2 className="w-3 h-3" />
					) : (
						<CheckCircle className="w-3 h-3" />
					)}
					{product.isDeleted ? "Deleted" : "Active"}
				</span>

				{product.gender && (
					<span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
						{product.gender}
					</span>
				)}
			</div>

			<div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
				<div className="flex items-center gap-2">
					<Package className="w-4 h-4 text-slate-400" />
					<span className="truncate">
						Category:
						<span className="font-medium">{product.category?.name ?? "—"}</span>
					</span>
				</div>

				<div className="flex items-center gap-2">
					<Package className="w-4 h-4 text-slate-400" />
					<span className="truncate">
						Brand:
						<span className="font-medium">{product.brand?.name ?? "—"}</span>
					</span>
				</div>

				<div className="flex items-center gap-2">
					<Calendar className="w-4 h-4 text-slate-400" />
					<span className="truncate">
						Created: {formatDate(new Date(product.createdAt).toLocaleString())}
					</span>
				</div>

				<div className="flex items-center gap-2">
					<Calendar className="w-4 h-4 text-slate-400" />
					<span className="truncate">
						Updated: {formatDate(new Date(product.updatedAt).toLocaleString())}
					</span>
				</div>
			</div>

			{product.tags.length > 0 && (
				<div className="mt-3 flex flex-wrap gap-1">
					{product.tags.map((tag) => (
						<span
							key={tag}
							className="text-xs text-blue-600 hover:text-blue-700"
						>
							#{tag}
						</span>
					))}
				</div>
			)}

			<div className="mt-4 pt-3 border-t border-gray-100 text-xs text-slate-500 flex items-center justify-between">
				<span>ID: {product.id}</span>
			</div>
		</article>
	);
};
