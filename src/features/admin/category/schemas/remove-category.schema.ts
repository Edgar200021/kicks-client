import z from "zod";

export const removeCategoryInputSchema = z.object({
	id: z.uuid().nonempty(),
});

export type RemoveCategoryInput = z.infer<typeof removeCategoryInputSchema>;
