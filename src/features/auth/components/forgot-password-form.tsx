import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/common/components/ui/button/button";
import { FormInput } from "@/common/components/ui/form/form-input";
import { Spinner } from "@/common/components/ui/spinner/spinner";
import { useHandleError } from "@/common/hooks/use-handler-error";
import { cn } from "@/common/utils/cn";
import { useForgotPasswordMutation } from "@/features/auth/api/auth-api";
import {
	type ForgotPasswordInput,
	forgotPasswordInputSchema,
} from "../schemas/forgot-password.schema";

interface Props {
	className?: string;
}

export const ForgotPasswordForm = ({ className }: Props) => {
	const { control, handleSubmit } = useForm({
		resolver: zodResolver(forgotPasswordInputSchema),
		defaultValues: {
			email: "",
		},
	});
	const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation();
	useHandleError(error);

	const onSubmit = async (data: ForgotPasswordInput) => {
		const { data: resData } = await forgotPassword(data).unwrap();
		toast.success("Success", { description: resData });
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
				Forgot Password
			</h1>
			<p className="text-center text-sm md:text-base text-muted-foreground mb-2">
				Enter your email and we will send you instructions to reset your
				password.
			</p>

			<FormInput
				disabled={isLoading}
				control={control}
				name="email"
				required
				placeholder="Email"
				type="email"
			/>

			<Button disabled={isLoading} className="w-full justify-between mt-2">
				<span>Send reset link</span>
				{isLoading ? <Spinner variant="secondary" /> : <ArrowRight />}
			</Button>
		</form>
	);
};
