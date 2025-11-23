export const formatDate = (
	date: string | Date,
	options?: Intl.DateTimeFormatOptions,
	locales: Intl.LocalesArgument = "en-US",
) => {
	const converted = typeof date === "string" ? new Date(date) : date;

	return Intl.DateTimeFormat(locales, {
		year: "numeric",
		month: "short",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
		...options,
	}).format(converted);
};
