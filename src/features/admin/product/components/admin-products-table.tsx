import type { AdminProduct } from "@/common/types/api";
import { cn } from "@/common/utils/cn";
import { formatDate } from "@/common/utils/date";
import { AdminProductActions } from "./admin-product-actions.tsx";
import { CheckIcon, XIcon } from "lucide-react";

const headers = [
	"ID",
	"Title",
	"Description",
	"Gender",
	"Tags",
	"Deleted",
	"Category",
	"Brand",
	"Created At",
	"Updated At",
	"Actions",
];

interface Props {
	className?: string;
	products: AdminProduct[];
}

export const AdminProductsTable = ({ products, className }: Props) => {
	return (
		<div
			className={cn(
				"py-6 px-4 rounded-2xl bg-[#f8f8f8] max-w-full overflow-x-auto whitespace-nowrap",
				className,
			)}
		>
			<table className="w-full border-separate border-spacing-y-4">
				<thead>
					<tr>
						{headers.map((h) => (
							<th
								id={h}
								className="text-start font-semibold text-primary-150/80 pr-10 border-b-primary-150/20 border-b py-4"
								key={h}
							>
								{h}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr
							key={product.id}
							className="[&>td]:text-start [&>td]:text-sm [&>td]:border-b-primary-150/20 [&>td]:border-b [&>td]:py-4 [&>td]:break-all [&>td]:wrap-break-word font-secondary font-semibold"
						>
							<td headers="ID" className="pr-4">
								{product.id}
							</td>

							<td headers="Name" className="pr-4">
								{product.title}
							</td>

							<td headers="Description" className="pr-4">
								{product.description}
							</td>

							<td headers="Gender" className="pr-4">
								{product.gender}
							</td>

							<td headers="Tags" className="pr-4 max-w-60">
								<div className="flex flex-wrap gap-1 overflow-hidden">
									{product.tags.map((tag) => (
										<span
											key={tag}
											className="text-xs text-blue-600 hover:text-blue-700 cursor-default"
										>
											#{tag}
										</span>
									))}
								</div>
							</td>

							<td headers="Deleted" className="pr-4">
								{product.isDeleted ? (
									<CheckIcon size={20} className="stroke-green-500 ml-5" />
								) : (
									<XIcon size={20} className="stroke-red-500 ml-5" />
								)}
							</td>

							<td headers="Category" className="pr-4">
								{product.category?.name || "Empty"}
							</td>

							<td headers="Brand" className="pr-4">
								{product.brand?.name || "Empty"}
							</td>

							<td headers="Created At" className="pr-4">
								{formatDate(new Date(product.createdAt).toLocaleString())}
							</td>
							<td headers="Updated At" className="pr-4">
								{formatDate(new Date(product.updatedAt).toLocaleString())}
							</td>
							<td>
								<AdminProductActions adminProduct={product} className="ml-5" />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
