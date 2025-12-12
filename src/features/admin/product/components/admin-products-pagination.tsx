import { useNavigate } from "@tanstack/react-router";
import { Pagination } from "@/common/components/ui/pagination/pagination";
import { useAppDispatch, useAppSelector } from "@/common/store/store";
import { paths } from "@/config/paths";
import {
	adminProductActions,
	adminProductSelectors,
} from "@/features/admin/product/store/admin-product-slice.ts";

interface Props {
	className?: string;
	totalPages: number;
}

export const AdminProductsPagination = ({ className, totalPages }: Props) => {
	const navigate = useNavigate({
		from: paths.admin.products.root,
	});
	const dispatch = useAppDispatch();
	const page = useAppSelector(adminProductSelectors.getFiltersPage);

	return (
		<Pagination
			className={className}
			currentPage={page ?? 1}
			totalPages={totalPages}
			onPageChange={(page) => {
				navigate({
					to: paths.admin.products.root,
					search: (prev) => ({ ...prev, page }),
				});
				dispatch(
					adminProductActions.setFilters({
						type: "regular",
						filters: { page },
					}),
				);
				dispatch(
					adminProductActions.setFilters({ type: "lazy", filters: { page } }),
				);
			}}
		></Pagination>
	);
};
