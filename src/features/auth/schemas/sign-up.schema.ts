import z from "zod";
import {
	FIRST_NAME_MAX_LENGTH,
	FIRST_NAME_MIN_LENGTH,
	LAST_NAME_MAX_LENGTH,
	LAST_NAME_MIN_LENGTH,
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH,
} from "@/features/auth/const/schema";
import { UserGender } from "@/types/api";

export const signUpInputSchema = z.object({
	email: z.email().nonempty(),
	password: z.string().min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH),
	firstName: z.string().min(FIRST_NAME_MIN_LENGTH).max(FIRST_NAME_MAX_LENGTH),
	lastName: z.string().min(LAST_NAME_MIN_LENGTH).max(LAST_NAME_MAX_LENGTH),
	gender: z.enum(UserGender),
});

export type SignUpInput = z.infer<typeof signUpInputSchema>;
