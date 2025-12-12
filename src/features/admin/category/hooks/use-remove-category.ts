import { toast } from "sonner";
import { useHandleError } from "@/common/hooks/use-handler-error";
import type { Category } from "@/common/types/api";
import { validateSchema } from "@/common/utils/schema";
import { useRemoveCategoryMutation } from "../api/admin-category-api";
import { removeCategoryInputSchema } from "../schemas/remove-category.schema";

export const useRemoveCategory = (categoryId: Category["id"]) => {
	const [removeCategory, { isLoading, error }] = useRemoveCategoryMutation();
	const { handleError } = useHandleError(error);

	const handleRemove = () => {
		toast(
			`Are you sure you want to remove the category with ID ${categoryId}?`,
			{
				action: {
					label: "Remove",
					onClick: async () => {
						const result = await validateSchema(removeCategoryInputSchema, {
							id: categoryId,
						});

						if (!result.success) {
							return;
						}

						toast.promise(removeCategory(result.data).unwrap(), {
							loading: "Loading...",
							success: () => {
								return `Category with id ${categoryId} successfully deleted`;
							},
							error: (err) => {
								handleError(err);
								return "";
							},
						});
					},
				},
				className: "md:w-[550px]!",
			},
		);
	};

	return {
		removeCategory: handleRemove,
		isLoading,
		error,
	};
};
