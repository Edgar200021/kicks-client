import z from "zod";
import { createProductSkuInputSchema } from "@/features/admin/product/schemas/create-product-sku.schema.ts";

export const updateProductSkuInputSchema = createProductSkuInputSchema
	.partial()
	.omit({ productId: true })
	.and(z.object({ id: z.uuid().trim().nonempty() }));
export type UpdateProductSkuInput = z.infer<typeof updateProductSkuInputSchema>;
