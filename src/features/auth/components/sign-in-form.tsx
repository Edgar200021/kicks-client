import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/common/components/ui/button/button";
import { Checkbox } from "@/common/components/ui/checkbox/checkbox";
import { FormInput } from "@/common/components/ui/form/form-input";
import { AppLink } from "@/common/components/ui/link/link";
import { Spinner } from "@/common/components/ui/spinner/spinner";
import { useHandleError } from "@/common/hooks/use-handler-error";
import { cn } from "@/common/utils/cn";
import { paths } from "@/config/paths";
import { useSignInMutation } from "@/features/auth/api/auth-api";
import { OAuth2Buttons } from "@/features/auth/components/oauth2-buttons";
import {
	type SignInInput,
	signInInputSchema,
} from "@/features/auth/schemas/sign-in.schema";

interface Props {
	className?: string;
	redirectPath?: string;
}

export const SignInForm = ({ className, redirectPath }: Props) => {
	const { handleSubmit, control } = useForm({
		resolver: zodResolver(signInInputSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const [signIn, { isLoading, error }] = useSignInMutation();
	const { apiValidationErrors } = useHandleError<(keyof SignInInput)[]>(error);

	const onSubmit = async (data: SignInInput) => {
		await signIn(data).unwrap();
	};

	return (
		<div className={cn("max-w-[480px] w-full", className)}>
			<h1 className="font-semibold text-2xl mb-3 md:text-4xl">Login</h1>
			<div className="flex flex-col gap-y-5 md:gap-y-6">
				<form onSubmit={handleSubmit(onSubmit)}>
					<fieldset
						className="flex flex-col gap-y-5 md:gap-y-6"
						disabled={isLoading}
					>
						<AppLink
							to={paths.auth.forgotPassword}
							className="font-semibold md:text-xl underline"
						>
							Forgot your password?
						</AppLink>

						<FormInput
							control={control}
							name="email"
							required
							placeholder="Email"
							type="email"
							error={apiValidationErrors.email}
						/>

						<FormInput
							control={control}
							name="password"
							required
							placeholder="Password"
							type="password"
							error={apiValidationErrors.password}
						/>

						<div className="flex gap-x-2">
							<Checkbox className="size-4" />
							<span className="font-secondary font-semibold text-sm md:text-base -translate-y-1">
								Keep me logged in - applies to all log in options below. More
								info
							</span>
						</div>

						<Button className="justify-between">
							<span>email login</span>
							{isLoading ? <Spinner variant="secondary" /> : <ArrowRight />}
						</Button>
					</fieldset>
				</form>

				<OAuth2Buttons redirectPath={redirectPath} />

				<div className="flex items-center gap-x-1 mt-2">
					<span className="text-sm md:text-base">Don't have an account?</span>
					<AppLink
						disabled={isLoading}
						to={paths.auth.signUp.href}
						className="font-semibold underline md:text-base text-primary"
					>
						Register
					</AppLink>
				</div>

				<span className="font-secondary font-semibold text-sm md:text-base">
					By clicking 'Log In' you agree to our website KicksClub Terms &
					Conditions, Kicks Privacy Notice and Terms & Conditions.
				</span>
			</div>
		</div>
	);
};
