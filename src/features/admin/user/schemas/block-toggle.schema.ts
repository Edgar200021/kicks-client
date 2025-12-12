import z from "zod";

export const blockToggleInputSchema = z.object({
	id: z.uuid().nonempty(),
});

export type BlockToggleInput = z.infer<typeof blockToggleInputSchema>;
