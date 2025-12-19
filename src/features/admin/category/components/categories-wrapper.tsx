import { useEffect } from "react";
import { toast } from "sonner";
import z from "zod";
import { Spinner } from "@/common/components/ui/spinner/spinner";
import { useHandleError } from "@/common/hooks/use-handler-error";
import { useAppSelector } from "@/store/store";
import { cn } from "@/common/utils/cn";
import { useLazyGetAllCategoriesQuery } from "../api/admin-category-api";
import { getAllCategoriesInputSchema } from "../schemas/get-all-categories.schema";
import { categorySelectors } from "../store/category-slice";
import { CategoriesTable } from "./categories-table";
import { AdminCategory } from "@/features/admin/category/components/category.tsx";

interface Props {
	className?: string;
}

export const CategoriesWrapper = ({ className }: Props) => {
	const filters = useAppSelector(categorySelectors.getFilters);
	const [getAllCategories, { data, isLoading, isFetching, error }] =
		useLazyGetAllCategoriesQuery();

	useHandleError(error);

	useEffect(() => {
		(async () => {
			const { error, data } =
				await getAllCategoriesInputSchema.safeParseAsync(filters);

			if (error) {
				toast.error("Validation error", {
					description: z.prettifyError(error),
				});
				return;
			}

			getAllCategories(data);
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
			<CategoriesTable
				categories={data?.data ?? []}
				className="mb-6 hidden min-[800px]:block"
			/>
			{!!data?.data.length && (
				<ul className="min-[800px]:hidden grid grid-cols-1  justify-items-center gap-6 mb-6">
					{data.data.map((c) => (
						<li key={c.id}>
							<AdminCategory category={c} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
};