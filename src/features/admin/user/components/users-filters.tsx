import { SelectValue } from "@radix-ui/react-select";
import { useNavigate } from "@tanstack/react-router";
import { ChevronDownIcon, FilterIcon } from "lucide-react";
import { useEffect, useId, useState } from "react";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@/common/components/ui/select/select";
import { useSynchronizeSearchParams } from "@/common/hooks/use-synchronize-search-params";
import { useAppSelector } from "@/common/store/store";
import { UserGender } from "@/common/types/api";
import { cn } from "@/common/utils/cn";
import { paths } from "@/config/paths";
import type { GetAllUsersInput } from "@/features/admin/user/schemas/get-all-users.schema";
import {
	userActions,
	userSelectors,
} from "@/features/admin/user/store/user-slice";
import { GET_ALL_USERS_MAX_LIMIT } from "../const/zod";

interface Props {
	className?: string;
	initialFilters?: GetAllUsersInput;
}

export const UsersFilters = ({ className, initialFilters }: Props) => {
	const filters = useAppSelector(userSelectors.getFilters);
	const lazyFilters = useAppSelector(userSelectors.getLazyFilters);

	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const isEqual = JSON.stringify(filters) === JSON.stringify(lazyFilters);

	useEffect(() => {
		if (!initialFilters) return;
		dispatch(
			userActions.setFilters({
				type: "regular",
				filters: initialFilters,
			}),
		);

		dispatch(
			userActions.setFilters({
				type: "lazy",
				filters: initialFilters,
			}),
		);
	}, []);

	const handleApply = () => {
		if (isEqual) return;

		dispatch(
			userActions.setFilters({
				type: "regular",
				filters: { ...lazyFilters, page: undefined },
			}),
		);

		navigate({
			to: paths.admin.users,
			search: (prev) => ({ ...prev, ...lazyFilters, page: undefined }),
		});

		setOpen(false);
	};

	return (
		<div className={cn("flex items-center justify-end", className)}>
			<Drawer direction="right" open={open} onOpenChange={setOpen}>
				<DrawerTrigger className="cursor-pointer" title="Filters">
					<FilterIcon className="text-primary-150" />
				</DrawerTrigger>

				<DrawerContent className="p-6 space-y-6">
					<DrawerHeader>
						<DrawerTitle className="text-xl font-semibold">
							User Filters
						</DrawerTitle>
					</DrawerHeader>

					<div className="grid gap-6">
						<div className="grid gap-2">
							<Label htmlFor="search">Search</Label>
							<Input
								id={"search"}
								placeholder="Search by name or email"
								value={lazyFilters.search ?? ""}
								onChange={(e) =>
									dispatch(
										userActions.setFilters({
											type: "lazy",
											filters: { search: e.target.value },
										}),
									)
								}
							/>
						</div>

						<div className="grid gap-2">
							<Label>Verified</Label>
							<Select
								value={
									lazyFilters.isVerified === undefined
										? "all"
										: String(lazyFilters.isVerified)
								}
								onValueChange={(value) =>
									dispatch(
										userActions.setFilters({
											type: "lazy",
											filters: {
												isVerified:
													value === "all" ? undefined : value === "true",
											},
										}),
									)
								}
							>
								<SelectTrigger className="cursor-pointer">
									<SelectValue placeholder="Verified" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All</SelectItem>
									<SelectItem value="true">Verified</SelectItem>
									<SelectItem value="false">Not verified</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="grid gap-2">
							<Label>Banned</Label>
							<Select
								value={
									lazyFilters.isBanned === undefined
										? "all"
										: String(lazyFilters.isBanned)
								}
								onValueChange={(value) =>
									dispatch(
										userActions.setFilters({
											type: "lazy",
											filters: {
												isBanned:
													value === "all" ? undefined : value === "true",
											},
										}),
									)
								}
							>
								<SelectTrigger className="cursor-pointer">
									<SelectValue placeholder="Banned" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All</SelectItem>
									<SelectItem value="true">Banned</SelectItem>
									<SelectItem value="false">Not banned</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="grid gap-2">
							<Label>Gender</Label>
							<Select
								value={
									lazyFilters.gender === undefined
										? "all"
										: String(lazyFilters.gender)
								}
								onValueChange={(value) =>
									dispatch(
										userActions.setFilters({
											type: "lazy",
											filters: {
												gender:
													value === "all" ? undefined : (value as UserGender),
											},
										}),
									)
								}
							>
								<SelectTrigger className="cursor-pointer">
									<SelectValue placeholder="Gender" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All</SelectItem>
									{Object.values(UserGender).map((g) => {
										return (
											<SelectItem key={g} value={g}>
												{g.slice(0, 1).toUpperCase()}
												{g.slice(1)}
											</SelectItem>
										);
									})}
								</SelectContent>
							</Select>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="startDate">Start date</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										id="startDate"
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
									{/* TODO: */}
									<Calendar
										mode="single"
										disabled={(date) =>
											lazyFilters.endDate ? date >= lazyFilters.endDate : false
										}
										selected={lazyFilters.startDate}
										captionLayout="dropdown"
										onSelect={(date) => {
											dispatch(
												userActions.setFilters({
													type: "lazy",
													filters: {
														startDate: date,
													},
												}),
											);
										}}
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
										onSelect={(date) => {
											dispatch(
												userActions.setFilters({
													type: "lazy",
													filters: {
														endDate: date,
													},
												}),
											);
										}}
									/>
								</PopoverContent>
							</Popover>
						</div>

						<div className="grid gap-2">
							<Label>Rows per page</Label>
							<Select
								value={lazyFilters.limit?.toString()}
								onValueChange={(value) =>
									dispatch(
										userActions.setFilters({
											type: "lazy",
											filters: {
												limit: Number(value),
											},
										}),
									)
								}
							>
								<SelectTrigger className="cursor-pointer">
									<SelectValue placeholder="Rows per page" />
								</SelectTrigger>
								<SelectContent>
									{Array.from(
										{
											length: Math.floor(GET_ALL_USERS_MAX_LIMIT / 25),
										},
										(_, i) => (i + 1) * 25,
									).map((v) => (
										<SelectItem key={v} value={String(v)}>
											{v}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					<DrawerFooter>
						<Button disabled={isEqual} onClick={handleApply}>
							Apply
						</Button>
						<DrawerClose asChild>
							<Button variant="outline">Close</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</div>
	);
};
