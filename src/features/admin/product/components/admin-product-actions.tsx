import { useNavigate } from "@tanstack/react-router";
import {
	EllipsisVertical,
	PencilIcon,
	PlusCircle,
	TrashIcon,
} from "lucide-react";
import { toast } from "sonner";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu/dropdown-menu";
import type { AdminProduct } from "@/common/types/api";
import { cn } from "@/common/utils/cn";
import { paths } from "@/config/paths.ts";
import { CreateUpdateProductForm } from "@/features/admin/product/components/create-update-product-form.tsx";
import { useRemoveProduct } from "@/features/admin/product/hooks/use-remove-product.ts";
import { adminProductActions } from "@/features/admin/product/store/admin-product-slice.ts";
import { useAppDispatch } from "@/store/store.ts";

interface Props {
	className?: string;
	adminProduct: AdminProduct;
}

export const AdminProductActions = ({ className, adminProduct }: Props) => {
	const { removeProduct, isLoading } = useRemoveProduct(adminProduct.id);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleCreateVariant = () => {
		dispatch(
			adminProductActions.setSelectedProduct({
				target: "product",
				data: adminProduct,
			}),
		);
		navigate({
			to: paths.admin.products.detail,
			params: { id: adminProduct.id },
		});
	};

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
					onClick={handleCreateVariant}
					className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-slate-100 cursor-pointer"
				>
					<PlusCircle size={16} className={"text-slate-700"} />
					<span>Create variant</span>
				</DropdownMenuItem>

				<CreateUpdateProductForm
					type={{ action: "update", initialData: adminProduct }}
					onSuccess={() => toast.success("Product successfully updated")}
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
					onClick={removeProduct}
					className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-slate-100 cursor-pointer"
				>
					<TrashIcon size={16} className={"text-red-600"} />
					<span>Remove</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
