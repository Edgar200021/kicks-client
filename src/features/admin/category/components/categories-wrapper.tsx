import { useEffect } from "react";
import { toast } from "sonner";
import z from "zod";
import { Spinner } from "@/common/components/ui/spinner/spinner";
import { useHandleError } from "@/common/hooks/use-handler-error";
import { useAppSelector } from "@/common/store/store";
import { cn } from "@/common/utils/cn";
import { useLazyGetAllCategoriesQuery } from "../api/admin-category-api";
import { getAllCategoriesInputSchema } from "../schemas/get-all-categories.schema";
import { categorySelectors } from "../store/category-slice";
import { CategoriesTable } from "./categories-table";

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
			{/*{!!data?.data.users.length && (
				<ul className="min-[1700px]:hidden grid grid-cols-1 min-[800px]:grid-cols-2 justify-items-center gap-6 mb-6">
					{data.data.users.map((u) => (
						<li key={u.id}>
							<AdminUser user={u} />
						</li>
					))}
				</ul>
			)}*/}
		</div>
	);
};
