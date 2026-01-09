import z from "zod";

export const removeProductSkuInputSchema = z.object({
	id: z.uuid().nonempty(),
});

export type RemoveProductSkuInput = z.infer<typeof removeProductSkuInputSchema>;