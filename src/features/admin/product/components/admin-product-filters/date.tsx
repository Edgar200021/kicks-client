import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/common/components/ui/button/button.tsx";
import { Calendar } from "@/common/components/ui/calendar/calendar.tsx";
import { Label } from "@/common/components/ui/label/label.tsx";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/common/components/ui/popover/popover.tsx";
import {
	adminProductActions,
	adminProductSelectors,
	type ProductFiltersTarget,
} from "@/features/admin/product/store/admin-product-slice.ts";
import { useAppDispatch, useAppSelector } from "@/store/store.ts";

interface Props {
	target: ProductFiltersTarget;
}

export const AdminProductFiltersDate = ({ target }: Props) => {
	const startDate = useAppSelector((state) =>
		adminProductSelectors.getLazyFiltersStartDate(state, target),
	);
	const endDate = useAppSelector((state) =>
		adminProductSelectors.getLazyFiltersEndDate(state, target),
	);

	const dispatch = useAppDispatch();

	return (
		<>
			<div className="grid gap-2">
				<Label htmlFor="startDate">Start date</Label>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className="w-fit justify-between font-normal p-2"
						>
							{startDate ? startDate.toLocaleDateString() : "Select date"}
							<ChevronDownIcon />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto overflow-hidden p-0" align="start">
						<Calendar
							mode="single"
							disabled={(date) => (endDate ? date >= endDate : false)}
							selected={startDate}
							captionLayout="dropdown"
							onSelect={(date) =>
								dispatch(
									adminProductActions.setFilters({
										type: "lazy",
										filters: {
											target,
											data: {
												startDate: date,
											},
										},
									}),
								)
							}
						/>
					</PopoverContent>
				</Popover>
			</div>

			<div className="grid gap-2">
				<Label htmlFor="endDate">End date</Label>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							id="endDate"
							className="w-fit justify-between font-normal p-2"
						>
							{endDate ? endDate.toLocaleDateString() : "Select date"}
							<ChevronDownIcon />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto overflow-hidden p-0" align="start">
						<Calendar
							disabled={(date) => (startDate ? date <= startDate : false)}
							mode="single"
							selected={endDate}
							captionLayout="dropdown"
							onSelect={(date) =>
								dispatch(
									adminProductActions.setFilters({
										type: "lazy",
										filters: {
											target,
											data: {
												endDate: date,
											},
										},
									}),
								)
							}
						/>
					</PopoverContent>
				</Popover>
			</div>
		</>
	);
};
