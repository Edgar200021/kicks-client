import { useNavigate } from "@tanstack/react-router";
import { ChevronDownIcon, FilterIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/common/components/ui/button/button";
import { Calendar } from "@/common/components/ui/calendar/calendar";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/common/components/ui/drawer/drawer";
import { Input } from "@/common/components/ui/input/input";
import { Label } from "@/common/components/ui/label/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/common/components/ui/popover/popover";

import { cn } from "@/common/utils/cn";
import type { GetAllCategoriesInput } from "../schemas/get-all-categories.schema";
import { useSetAdminFilters } from "@/features/admin/hooks/use-set-admin-filters.ts";

interface Props {
	className?: string;
	initialFilters?: GetAllCategoriesInput;
}

export const CategoriesFilters = ({ className, initialFilters }: Props) => {
	const {
		open,
		setOpen,
		lazyFilters,
		handleApply,
		handleReset,
		isEqual,
		setFilters,
	} = useSetAdminFilters("categories", initialFilters);

	return (
		<div className={cn("flex items-center justify-end", className)}>
			<Drawer direction="right" open={open} onOpenChange={setOpen}>
				<DrawerTrigger className="cursor-pointer" title="Filters">
					<FilterIcon className="text-primary-150" />
				</DrawerTrigger>

				<DrawerContent className="p-6 space-y-6">
					<DrawerHeader>
						<DrawerTitle className="text-xl font-semibold">
							Category Filters
						</DrawerTitle>
					</DrawerHeader>

					<div className="grid gap-6">
						<div className="grid gap-2">
							<Label htmlFor="search">Search</Label>
							<Input
								id="search"
								placeholder="Search by name"
								value={lazyFilters.search ?? ""}
								onChange={(e) => setFilters({ search: e.target.value })}
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="startDate">Start date</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className="w-fit justify-between font-normal p-2"
									>
										{lazyFilters.startDate
											? lazyFilters.startDate.toLocaleDateString()
											: "Select date"}
										<ChevronDownIcon />
									</Button>
								</PopoverTrigger>
								<PopoverContent
									className="w-auto overflow-hidden p-0"
									align="start"
								>
									<Calendar
										mode="single"
										disabled={(date) =>
											lazyFilters.endDate ? date >= lazyFilters.endDate : false
										}
										selected={lazyFilters.startDate}
										captionLayout="dropdown"
										onSelect={(date) => setFilters({ startDate: date })}
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
										{lazyFilters.endDate
											? lazyFilters.endDate.toLocaleDateString()
											: "Select date"}
										<ChevronDownIcon />
									</Button>
								</PopoverTrigger>
								<PopoverContent
									className="w-auto overflow-hidden p-0"
									align="start"
								>
									<Calendar
										disabled={(date) =>
											lazyFilters.startDate
												? date <= lazyFilters.startDate
												: false
										}
										mode="single"
										selected={lazyFilters.endDate}
										captionLayout="dropdown"
										onSelect={(date) => setFilters({ endDate: date })}
									/>
								</PopoverContent>
							</Popover>
						</div>
					</div>

					<DrawerFooter>
						<div className="grid grid-cols-2 gap-x-4">
							<Button disabled={isEqual} onClick={handleApply}>
								Apply
							</Button>
							<Button
								disabled={Object.keys(lazyFilters).length === 0}
								onClick={handleReset}
							>
								Reset
							</Button>
						</div>
						<DrawerClose asChild>
							<Button variant="outline">Close</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</div>
	);
};
