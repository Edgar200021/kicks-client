import {
	Link,
	type LinkProps as RouterLinkProps,
} from "@tanstack/react-router";
import { cn } from "@/common/utils/cn";

export type LinkProps = {
	className?: string;
	children: React.ReactNode;
} & RouterLinkProps;

export const AppLink = ({ className, children, to, ...props }: LinkProps) => {
	return (
		<Link
			to={to}
			className={cn("text-primary-150 hover:text-primary-150/90", className)}
			{...props}
		>
			{children}
		</Link>
	);
};