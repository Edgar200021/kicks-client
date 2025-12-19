import {zodResolver} from "@hookform/resolvers/zod";
import {type Control, Controller, useForm, useWatch} from "react-hook-form";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/common/components/ui/dialog/dialog";
import {FormInput} from "@/common/components/ui/form/form-input.tsx";
import {useHandleError} from "@/common/hooks/use-handler-error.ts";

import {Button} from "@/common/components/ui/button/button.tsx";

import {
	type CreateProductInput,
	createProductInputSchema
} from "@/features/admin/product/schemas/create-product.schema.ts";
import {
	useCreateProductMutation,
	useUpdateProductMutation,
} from "@/features/admin/product/api/admin-product-api.ts";
import {type Dispatch, type ReactNode, type SetStateAction, useState} from "react";
import {useAppSelector} from "@/store/store.ts";
import {adminProductSelectors} from "@/features/admin/product/store/admin-product-slice.ts";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/common/components/ui/select/select.tsx";
import {type AdminProduct, ProductGender} from "@/common/types/api.ts";
import {InputTag} from "@/common/components/ui/input/InputTag.tsx";
import {AppLink} from "@/common/components/ui/link/link.tsx";
import {paths} from "@/config/paths.ts";
import {
	type UpdateProductInput,
	updateProductInputSchema
} from "@/features/admin/product/schemas/update-product.schema.ts";
import {areArraysEqual} from "@/common/utils/arrays-equal.ts";


type ActionType = { action: "create" } | { "action": "update", initialData: AdminProduct }

interface Props {
	className?: string;
	type: ActionType
	renderTrigger: (
		setIsOpen: Dispatch<SetStateAction<boolean>>,
		isOpen: boolean,
	) => ReactNode;
	onSuccess?: () => void
}

export const CreateUpdateProductForm = ({className, renderTrigger, type, onSuccess}: Props) => {
	const {control, handleSubmit, reset} = useForm({
		resolver: zodResolver(
			type.action === "create" ? createProductInputSchema : updateProductInputSchema
		),
		defaultValues: type.action === "create" ? {
			title: "",
			description: "",
			tags: []
		} : {
			id: type.initialData.id,
			title: type.initialData.title,
			description: type.initialData.description,
			tags: type.initialData.tags,
			brandId: type.initialData.brand?.id,
			categoryId: type.initialData.category?.id,
			gender: type.initialData.gender
		}
	});

	const serverFilters = useAppSelector(adminProductSelectors.getFiltersFromServer)

	const [createProduct, {isLoading, error}] = useCreateProductMutation();
	const [updateProduct, {
		isLoading: updateLoading,
		error: updateError
	}] = useUpdateProductMutation();

	const [open, setOpen] = useState(false);

	const {apiValidationErrors} = useHandleError<(keyof CreateProductInput)[]>(error || updateError);

	const onSubmit = async (data: CreateProductInput | UpdateProductInput) => {

		if ("id" in data) {
			await updateProduct(data).unwrap()

		} else
			await createProduct(data).unwrap()


		onSuccess?.()

		if (!isUpdate) {
			reset({title: "", description: "", tags: []})
			setOpen(false);
		}
	};

	const isUnavailable = !serverFilters || !serverFilters.availableBrands.length || !serverFilters.availableCategories.length
	const isUpdate = type.action === "update"

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogTrigger asChild>
				{renderTrigger(setOpen, open)}
			</DialogTrigger>
			<DialogContent className="max-w-[600px]!">
				<DialogHeader className="mb-5">
					<DialogTitle className="text-center">
						{isUpdate ? "Update" : "Create"} product
					</DialogTitle>
				</DialogHeader>

				{isUnavailable && <div className="space-y-4 text-center">
					<p className="text-sm text-muted-foreground">
						You can’t {isUpdate ? "update" : "create"} a product yet
					</p>

					<p className="text-sm">
						Please create at least one&nbsp;
						<span className="font-medium">brand</span>&nbsp;and&nbsp;
						<span className="font-medium">category</span>
					</p>

					<div className="flex justify-center gap-6 text-sm">
						<AppLink
							to={paths.admin.brands}
							className="font-medium underline underline-offset-4 hover:text-primary"
						>
							Create brand
						</AppLink>

						<AppLink
							to={paths.admin.categories}
							className="font-medium underline underline-offset-4 hover:text-primary"
						>
							Create category
						</AppLink>
					</div>
				</div>}

				{!isUnavailable && <form
					className={className}
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="grid grid-cols-2 gap-x-10 gap-y-5 mb-5">
						<FormInput
							disabled={isLoading}
							control={control}
							name="title"
							required
							placeholder="Product title"
							error={apiValidationErrors.title}
						/>
						<FormInput
							disabled={isLoading}
							control={control}
							name="description"
							required
							placeholder="Product description"
							error={apiValidationErrors.description}
						/>

						<Controller
							control={control}
							name="gender"
							render={({field}) => <div className="flex flex-col gap-y-3">
								<Select
									value={String(field.value ?? "")}
									onValueChange={(value) =>
										field.onChange(
											value
										)
									}
								>
									<SelectTrigger className="cursor-pointer w-full py-6">
										<SelectValue placeholder="Select a gender" />
									</SelectTrigger>
									<SelectContent className="w-full">
										{Object.values(ProductGender).map((g) => {
											return (
												<SelectItem
													key={g}
													value={g}
												>
													{g.slice(0, 1).toUpperCase()}
													{g.slice(1)}
												</SelectItem>
											);
										})}
									</SelectContent>
								</Select>
							</div>}
						/>

						<Controller
							control={control}
							name="categoryId"
							render={({field}) => <div className="flex flex-col gap-y-3">
								<Select
									value={String(field.value ?? "")}
									onValueChange={(value) =>
										field.onChange(
											value
										)
									}
								>
									<SelectTrigger className="cursor-pointer w-full py-6">
										<SelectValue placeholder="Select a category" />
									</SelectTrigger>
									<SelectContent className="w-full">
										{serverFilters.categories.map((c) => {
											return (
												<SelectItem
													key={c.id}
													value={c.id}
												>
													{c.name}
												</SelectItem>
											);
										})}
									</SelectContent>
								</Select>
							</div>}
						/>

						<Controller
							control={control}
							name="brandId"
							render={({field}) => <div className="flex flex-col gap-y-3">
								<Select
									value={String(field.value ?? "")}
									onValueChange={(value) =>
										field.onChange(
											value
										)
									}
								>
									<SelectTrigger className="cursor-pointer w-full py-6">
										<SelectValue placeholder="Select a brand" />
									</SelectTrigger>
									<SelectContent className="w-full">
										{serverFilters.brands.map((b) => {
											return (
												<SelectItem
													key={b.id}
													value={b.id}
												>
													{b.name}
												</SelectItem>
											);
										})}
									</SelectContent>
								</Select>
							</div>}
						/>

						<Controller
							control={control}
							name="tags"
							render={({field}) => <div className="flex flex-col gap-y-3">
								<InputTag
									tags={field.value ?? []}
									setTags={(tags) => field.onChange(tags)}
								/>
							</div>}
						/>


					</div>
					<SubmitButton
						isLoading={isLoading || updateLoading}
						type={type}
						//@ts-expect-error...
						control={control}
					/>
				</form>}
			</DialogContent>
		</Dialog>
	);
};

const SubmitButton = ({isLoading, type, control}: {
	isLoading: boolean,
	type: ActionType,
	control: Control<CreateProductInput | UpdateProductInput>
}) => {
	const {title, description, tags, categoryId, brandId, gender} = useWatch({
		control,
		disabled: type.action === "create"
	})


	const noChanges = type.action === "update" && title === type.initialData.title && description === type.initialData.description && areArraysEqual(tags ?? [], type.initialData.tags) && categoryId === type.initialData.category?.id && brandId === type.initialData.brand?.id && gender === type.initialData.gender

	return <Button disabled={isLoading || noChanges}>
		{!isLoading ? `${type.action === "create" ? "Create" : "Update"} Product` : "Loading..."}
	</Button>
}