import z from "zod";

export const getAdminProductSkuInputSchema = z.object({
	id: z.uuid().nonempty(),
});

export type GetAdminProductSkuInput = z.infer<typeof getAdminProductSkuInputSchema>;