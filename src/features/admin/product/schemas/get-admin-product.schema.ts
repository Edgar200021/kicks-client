import z from "zod";

export const getAdminProductInputSchema = z.object({
	id: z.uuid().nonempty(),
});

export type GetAdminProductInput = z.infer<typeof getAdminProductInputSchema>;
