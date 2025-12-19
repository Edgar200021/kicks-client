import { useEffect } from "react";
import { Spinner } from "@/common/components/ui/spinner/spinner";
import { useHandleError } from "@/common/hooks/use-handler-error";
import { useAppSelector } from "@/store/store";
import { cn } from "@/common/utils/cn";

import { AdminProductsTable } from "./admin-products-table.tsx";
import { toast } from "sonner";
import z from "zod";
import {
	useGetAdminProductFiltersQuery,
	useLazyGetAllAdminProductsQuery,
} from "@/features/admin/product/api/admin-product-api.ts";
import { getAllAdminProductsInputSchema } from "@/features/admin/product/schemas/get-all-admin-products.schema.ts";
import { adminProductSelectors } from "@/features/admin/product/store/admin-product-slice.ts";
import { AdminProductsPagination } from "@/features/admin/product/components/admin-products-pagination.tsx";
import { AdminProduct } from "@/features/admin/product/components/admin-product.tsx";

interface Props {
	className?: string;
}

export const AdminProductsWrapper = ({ className }: Props) => {
	const filters = useAppSelector(adminProductSelectors.getFilters);
	const [getAllAdminProducts, { data, isLoading, isFetching, error }] =
		useLazyGetAllAdminProductsQuery();
	const { error: filtersError } = useGetAdminProductFiltersQuery(null);

	useHandleError(error || filtersError);

	useEffect(() => {
		(async () => {
			const { error, data } =
				await getAllAdminProductsInputSchema.safeParseAsync(filters);

			if (error) {
				toast.error("Validation error", {
					description: z.prettifyError(error),
				});
				return;
			}

			getAllAdminProducts(data);
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
			<AdminProductsTable
				products={data?.data.products ?? []}
				className="mb-6 hidden min-[2000px]:block"
			/>

			{!!data?.data.products.length && (
				<ul className="min-[2000px]:hidden grid grid-cols-1 min-[800px]:grid-cols-2 gap-6 mb-6 content-start">
					{data.data.products.map((p) => (
						<li key={p.id} className="flex h-full">
							<AdminProduct product={p} />
						</li>
					))}
				</ul>
			)}

			{data?.data && (
				<AdminProductsPagination
					className="max-[2000px]:justify-center"
					totalPages={data.data.pageCount}
				/>
			)}
		</div>
	);
};