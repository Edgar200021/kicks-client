import {EllipsisVertical, TrashIcon} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu/dropdown-menu";
import type {AdminProductSku} from "@/common/types/api";
import {cn} from "@/common/utils/cn";
import {useRemoveProductSku} from "@/features/admin/product/hooks/use-remove-product-sku.ts";

interface Props {
	className?: string;
	adminProductSku: AdminProductSku;
}

export const AdminProductSkuActions = ({
																				 className,
																				 adminProductSku,
																			 }: Props) => {
	const {removeProductSku, isLoading} = useRemoveProductSku(adminProductSku.id);

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger className={cn("p-1 cursor-pointer", className)}>
				<EllipsisVertical size={18} />
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align="end"
				className="w-40 p-1 bg-white rounded-xl shadow-lg border border-slate-200"
			>
				<DropdownMenuItem
					disabled={isLoading}
					onClick={removeProductSku}
					className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-slate-100 cursor-pointer"
				>
					<TrashIcon
						size={16}
						className={"text-red-600"}
					/>
					<span>Remove</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};