import { useNavigate } from "@tanstack/react-router";
import { Pagination } from "@/common/components/ui/pagination/pagination";
import { paths } from "@/config/paths";
import {
	adminProductActions,
	adminProductSelectors,
	type ProductFiltersTarget,
} from "@/features/admin/product/store/admin-product-slice.ts";
import { useAppDispatch, useAppSelector } from "@/store/store";

interface Props {
	className?: string;
	totalPages: number;
	target: ProductFiltersTarget;
}

export const AdminProductsPagination = ({
	className,
	totalPages,
	target,
}: Props) => {
	const navigate = useNavigate({
		from:
			target === "product"
				? paths.admin.products.root
				: paths.admin.products.sku,
	});
	const dispatch = useAppDispatch();
	const page = useAppSelector((state) =>
		adminProductSelectors.getFiltersPage(state, target),
	);

	return (
		<Pagination
			className={className}
			currentPage={page ?? 1}
			totalPages={totalPages}
			onPageChange={(page) => {
				navigate({
					to:
						target === "product"
							? paths.admin.products.root
							: paths.admin.products.sku,
					search: (prev) => ({ ...prev, page }),
				});
				dispatch(
					adminProductActions.setFilters({
						type: "regular",
						filters: {
							target,
							data: {
								page,
							},
						},
					}),
				);
				dispatch(
					adminProductActions.setFilters({
						type: "lazy",
						filters: { target, data: { page } },
					}),
				);
			}}
		></Pagination>
	);
};
