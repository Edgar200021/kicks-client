import { useEffect } from "react";
import { toast } from "sonner";
import z from "zod";
import { Spinner } from "@/common/components/ui/spinner/spinner";
import { useHandleError } from "@/common/hooks/use-handler-error";
import { cn } from "@/common/utils/cn";
import { useLazyGetAllAdminProductsSkuQuery } from "@/features/admin/product/api/admin-product-api.ts";
import { AdminProductSku } from "@/features/admin/product/components/admin-product-sku.tsx";
import { AdminProductsPagination } from "@/features/admin/product/components/admin-products-pagination.tsx";
import { getAllAdminProductsSkuInputSchema } from "@/features/admin/product/schemas/get-all-admin-products-sku.schema.ts";
import { adminProductSelectors } from "@/features/admin/product/store/admin-product-slice.ts";
import { useAppSelector } from "@/store/store";

interface Props {
	className?: string;
}

export const AdminProductsSkuList = ({ className }: Props) => {
	const filters = useAppSelector((state) =>
		adminProductSelectors.getFilters(state, "sku"),
	);
	const [getAllAdminProductsSku, { data, isLoading, isFetching, error }] =
		useLazyGetAllAdminProductsSkuQuery();

	useHandleError(error);

	useEffect(() => {
		(async () => {
			const { error, data } =
				await getAllAdminProductsSkuInputSchema.safeParseAsync(filters);

			if (error) {
				toast.error("Validation error", {
					description: z.prettifyError(error),
				});
				return;
			}

			getAllAdminProductsSku(data);
		})();
	}, [filters]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center pt-[450px]">
				<Spinner size="xl" />
			</div>
		);
	}

	return (
		<div
			className={cn(
				"",
				{
					"opacity-70": isFetching,
				},
				className,
			)}
		>
			{!!data?.data.productsSku.length && (
				<ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 mb-20 justify-items-center">
					{data.data.productsSku.map((p) => (
						<li key={p.id}>
							<AdminProductSku productSku={p} />
						</li>
					))}
				</ul>
			)}

			{data?.data && (
				<AdminProductsPagination
					className="max-[2000px]:justify-center"
					totalPages={data.data.pageCount}
					target="sku"
				/>
			)}
		</div>
	);
};
