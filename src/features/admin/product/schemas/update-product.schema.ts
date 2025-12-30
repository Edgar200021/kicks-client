import z from "zod";
import { createProductInputSchema } from "@/features/admin/product/schemas/create-product.schema.ts";

export const updateProductInputSchema = createProductInputSchema
	.partial()
	.and(z.object({ id: z.uuid().trim().nonempty() }));
export type UpdateProductInput = z.infer<typeof updateProductInputSchema>;
