import {Link, type LinkProps as RouterLinkProps,} from "@tanstack/react-router";
import type {ReactNode} from "react";
import {cn} from "@/common/utils/cn";

export type LinkProps = {
	className?: string;
	children?: ReactNode;
	onClick?: () => void;
} & RouterLinkProps;

export const AppLink = ({
													className,
													children,
													to,
													onClick,
													...props
												}: LinkProps) => {
	return (
		<Link
			onClick={onClick}
			to={to}
			className={cn("text-primary-150 hover:text-primary-150/90", className)}
			{...props}
		>
			{children}
		</Link>
	);
};