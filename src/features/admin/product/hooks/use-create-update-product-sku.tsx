import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/common/components/ui/button/button.tsx";
import { useHandleError } from "@/common/hooks/use-handler-error.ts";
import type { AdminProduct, AdminProductSku } from "@/common/types/api.ts";
import { paths } from "@/config/paths.ts";
import { useCreateProductSkuMutation } from "@/features/admin/product/api/admin-product-api.ts";
import {
	type CreateProductSkuInput,
	createProductSkuInputSchema,
} from "@/features/admin/product/schemas/create-product-sku.schema.ts";
import { updateProductInputSchema } from "@/features/admin/product/schemas/update-product.schema.ts";
import type { UpdateProductSkuInput } from "@/features/admin/product/schemas/update-product-sku.schema.ts";

export type CreateUpdateProductSku =
	| {
			action: "create";
			data: AdminProduct;
	  }
	| {
			action: "update";
			data: AdminProductSku;
	  };

export const useCreateUpdateProductSku = (type: CreateUpdateProductSku) => {
	const { action, data } = type;

	const form = useForm<CreateProductSkuInput | UpdateProductSkuInput>({
		resolver: zodResolver(
			action === "create"
				? createProductSkuInputSchema
				: updateProductInputSchema,
		),
		defaultValues: {
			sku: action === "create" ? "" : data.sku,
			quantity: action === "create" ? 0 : data.quantity,
			price: action === "create" ? 0 : data.price,
			salePrice:
				action === "create" ? undefined : (data.salePrice ?? undefined),
			size: action === "create" ? 30 : data.size,
			color: action === "create" ? "" : data.color,
			...(action === "create" ? { productId: data.id } : { id: data.id }),
		},
	});
	const [createProductSku, { isLoading, error }] =
		useCreateProductSkuMutation();
	const { apiValidationErrors } =
		useHandleError<(keyof CreateProductSkuInput)[]>(error);
	const navigate = useNavigate();

	const onSubmit = async (
		data: CreateProductSkuInput | UpdateProductSkuInput,
	) => {
		if ("productId" in data) {
			const {
				data: { id },
			} = await createProductSku(data).unwrap();

			toast.success("The product SKU has been created successfully.", {
				action: (
					<Button
						size="sm"
						onClick={() =>
							navigate({
								to: paths.admin.products.skuDetail,
								params: {
									id,
								},
							})
						}
					>
						Go to product
					</Button>
				),
				className: "md:w-[550px]!",
			});

			return;
		}
	};

	return {
		form,
		onSubmit: form.handleSubmit(onSubmit),
		isLoading,
		errors: form.formState.errors,
		apiValidationErrors,
	};
};
