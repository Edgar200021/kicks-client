import {
	Link,
	type LinkProps as RouterLinkProps,
} from "@tanstack/react-router";
import { cn } from "@/utils/cn";

export type LinkProps = {
	className?: string;
	children: React.ReactNode;
} & RouterLinkProps;

export const AppLink = ({ className, children, to, ...props }: LinkProps) => {
	return (
		<Link
			to={to}
			className={cn("text-slate-600 hover:text-slate-900", className)}
			{...props}
		>
			{children}
		</Link>
	);
};
