import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/utils/cn";

const inputVariants = cva("", {
	variants: {
		variant: {
			default:
				"bg-transparent placeholder:text-[#79767c] border-primary-150 focus-visible:border-primary-100",
			destructive:
				"bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
			outline:
				"border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
			secondary:
				"bg-secondary text-secondary-foreground placeholder:text-primary-50 border-white focus-visible:border-ring",
			ghost:
				"hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
			link: "text-primary underline-offset-4 hover:underline",
		},
		size: {
			default: "h-9 has-[>svg]:px-3 ",
			sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
			lg: "h-10 px-6 has-[>svg]:px-4",
			icon: "size-9",
			"icon-sm": "size-8",
			"icon-lg": "size-10",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

function Input({
	className,
	type,
	variant,
	size,
	...props
}: React.ComponentProps<"input"> &
	VariantProps<typeof inputVariants> & {
		asChild?: boolean;
	}) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				inputVariants({ variant, size, className }),
				"file:text-foreground placeholder:text-base placeholder:font-third selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-9 w-full min-w-0 rounded-[8px]  border bg-transparent px-4 py-6 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				"focus-visible:ring-ring/50 focus-visible:ring-[3px]",
				"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
			)}
			{...props}
		/>
	);
}

export { Input };
