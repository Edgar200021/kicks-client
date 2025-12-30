import { z } from "zod";
import {
	PRODUCT_SKU_FILE_MAX_LENGTH,
	PRODUCT_SKU_FILE_MAX_SIZE,
	PRODUCT_SKU_FILE_MIME_TYPES,
	PRODUCT_SKU_MAX_PRICE,
	PRODUCT_SKU_MAX_SIZE,
	PRODUCT_SKU_MIN_PRICE,
	PRODUCT_SKU_MIN_SIZE,
	PRODUCT_SKU_SKU_MAX_LENGTH,
	PRODUCT_SKU_SKU_MIN_LENGTH,
} from "@/features/admin/product/const/zod.ts";

export const createProductSkuInputSchema = z
	.object({
		productId: z.uuid().trim().nonempty(),
		sku: z
			.string()
			.trim()
			.nonempty()
			.min(PRODUCT_SKU_SKU_MIN_LENGTH)
			.max(PRODUCT_SKU_SKU_MAX_LENGTH),
		quantity: z.coerce.number<number>().positive(),
		price: z.coerce
			.number<number>()
			.positive()
			.min(PRODUCT_SKU_MIN_PRICE)
			.max(PRODUCT_SKU_MAX_PRICE),
		salePrice: z.coerce.number<number>().positive().optional(),
		size: z.coerce
			.number<number>()
			.min(PRODUCT_SKU_MIN_SIZE)
			.max(PRODUCT_SKU_MAX_SIZE),
		color: z
			.string()
			.trim()
			.regex(/^#[0-9a-fA-F]{6}$/, {
				message: "Invalid color format. Must be #RRGGBB",
			}),
		images: z
			.array(
				z
					.file()
					.max(PRODUCT_SKU_FILE_MAX_SIZE)
					.mime(PRODUCT_SKU_FILE_MIME_TYPES),
			)
			.nonempty()
			.max(PRODUCT_SKU_FILE_MAX_LENGTH),
	})
	.refine(
		(data) => data.salePrice === undefined || data.salePrice < data.price,
		{
			path: ["salePrice"],
			message: "Sale price must be less than the regular price",
		},
	);

export type CreateProductSkuInput = z.infer<typeof createProductSkuInputSchema>;
