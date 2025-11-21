import z from "zod";

export const redirectPathSearchSchema = z.object({
	redirectPath: z.string().optional(),
});
