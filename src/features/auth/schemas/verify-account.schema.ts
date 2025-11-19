import z from "zod";

export const verifyAccountInputSchema = z.object({
	token: z.string().nonempty(),
});

export type VerifyAccountInput = z.infer<typeof verifyAccountInputSchema>;
