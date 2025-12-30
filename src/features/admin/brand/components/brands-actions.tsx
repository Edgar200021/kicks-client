import { EllipsisVertical, PencilIcon, TrashIcon } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu/dropdown-menu";
import type { Brand } from "@/common/types/api";
import { cn } from "@/common/utils/cn";
import { CreateUpdateBrandForm } from "@/features/admin/brand/components/create-update-brand-form.tsx";
import { useRemoveBrand } from "../hooks/use-remove-brand.ts";

interface Props {
	className?: string;
	brandId: Brand["id"];
	brandName: Brand["name"];
}

export const BrandsActions = ({ className, brandId, brandName }: Props) => {
	const { removeBrand, isLoading } = useRemoveBrand(brandId);

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger className={cn("p-1 cursor-pointer", className)}>
				<EllipsisVertical size={18} />
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align="end"
				className="w-40 p-1 bg-white rounded-xl shadow-lg border border-slate-200"
			>
				<CreateUpdateBrandForm
					updateData={{ id: brandId, name: brandName }}
					renderTrigger={(setOpen) => (
						<DropdownMenuItem
							onSelect={(e) => e.preventDefault()}
							disabled={isLoading}
							onClick={() => setOpen((prev) => !prev)}
							className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-slate-100 cursor-pointer"
						>
							<PencilIcon size={16} className={"text-primary"} />
							<span>Update</span>
						</DropdownMenuItem>
					)}
				/>

				<DropdownMenuItem
					disabled={isLoading}
					onClick={removeBrand}
					className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-slate-100 cursor-pointer"
				>
					<TrashIcon size={16} className={"text-red-600"} />
					<span>Remove</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
