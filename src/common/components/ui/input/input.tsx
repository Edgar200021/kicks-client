import type * as React from "react";
import { cn } from "@/common/utils/cn";

const variants = {
	default:
		"bg-transparent placeholder:text-[#79767c] border-primary-150 focus-visible:border-primary-100",
	secondary:
		"text-white placeholder:text-primary-50 border-white focus-visible:border-ring",
};

function Input({
	className,
	type,
	variant = "default",
	size,
	...props
}: React.ComponentProps<"input"> & { variant?: keyof typeof variants }) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				"file:text-foreground placeholder:text-base placeholder:font-third selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-9 w-full min-w-0 rounded-[8px]  border bg-transparent px-4 py-6 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				"focus-visible:ring-ring/50 focus-visible:ring-[3px]",
				"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
				variants[variant],
			)}
			{...props}
		/>
	);
}

export { Input };
