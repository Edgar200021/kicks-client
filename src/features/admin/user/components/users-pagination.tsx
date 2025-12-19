import { useNavigate } from "@tanstack/react-router";
import { Pagination } from "@/common/components/ui/pagination/pagination";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { paths } from "@/config/paths";
import {
	userActions,
	userSelectors,
} from "@/features/admin/user/store/user-slice";

interface Props {
	className?: string;
	totalPages: number;
}

export const UsersPagination = ({ className, totalPages }: Props) => {
	const navigate = useNavigate({
		from: paths.admin.users,
	});
	const dispatch = useAppDispatch();
	const page = useAppSelector(userSelectors.getFiltersPage);

	return (
		<Pagination
			className={className}
			currentPage={page ?? 1}
			totalPages={totalPages}
			onPageChange={(page) => {
				navigate({
					to: paths.admin.users,
					search: (prev) => ({ ...prev, page }),
				});
				dispatch(
					userActions.setFilters({ type: "regular", filters: { page } }),
				);
				dispatch(userActions.setFilters({ type: "lazy", filters: { page } }));
			}}
		></Pagination>
	);
};