import z from "zod";
import {
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH,
} from "@/features/auth/const/schema";

export const signInInputSchema = z.object({
	email: z.email().nonempty(),
	password: z.string().min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH),
});

export type SignInInput = z.infer<typeof signInInputSchema>;
