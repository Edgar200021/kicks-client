import {toast} from "sonner";
import {useHandleError} from "@/common/hooks/use-handler-error";
import type {AdminProduct} from "@/common/types/api";
import {validateSchema} from "@/common/utils/schema";
import {useRemoveProductMutation} from "@/features/admin/product/api/admin-product-api.ts";
import {removeProductInputSchema} from "@/features/admin/product/schemas/remove-product.schema.ts";

export const useRemoveProduct = (productId: AdminProduct["id"]) => {
	const [removeProduct, {isLoading, error}] = useRemoveProductMutation();
	const {handleError} = useHandleError(error);

	const handleRemove = () => {
		toast(`Are you sure you want to remove the product with ID ${productId}?`, {
			action: {
				label: "Remove",
				onClick: async () => {
					const result = await validateSchema(removeProductInputSchema, {
						id: productId,
					});

					if (!result.success) {
						return;
					}

					toast.promise(removeProduct(result.data).unwrap(), {
						loading: "Loading...",
						success: () => {
							return `Product with id ${productId} successfully deleted`;
						},
						error: (err) => {
							handleError(err);
							return "";
						},
					});
				},
			},
			className: "md:w-[550px]!",
		});
	};

	return {
		removeProduct: handleRemove,
		isLoading,
		error,
	};
};