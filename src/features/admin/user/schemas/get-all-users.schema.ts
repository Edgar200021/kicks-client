import z from "zod";
import { UserGender } from "@/common/types/api";
import {
	GET_ALL_USERS_MAX_LIMIT,
	GET_ALL_USERS_SEARCH_MAX_LENGTH,
} from "@/features/admin/user/const/zod";

export const getAllUsersInputSchema = z.object({
	isBanned: z
		.enum(["true", "false"])
		.transform((value) => value === "true")
		.optional(),
	isVerified: z
		.enum(["true", "false"])
		.transform((value) => value === "true")
		.optional(),
	search: z.string().max(GET_ALL_USERS_SEARCH_MAX_LENGTH).optional(),
	gender: z.enum(UserGender).optional(),
	page: z.coerce.number().positive().optional().default(1),
	limit: z.coerce.number().positive().max(GET_ALL_USERS_MAX_LIMIT).optional(),
});

export type GetAllUsersInput = z.infer<typeof getAllUsersInputSchema>;
