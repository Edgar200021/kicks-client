import { useEffect } from "react";
import { Spinner } from "@/common/components/ui/spinner/spinner";
import { useHandleError } from "@/common/hooks/use-handler-error";
import { useAppSelector } from "@/store/store";
import { cn } from "@/common/utils/cn";
import { useLazyGetAllBrandsQuery } from "../api/admin-brand-api.ts";

import { brandSelectors } from "../store/brand-slice.ts";
import { BrandsTable } from "./brands-table.tsx";
import { getAllBrandsInputSchema } from "@/features/admin/brand/schemas/get-all-brands.schema.ts";
import { toast } from "sonner";
import z from "zod";
import { AdminBrand } from "@/features/admin/brand/components/brand.tsx";

interface Props {
	className?: string;
}

export const BrandsWrapper = ({ className }: Props) => {
	const filters = useAppSelector(brandSelectors.getFilters);
	const [getAllBrands, { data, isLoading, isFetching, error }] =
		useLazyGetAllBrandsQuery();

	useHandleError(error);

	useEffect(() => {
		(async () => {
			const { error, data } =
				await getAllBrandsInputSchema.safeParseAsync(filters);

			if (error) {
				toast.error("Validation error", {
					description: z.prettifyError(error),
				});
				return;
			}

			getAllBrands(data);
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
			<BrandsTable
				brands={data?.data ?? []}
				className="mb-6 hidden min-[800px]:block"
			/>

			{!!data?.data.length && (
				<ul className="min-[800px]:hidden grid grid-cols-1  justify-items-center gap-6 mb-6">
					{data.data.map((c) => (
						<li key={c.id}>
							<AdminBrand brand={c} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
};