import z from "zod";
import {
	getAllAdminProductsInputSchema
} from "@/features/admin/product/schemas/get-all-admin-products.schema.ts";

export const getAllAdminProductsSkuInputSchema = getAllAdminProductsInputSchema
	.and(
		z.object({
			inStock: z.boolean().optional(),
			minPrice: z.coerce.number<number>().gte(0).optional(),
			maxPrice: z.coerce.number<number>().positive().optional(),
			minSalePrice: z.coerce.number<number>().gte(0).optional(),
			maxSalePrice: z.coerce.number<number>().positive().optional(),
			size: z.coerce.number<number>().positive().optional(),
			color: z
				.string()
				.trim()
				.regex(/^#[0-9a-fA-F]{6}$/, {
					message: "Invalid color format. Must be #RRGGBB",
				})
				.optional(),
		}),
	)
	.refine(
		(obj) =>
			obj.minPrice === undefined ||
			obj.maxPrice === undefined ||
			obj.minPrice <= obj.maxPrice,
		{
			path: ["minPrice"],
			error: "minPrice must be less than or equal to maxPrice",
		},
	)
	.refine(
		(obj) =>
			obj.minSalePrice === undefined ||
			obj.maxSalePrice === undefined ||
			obj.minSalePrice <= obj.maxSalePrice,
		{
			path: ["minSalePrice"],
			message: "minSalePrice must be less than or equal to maxSalePrice",
		},
	);

export type GetAllAdminProductsSkuInput = z.infer<
	typeof getAllAdminProductsSkuInputSchema
>;