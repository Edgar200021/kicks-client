import z from "zod";
import { BRAND_NAME_MIN_LENGTH, BRAND_NAME_MAX_LENGTH } from "../const/zod";

export const updateBrandInputSchema = z.object({
	id: z.uuid().nonempty(),
	name: z
		.string()
		.min(BRAND_NAME_MIN_LENGTH)
		.max(BRAND_NAME_MAX_LENGTH)
		.nonempty(),
});

export type UpdateBrandInput = z.infer<typeof updateBrandInputSchema>;
