import { EllipsisVertical, PencilIcon, TrashIcon } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu/dropdown-menu";
import type { Category } from "@/common/types/api";
import { cn } from "@/common/utils/cn";
import { CreateUpdateCategoryForm } from "@/features/admin/category/components/create-update-category-form.tsx";
import { useRemoveCategory } from "../hooks/use-remove-category";

interface Props {
	className?: string;
	categoryId: Category["id"];
	categoryName: Category["name"];
}

export const CategoryActions = ({
	className,
	categoryId,
	categoryName,
}: Props) => {
	const { removeCategory, isLoading } = useRemoveCategory(categoryId);

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger className={cn("p-1 cursor-pointer", className)}>
				<EllipsisVertical size={18} />
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align="end"
				className="w-40 p-1 bg-white rounded-xl shadow-lg border border-slate-200"
			>
				<CreateUpdateCategoryForm
					updateData={{ id: categoryId, name: categoryName }}
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
					onClick={removeCategory}
					className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-slate-100 cursor-pointer"
				>
					<TrashIcon size={16} className={"text-red-600"} />
					<span>Remove</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
