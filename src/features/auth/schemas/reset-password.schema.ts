import z from "zod";
import { passwordSchema } from "@/features/auth/schemas/password.schema";

export const resetPasswordInputSchema = z
	.object({
		email: z.email().nonempty(),
		token: z.string().nonempty(),
		password: passwordSchema,
		passwordConfirm: passwordSchema,
	})
	.refine((obj) => obj.password === obj.passwordConfirm, {
		error: "Passwords do not match",
	});

export type ResetPasswordInput = z.infer<typeof resetPasswordInputSchema>;
