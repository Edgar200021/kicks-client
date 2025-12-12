import z from "zod";
import { UserGender } from "@/common/types/api";
import {
	GET_ALL_USERS_MAX_LIMIT,
	GET_ALL_USERS_SEARCH_MAX_LENGTH,
} from "@/features/admin/user/const/zod";

export const getAllUsersInputSchema = z
	.object({
		isBanned: z.boolean().optional(),
		isVerified: z.boolean().optional(),
		search: z.string().max(GET_ALL_USERS_SEARCH_MAX_LENGTH).optional(),
		gender: z.enum(UserGender).optional(),
		page: z.coerce.number().positive().optional(),
		limit: z.coerce.number().positive().max(GET_ALL_USERS_MAX_LIMIT).optional(),
		startDate: z.coerce.date().optional(),
		endDate: z.coerce.date().optional(),
	})
	.refine(
		(obj) =>
			!obj.startDate || !obj.endDate
				? true
				: obj.endDate.getTime() > obj.startDate.getTime(),
		{
			path: ["startDate"],
		},
	);

export type GetAllUsersInput = z.infer<typeof getAllUsersInputSchema>;
