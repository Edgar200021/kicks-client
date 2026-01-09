import {useEffect} from "react";
import {toast} from "sonner";
import {useHandleError} from "@/common/hooks/use-handler-error.ts";
import type {AdminProduct} from "@/common/types/api.ts";
import {useLazyGetAdminProductQuery} from "@/features/admin/product/api/admin-product-api.ts";
import {
	getAdminProductInputSchema
} from "@/features/admin/product/schemas/get-admin-product.schema.ts";
import {adminProductSelectors} from "@/features/admin/product/store/admin-product-slice.ts";
import {useAppSelector} from "@/store/store.ts";

export const useGetAdminProduct = (id: AdminProduct["id"]) => {
	const product = useAppSelector(state => adminProductSelectors.getSelectedProduct(state, "product")) as AdminProduct | undefined;
	const [getProduct, {data, isLoading, error}] =
		useLazyGetAdminProductQuery();
	useHandleError(error);

	useEffect(() => {
		if (product) return;

		(async () => {
			const result = await getAdminProductInputSchema.safeParseAsync({id});
			if (!result.success) {
				toast.error("Invalid product id");
				return;
			}
			await getProduct(result.data).unwrap();
		})();
	}, [id, product]);

	return {
		isLoading,
		error,
		product: product ?? data?.data,
	};
};