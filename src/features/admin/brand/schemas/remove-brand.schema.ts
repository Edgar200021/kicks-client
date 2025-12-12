import z from "zod";

export const removeBrandInputSchema = z.object({
	id: z.uuid().nonempty(),
});

export type RemoveBrandInput = z.infer<typeof removeBrandInputSchema>;
