import { Loader2 } from "lucide-react";
import { cn } from "@/common/utils/cn";

const sizes = {
	sm: "w-6 h-6",
	md: "w-10 h-10",
	lg: "w-16 h-16",
	xl: "w-24 h-24",
};

const variants = {
	primary: "text-blue-600",
	secondary: "text-primary/150",
};

interface Props {
	className?: string;
	size?: keyof typeof sizes;
	variant?: keyof typeof variants;
}

export const Spinner = ({
	className,
	size = "sm",
	variant = "primary",
}: Props) => {
	return (
		<Loader2
			className={cn(
				"animate-spin text-blue-600",
				className,
				sizes[size],
				variants[variant],
			)}
			size={40}
		/>
	);
};
