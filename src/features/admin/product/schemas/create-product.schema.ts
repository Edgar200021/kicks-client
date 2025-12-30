import z from "zod";
import { ProductGender } from "@/common/types/api.ts";
import {
	PRODUCT_DESCRIPTION_MAX_LENGTH,
	PRODUCT_DESCRIPTION_MIN_LENGTH,
	PRODUCT_TITLE_MAX_LENGTH,
	PRODUCT_TITLE_MIN_LENGTH,
} from "@/features/admin/product/const/zod.js";

export const createProductInputSchema = z.object({
	title: z
		.string()
		.nonempty()
		.trim()
		.min(PRODUCT_TITLE_MIN_LENGTH)
		.max(PRODUCT_TITLE_MAX_LENGTH),
	description: z
		.string()
		.trim()
		.nonempty()
		.min(PRODUCT_DESCRIPTION_MIN_LENGTH)
		.max(PRODUCT_DESCRIPTION_MAX_LENGTH),
	gender: z.enum(ProductGender),
	tags: z.string().trim().nonempty().array().optional().default([]),
	categoryId: z.uuid().trim().nonempty(),
	brandId: z.uuid().trim().nonempty(),
});

export type CreateProductInput = z.infer<typeof createProductInputSchema>;
