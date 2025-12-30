import {
	MultiSelect,
	MultiSelectContent,
	MultiSelectGroup,
	MultiSelectItem,
	MultiSelectTrigger,
	MultiSelectValue,
} from "@/common/components/ui/multi-select/multi-select.tsx";
import {
	adminProductActions,
	adminProductSelectors,
	type ProductFiltersTarget,
} from "@/features/admin/product/store/admin-product-slice.ts";
import { useAppDispatch, useAppSelector } from "@/store/store.ts";

interface Props {
	target: ProductFiltersTarget;
}

export const AdminProductFiltersTags = ({ target }: Props) => {
	const serverFilters = useAppSelector(
		adminProductSelectors.getFiltersFromServer,
	);
	const tags = useAppSelector((state) =>
		adminProductSelectors.getLazyFiltersTags(state, target),
	);

	const dispatch = useAppDispatch();

	if (!serverFilters || !serverFilters.tags.length) return null;

	return (
		<MultiSelect
			defaultValues={tags}
			values={tags}
			onValuesChange={(val) =>
				dispatch(
					adminProductActions.setFilters({
						type: "lazy",
						filters: {
							target,
							data: {
								tags: val.length === 0 ? undefined : val,
							},
						},
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
