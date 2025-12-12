import z from "zod";
import { BRAND_NAME_MAX_LENGTH, BRAND_NAME_MIN_LENGTH } from "../const/zod";

export const createBrandInputSchema = z.object({
	name: z
		.string()
		.min(BRAND_NAME_MIN_LENGTH)
		.max(BRAND_NAME_MAX_LENGTH)
		.nonempty(),
});

export type CreateBrandInput = z.Infer<typeof createBrandInputSchema>;
