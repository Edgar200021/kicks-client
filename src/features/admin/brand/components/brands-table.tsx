import type { Brand } from "@/common/types/api";
import { cn } from "@/common/utils/cn";
import { formatDate } from "@/common/utils/date";
import { BrandsActions } from "./brands-actions.tsx";

const headers = ["ID", "Name", "Created At", "Updated At", "Actions"];

interface Props {
	className?: string;
	brands: Brand[];
}

export const BrandsTable = ({ brands, className }: Props) => {
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
					{brands.map(({ id, name, createdAt, updatedAt }) => (
						<tr
							key={id}
							className="[&>td]:text-start [&>td]:text-sm [&>td]:border-b-primary-150/20 [&>td]:border-b [&>td]:py-4 [&>td]:break-all [&>td]:wrap-break-word font-secondary font-semibold"
						>
							<td headers="ID" className="pr-4">
								{id}
							</td>

							<td headers="Name" className="pr-4">
								{name}
							</td>

							<td headers="Created At" className="pr-4">
								{formatDate(new Date(createdAt).toLocaleString())}
							</td>
							<td headers="Updated At" className="pr-4">
								{formatDate(new Date(updatedAt).toLocaleString())}
							</td>
							<td>
								<BrandsActions brandId={id} brandName={name} className="ml-5" />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
