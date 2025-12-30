import { useCanGoBack, useRouter } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import {
	type Control,
	Controller,
	FormProvider,
	useFormContext,
	useWatch,
} from "react-hook-form";
import { ImagePicker } from "@/common/components/image-picker/image-picker.tsx";
import { Badge } from "@/common/components/ui/badge/badge.tsx";
import { Button } from "@/common/components/ui/button/button.tsx";
import { FormInput } from "@/common/components/ui/form/form-input.tsx";
import { Input } from "@/common/components/ui/input/input.tsx";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@/common/components/ui/select/select.tsx";
import { Textarea } from "@/common/components/ui/textarea/textarea.tsx";
import { COLORS } from "@/common/constants/colors.ts";
import type { AdminProduct, AdminProductSku } from "@/common/types/api.ts";
import { cn } from "@/common/utils/cn.ts";
import {
	PRODUCT_SKU_FILE_MAX_LENGTH,
	PRODUCT_SKU_FILE_MAX_SIZE,
	PRODUCT_SKU_MAX_PRICE,
	PRODUCT_SKU_MIN_PRICE,
} from "@/features/admin/product/const/zod.ts";
import { useCreateUpdateProductSku } from "@/features/admin/product/hooks/use-create-update-product-sku.tsx";
import type { CreateProductSkuInput } from "@/features/admin/product/schemas/create-product-sku.schema.ts";
import type { UpdateProductSkuInput } from "@/features/admin/product/schemas/update-product-sku.schema.ts";

interface Props {
	className?: string;
	type:
		| {
				action: "create";
				data: AdminProduct;
		  }
		| {
				action: "update";
				data: AdminProductSku;
		  };
}

export const AdminProductDetailsForm = ({ type, className }: Props) => {
	const { action, data } = type;
	const isCreateAction = action === "create";

	const { form, onSubmit, errors, apiValidationErrors, isLoading } =
		useCreateUpdateProductSku(type);

	return (
		<FormProvider {...form}>
			<form
				onSubmit={onSubmit}
				className={cn("bg-fa-white p-6 rounded-2xl", className)}
			>
				<fieldset
					disabled={isLoading}
					className="flex flex-col min-[800px]:flex-row gap-10 justify-between"
				>
					<div className="flex flex-col gap-y-6 max-w-[800px] w-full">
						<label className="flex flex-col gap-y-4">
							<span className="text-xl font-semibold">Product Name</span>
							<Input
								disabled
								value={isCreateAction ? data.title : data.product.title}
								className="font-third"
							/>
						</label>

						<label className="flex flex-col gap-y-4">
							<span className="text-xl font-semibold">Description</span>
							<Textarea
								disabled
								value={
									isCreateAction ? data.description : data.product.description
								}
								className="font-third resize-none"
								rows={10}
							/>
						</label>

						{(isCreateAction ? data.category : data.product.category) && (
							<label className="flex flex-col gap-y-4">
								<span className="text-xl font-semibold">Category</span>
								<Input
									disabled
									value={
										isCreateAction
											? data.category!.name
											: data.product.category!.name
									}
									className="font-third"
								/>
							</label>
						)}

						{(isCreateAction ? data.brand : data.product.brand) && (
							<label className="flex flex-col gap-y-4">
								<span className="text-xl font-semibold">Brand Name</span>
								<Input
									disabled
									value={
										isCreateAction ? data.brand!.name : data.product.brand!.name
									}
									className="font-third"
								/>
							</label>
						)}

						<div className="grid grid-cols-2 gap-6">
							<FormInput
								control={form.control}
								name={"sku"}
								label="Sku"
								placeholder="Fox-3983"
								className="[&>label]:text-xl [&>label]:font-semibold  [&>input]:font-third gap-y-4 "
								error={apiValidationErrors.sku}
							/>

							<FormInput
								control={form.control}
								name={"quantity"}
								label="Stock Quantity"
								placeholder="1258"
								className="[&>label]:text-xl [&>label]:font-semibold  [&>input]:font-third gap-y-4 "
								type="number"
								min={1}
								error={apiValidationErrors.quantity}
							/>

							<FormInput
								control={form.control}
								name={"price"}
								label="Regular Price"
								placeholder="$1000"
								className="[&>label]:text-xl [&>label]:font-semibold  [&>input]:font-third gap-y-4 "
								type="number"
								min={PRODUCT_SKU_MIN_PRICE}
								max={PRODUCT_SKU_MAX_PRICE}
								error={apiValidationErrors.price}
							/>

							<FormInput
								control={form.control}
								name={"salePrice"}
								label="Sale Price"
								placeholder="450"
								className="[&>label]:text-xl [&>label]:font-semibold  [&>input]:font-third gap-y-4 "
								type="number"
								min={0}
								error={apiValidationErrors.salePrice}
							/>

							<Controller
								render={({ field }) => (
									<div className="flex flex-col gap-y-4">
										<label className="text-xl font-semibold">Color</label>

										<Select
											value={field.value}
											onValueChange={(value) => field.onChange(value)}
										>
											<SelectTrigger
												style={{ backgroundColor: field.value }}
												className="py-6 px-4 cursor-pointer [&>svg]:hidden w-12"
											></SelectTrigger>
											<SelectContent
												className="p-1 max-h-80 w-fit! min-w-fit!"
												side="bottom"
											>
												{Object.values(COLORS).map((c) => {
													return (
														<SelectItem
															key={c}
															value={c}
															className="w-10 h-10 cursor-pointer rounded mb-2 "
															style={{
																backgroundColor: c,
															}}
														></SelectItem>
													);
												})}
											</SelectContent>
										</Select>
										{(errors.color?.message || apiValidationErrors.color) && (
											<span className="text-red-400 text-sm">
												{errors.color?.message || apiValidationErrors.color}
											</span>
										)}
									</div>
								)}
								name={"color"}
								control={form.control}
							/>

							<FormInput
								control={form.control}
								name={"size"}
								label="Size"
								placeholder="42"
								className="[&>label]:text-xl [&>label]:font-semibold  [&>input]:font-third gap-y-4"
								type="number"
								min={30}
							/>
						</div>

						{(isCreateAction ? data.tags.length : data.product.tags.length) >
							0 && (
							<div className="flex flex-col gap-y-4">
								<span className="text-xl font-semibold">Tag</span>
								<div className="font-third border border-primary-150 rounded-xl p-5 flex gap-4">
									{(isCreateAction ? data.tags : data.product.tags).map((t) => (
										<Badge
											className="rounded-[20px] bg-[#36323b] py-1 px-3 text-[#e9e9ea] capitalize text-lg"
											key={t}
										>
											{t}
										</Badge>
									))}
								</div>
							</div>
						)}
					</div>
					<div className="flex flex-col gap-y-8 max-w-[700px] w-full">
						<PickImages productImages={isCreateAction ? [] : data.images} />
						<Buttons type={type} control={form.control} />
					</div>
				</fieldset>
			</form>
		</FormProvider>
	);
};

const PickImages = ({
	productImages,
}: {
	productImages: AdminProductSku["images"];
}) => {
	const [filesWithPreview, setFilesWithPreview] = useState<
		{
			file: File;
			url: string;
			id: string;
		}[]
	>([]);

	const { setValue } = useFormContext<
		CreateProductSkuInput | UpdateProductSkuInput
	>();

	const maxLength = PRODUCT_SKU_FILE_MAX_LENGTH - productImages.length;

	useEffect(() => {
		return () => {
			for (const file of filesWithPreview) {
				URL.revokeObjectURL(file.url);
			}
		};
	}, []);

	return (
		<>
			<div className="flex flex-col gap-y-4">
				{filesWithPreview[0] !== undefined && (
					<img
						className="w-full h-[400px]! object-fit max-w-full"
						src={filesWithPreview[0].url}
						alt={filesWithPreview[0].file.name}
					/>
				)}
				<span className="text-xl font-semibold">Product Gallery</span>
				<ImagePicker
					className="max-w-full!"
					disabled={maxLength === filesWithPreview.length}
					maxSize={PRODUCT_SKU_FILE_MAX_SIZE}
					maxLength={maxLength}
					onSetFiles={(files) => {
						const remainingSlots = maxLength - filesWithPreview.length;
						if (remainingSlots <= 0) return;

						const withPreview = files.slice(0, remainingSlots).map((f) => ({
							file: f,
							url: URL.createObjectURL(f),
							id: crypto.randomUUID().toString(),
						}));

						setFilesWithPreview((prev) => {
							setValue("images", [
								...prev.map((val) => val.file),
								...withPreview.map((val) => val.file),
							]);
							return [...prev, ...withPreview];
						});
					}}
				/>
			</div>

			{(filesWithPreview.length > 0 || productImages.length > 0) && (
				<ul className={"flex flex-col gap-y-3"}>
					{productImages.map((f) => (
						<li key={f.id} className="flex items-center gap-x-4">
							<img
								className="object-cover h-16! w-16 rounded-xl"
								src={f.imageUrl}
								alt={f.imageName}
							/>
							<span className="font-semibold font-secondary">
								{f.imageName}
							</span>
							<Button
								variant="ghost"
								type="button"
								//TODO!
								// onClick={() =>
								// 	setFilesWithPreview((prev) =>
								// 		prev.filter((item) => item.id !== f.id),
								// 	)
								// }
								className="w-4 h-4 rounded-full flex items-center justify-center bg-red-500 text-white hover:bg-red-600 transition-colors !p-4"
								title="Remove"
							>
								<X className="w-4 h-4" />
							</Button>
						</li>
					))}
					{filesWithPreview.map((f) => (
						<li key={f.id} className="flex items-center gap-x-4">
							<img
								className="object-cover h-16! w-16 rounded-xl"
								src={f.url}
								alt={f.file.name}
							/>
							<span className="font-semibold font-secondary">
								{f.file.name}
							</span>
							<Button
								variant="ghost"
								type="button"
								onClick={() =>
									setFilesWithPreview((prev) => {
										const filtered = prev.filter((item) => item.id !== f.id);
										setValue(
											"images",
											filtered.map((val) => val.file),
										);

										return filtered;
									})
								}
								className="w-4 h-4 rounded-full flex items-center justify-center bg-red-500 text-white hover:bg-red-600 transition-colors !p-4"
								title="Remove"
							>
								<X className="w-4 h-4" />
							</Button>
						</li>
					))}
				</ul>
			)}
		</>
	);
};

const Buttons = ({
	type: { action, data },
	control,
}: {
	control: Control<CreateProductSkuInput | UpdateProductSkuInput>;
} & Pick<Props, "type">) => {
	const router = useRouter();
	const canGoBack = useCanGoBack();
	const { price, salePrice, quantity, sku, size, color, images } = useWatch({
		control,
		// disabled: action === "create"
	});

	const disabled =
		action === "update"
			? price === data.price &&
				salePrice === data.salePrice &&
				quantity === data.quantity &&
				sku === data.sku &&
				size === data.size &&
				color === data.color &&
				(!images || images.length === 0)
			: false;

	return (
		<div className="flex items-center gap-x-4">
			<Button disabled={disabled} className="w-[50%]">
				{action === "create" ? "Add" : "Update"}
			</Button>
			{canGoBack && (
				<Button
					variant="outline"
					className="w-[50%] uppercase border-primary-150"
					onClick={() => router.history.back()}
				>
					Cancel
				</Button>
			)}
		</div>
	);
};
