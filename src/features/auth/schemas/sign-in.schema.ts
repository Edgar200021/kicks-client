import z from "zod";
import { passwordSchema } from "@/features/auth/schemas/password.schema";

export const signInInputSchema = z.object({
	email: z.email().nonempty(),
	password: passwordSchema,
});

export type SignInInput = z.infer<typeof signInInputSchema>;
