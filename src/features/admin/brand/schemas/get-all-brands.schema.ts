import z from "zod";
import { GET_ALL_BRANDS_SEARCH_MAX_LENGTH } from "../const/zod";

export const getAllBrandsInputSchema = z
	.object({
		search: z.string().max(GET_ALL_BRANDS_SEARCH_MAX_LENGTH).optional(),
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

export type GetAllBrandsInput = z.infer<typeof getAllBrandsInputSchema>;
