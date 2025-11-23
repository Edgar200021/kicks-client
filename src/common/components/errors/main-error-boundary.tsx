import type { ErrorComponentProps } from "@tanstack/react-router";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/common/components/ui/button/button";

export default function MainErrorBoundary({
	error,
	info,
	reset,
}: ErrorComponentProps) {
	useEffect(() => {
		// TODO:
		console.log(error, info);
	}, [error, info]);

	return (
		<div className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-center gap-6">
			<div className="flex flex-col items-center gap-4 max-w-md">
				<AlertTriangle className="w-14 h-14" />
				<h1 className="text-2xl font-bold">Something went wrong</h1>
				<p className="text-base opacity-80">
					An unexpected error occurred. Try reloading the page, and if the issue
					persists, please come back later.
				</p>
			</div>

			<div className="flex items-center gap-4">
				<Button onClick={() => reset()} className="flex items-center gap-2">
					<RefreshCcw className="w-4 h-4" />
					Try again
				</Button>
			</div>
		</div>
	);
}
