import z from "zod";
import { UserGender } from "@/common/types/api";
import {
	FIRST_NAME_MAX_LENGTH,
	FIRST_NAME_MIN_LENGTH,
	LAST_NAME_MAX_LENGTH,
	LAST_NAME_MIN_LENGTH,
} from "@/features/auth/const/schema";
import { passwordSchema } from "@/features/auth/schemas/password.schema";

export const signUpInputSchema = z.object({
	email: z.email().nonempty(),
	password: passwordSchema,
	firstName: z.string().min(FIRST_NAME_MIN_LENGTH).max(FIRST_NAME_MAX_LENGTH),
	lastName: z.string().min(LAST_NAME_MIN_LENGTH).max(LAST_NAME_MAX_LENGTH),
	gender: z.enum(UserGender),
});

export type SignUpInput = z.infer<typeof signUpInputSchema>;
