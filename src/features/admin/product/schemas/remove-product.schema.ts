import z from "zod";

export const removeProductInputSchema = z.object({
	id: z.uuid().nonempty(),
});

export type RemoveProductInput = z.infer<typeof removeProductInputSchema>;
