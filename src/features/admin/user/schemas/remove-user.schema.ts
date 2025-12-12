import z from "zod";

export const removeUserInputSchema = z.object({
	id: z.uuid().nonempty(),
});

export type RemoveUserInput = z.infer<typeof removeUserInputSchema>;
