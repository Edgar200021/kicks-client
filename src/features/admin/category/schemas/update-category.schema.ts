import z from "zod";
import {
	CATEGORY_NAME_MAX_LENGTH,
	CATEGORY_NAME_MIN_LENGTH,
} from "../const/zod";

export const updateCategoryInputSchema = z.object({
	id: z.uuid().nonempty(),
	name: z
		.string()
		.min(CATEGORY_NAME_MIN_LENGTH)
		.max(CATEGORY_NAME_MAX_LENGTH)
		.nonempty(),
});

export type UpdateCategoryInput = z.infer<typeof updateCategoryInputSchema>;
