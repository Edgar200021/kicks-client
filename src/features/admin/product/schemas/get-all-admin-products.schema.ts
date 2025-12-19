import z from "zod";
import {
	GET_ALL_ADMIN_PRODUCTS_MAX_LIMIT,
	GET_ALL_ADMIN_PRODUCTS_SEARCH_MAX_LENGTH,
	GET_ALL_ADMIN_PRODUCTS_TAGS_MAX_LENGTH,
} from "@/features/admin/product/const/zod.ts";
import { ProductGender } from "@/common/types/api.ts";

export const getAllAdminProductsInputSchema = z
	.object({
		search: z.string().max(GET_ALL_ADMIN_PRODUCTS_SEARCH_MAX_LENGTH).optional(),
		gender: z.enum(ProductGender).optional(),
		tags: z
			.string()
			.max(GET_ALL_ADMIN_PRODUCTS_TAGS_MAX_LENGTH)
			.array()
			.min(1)
			.optional(),
		isDeleted: z.boolean().optional(),
		page: z.coerce.number().positive().optional(),
		categoryId: z.uuid().trim().nonempty().optional(),
		brandId: z.uuid().trim().nonempty().optional(),
		limit: z.coerce
			.number()
			.positive()
			.max(GET_ALL_ADMIN_PRODUCTS_MAX_LIMIT)
			.optional(),
		startDate: z.coerce.date().optional(),
		endDate: z.coerce.date().optional(),
	})
	.refine(
		(obj) =>
			!obj.startDate || !obj.endDate
				? true
				: obj.endDate.getTime() > obj.startDate.getTime(),
		{
			path: ["startDate"],
		},
	);

export type GetAllAdminProductsInput = z.infer<
	typeof getAllAdminProductsInputSchema
>;
