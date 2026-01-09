export const buildFormData = (data: Record<string, unknown>) => {
	return Object.entries(data).reduce((acc, [key, value]) => {
		if (Array.isArray(value)) {
			for (const val of value) {
				acc.append(key, val);
			}

			return acc;
		}

		//@ts-expect-error
		acc.append(key, value);

		return acc;
	}, new FormData());
}