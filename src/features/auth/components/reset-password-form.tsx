import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/common/components/ui/button/button";
import { FormInput } from "@/common/components/ui/form/form-input";
import { Spinner } from "@/common/components/ui/spinner/spinner";
import { useHandleError } from "@/common/hooks/use-handler-error";
import { cn } from "@/common/utils/cn";
import { useResetPasswordMutation } from "@/features/auth/api/auth-api";
import {
	type ResetPasswordInput,
	resetPasswordInputSchema,
} from "@/features/auth/schemas/reset-password.schema";

interface Props {
	className?: string;
	rest: Pick<ResetPasswordInput, "email" | "token">;
}

export const ResetPasswordForm = ({ className, rest }: Props) => {
	const { control, handleSubmit } = useForm({
		resolver: zodResolver(resetPasswordInputSchema),
		defaultValues: {
			...rest,
			password: "",
			passwordConfirm: "",
		},
	});
	const [resetPassword, { isLoading, error }] = useResetPasswordMutation();
	useHandleError(error);

	const onSubmit = async (data: ResetPasswordInput) => {
		await resetPassword(data).unwrap();
		toast.success("Success", {
			description:
				"Your password has been updated. You can now log in with the new one",
		});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={cn(
				"w-full max-w-[480px] mx-auto flex flex-col gap-y-6 p-6 rounded-2xl shadow-lg bg-white md:p-8",
				className,
			)}
		>
			<h1 className="font-semibold text-2xl md:text-4xl text-center mb-2">
				Reset Password
			</h1>
			<p className="text-center text-sm md:text-base text-muted-foreground mb-2">
				Enter your new password to complete the reset process.
			</p>

			<FormInput
				disabled={isLoading}
				control={control}
				name="password"
				required
				placeholder="Password"
				type="password"
			/>

			<FormInput
				disabled={isLoading}
				control={control}
				name="passwordConfirm"
				required
				placeholder="Confirm password"
				type="password"
			/>

			<Button disabled={isLoading} className="w-full justify-between mt-2">
				<span>Reset password</span>
				{isLoading ? <Spinner variant="secondary" /> : <ArrowRight />}
			</Button>
		</form>
	);
};
