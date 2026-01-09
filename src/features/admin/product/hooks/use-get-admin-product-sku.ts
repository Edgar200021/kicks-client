import {useEffect} from "react";
import {toast} from "sonner";
import {useHandleError} from "@/common/hooks/use-handler-error.ts";
import type {AdminProductSku} from "@/common/types/api.ts";
import {useLazyGetAdminProductSkuQuery} from "@/features/admin/product/api/admin-product-api.ts";
import {adminProductSelectors} from "@/features/admin/product/store/admin-product-slice.ts";
import {useAppSelector} from "@/store/store.ts";
import {
	getAdminProductSkuInputSchema
} from "@/features/admin/product/schemas/get-admin-product-sku.schema.ts";

export const useGetAdminProductSku = (id: AdminProductSku["id"]) => {
	const productSku = useAppSelector(state => adminProductSelectors.getSelectedProduct(state, "sku")) as AdminProductSku | undefined;
	const [getProductSku, {data, isLoading, error}] =
		useLazyGetAdminProductSkuQuery();
	useHandleError(error);

	useEffect(() => {
		if (productSku) return;

		(async () => {
			const result = await getAdminProductSkuInputSchema.safeParseAsync({id});
			if (!result.success) {
				toast.error("Invalid product id");
				return;
			}
			await getProductSku(result.data).unwrap();
		})();
	}, [id, productSku]);

	return {
		isLoading,
		error,
		productSku: productSku ?? data?.data,
	};
};