import type { ZodError, ZodType, z } from "zod";

export async function validateSchema<T extends ZodType>(
	schema: T,
	payload: unknown,
): Promise<
	{ success: true; data: z.infer<T> } | { success: false; error: ZodError }
> {
	const result = await schema.safeParseAsync(payload);
	return result.success
		? { success: true, data: result.data }
		: { success: false, error: result.error };
}
