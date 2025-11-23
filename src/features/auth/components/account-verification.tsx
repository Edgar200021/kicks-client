import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/common/components/ui/button/button";
import { Spinner } from "@/common/components/ui/spinner/spinner";
import { useHandleError } from "@/common/hooks/use-handler-error";
import { cn } from "@/common/utils/cn";
import { paths } from "@/config/paths";
import { useAccountVerificationMutation } from "@/features/auth/api/auth-api";

interface Props {
	className?: string;
	token: string;
}

export const AccountVerification = ({ className, token }: Props) => {
	const navigate = useNavigate();

	const [verifyAccount, { isLoading, isSuccess, error }] =
		useAccountVerificationMutation();

	useHandleError(error);

	const [redirectSeconds, setRedirectSeconds] = useState<number | null>(150);
	const maxRedirectSeconds = 5;

	useEffect(() => {
		verifyAccount({ token })
			.unwrap()
			.then(() => setRedirectSeconds(maxRedirectSeconds));
	}, [token]);

	useEffect(() => {
		if (redirectSeconds === null) return;

		const timer = setInterval(() => {
			setRedirectSeconds((sec) => {
				if (sec === null) return null;

				if (sec === 0) {
					navigate({ to: paths.auth.signIn });
				}

				return sec - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [redirectSeconds]);

	return (
		<div
			className={cn(
				"min-h-[40vh] flex items-center justify-center px-4",
				className,
			)}
		>
			<div
				className={cn(
					"w-full max-w-md p-10 rounded-3xl text-center space-y-5",
					"backdrop-blur-xl bg-white dark:bg-black/20",
					"border border-white/20 shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)]",
				)}
			>
				{isLoading && (
					<div className="flex flex-col items-center gap-4">
						<Spinner size="md" />

						<h2 className="text-2xl font-semibold text-primary-150">
							Verifying your account…
						</h2>

						<p className="text-primary-100 text-sm">
							Please wait a few seconds.
						</p>
					</div>
				)}

				{isSuccess && (
					<div className="flex flex-col items-center gap-4">
						<CheckCircle2 className="w-12 h-12 text-green-400" />

						<h2 className="text-2xl font-semibold text-green-400">
							Account verified!
						</h2>

						<p className="text-primary-150 text-sm">
							Redirecting in
							<span className="font-bold text-primary-100 px-1">
								{redirectSeconds}
							</span>
							seconds…
						</p>

						<div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mt-4">
							<div
								className="h-full bg-green-400/80"
								style={{
									width:
										redirectSeconds !== null
											? `${((maxRedirectSeconds - redirectSeconds) / maxRedirectSeconds) * 100}%`
											: "0%",
									transition: "width 1s linear",
								}}
							></div>
						</div>
					</div>
				)}

				{error && (
					<div className="flex flex-col items-center gap-4">
						<XCircle className="w-12 h-12 text-red-500" />

						<h2 className="text-2xl font-semibold text-red-500">
							Verification failed
						</h2>

						<p className="text-primary-150 text-sm max-w-xs">
							The verification link may be expired or invalid.
						</p>

						<Button
							onClick={() => navigate({ to: paths.auth.signIn.href })}
							variant="destructive"
							className="py-4"
						>
							Go to login
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};
