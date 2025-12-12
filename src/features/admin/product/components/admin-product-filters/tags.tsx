import {
	MultiSelect,
	MultiSelectContent,
	MultiSelectGroup,
	MultiSelectItem,
	MultiSelectTrigger,
	MultiSelectValue,
} from "@/common/components/ui/multi-select/multi-select.tsx";
import { useAppDispatch, useAppSelector } from "@/common/store/store.ts";
import {
	adminProductActions,
	adminProductSelectors,
} from "@/features/admin/product/store/admin-product-slice.ts";

export const AdminProductFiltersTags = () => {
	const serverFilters = useAppSelector(
		adminProductSelectors.getFiltersFromServer,
	);
	const tags = useAppSelector(adminProductSelectors.getLazyFiltersTags);

	const dispatch = useAppDispatch();

	if (!!serverFilters.categories.length) return null;

	return (
		<MultiSelect
			defaultValues={tags}
			values={tags}
			onValuesChange={(val) =>
				dispatch(
					adminProductActions.setFilters({
						type: "lazy",
						filters: { tags: val.length === 0 ? undefined : val },
					}),
				)
			}
		>
			<MultiSelectTrigger className="w-full max-w-[400px]">
				<MultiSelectValue placeholder="Select tags" />
			</MultiSelectTrigger>
			<MultiSelectContent>
				<MultiSelectGroup className="cursor-pointer">
					{serverFilters.tags.map((val) => (
						<MultiSelectItem className="cursor-pointer" key={val} value={val}>
							{val}
						</MultiSelectItem>
					))}
				</MultiSelectGroup>
			</MultiSelectContent>
		</MultiSelect>
	);
};
