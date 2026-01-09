import {toast} from "sonner";
import {useHandleError} from "@/common/hooks/use-handler-error";
import type {AdminProductSku} from "@/common/types/api";
import {validateSchema} from "@/common/utils/schema";
import {useRemoveProductSkuMutation} from "@/features/admin/product/api/admin-product-api.ts";
import {
	removeProductSkuInputSchema
} from "@/features/admin/product/schemas/remove-product-sku.schema.ts";

export const useRemoveProductSku = (productSkuId: AdminProductSku["id"]) => {
	const [removeProductSku, {isLoading, error}] = useRemoveProductSkuMutation();
	const {handleError} = useHandleError(error);

	const handleRemove = () => {
		toast(`Are you sure you want to remove the product variant with ID ${productSkuId}?`, {
			action: {
				label: "Remove",
				onClick: async () => {
					const result = await validateSchema(removeProductSkuInputSchema, {
						id: productSkuId,
					});

					if (!result.success) {
						return;
					}

					toast.promise(removeProductSku(result.data).unwrap(), {
						loading: "Loading...",
						success: () => {
							return `Product variant with id ${productSkuId} successfully deleted`;
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
		removeProductSku: handleRemove,
		isLoading,
		error,
	};
};