import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/common/components/ui/button/button";
import { Checkbox } from "@/common/components/ui/checkbox/checkbox";
import { FormInput } from "@/common/components/ui/form/form-input";
import { AppLink } from "@/common/components/ui/link/link";
import {
	RadioGroup,
	RadioGroupItem,
} from "@/common/components/ui/radio-group/radio-group";
import { Spinner } from "@/common/components/ui/spinner/spinner";
import { useHandleError } from "@/common/hooks/use-handler-error";
import { UserGender } from "@/common/types/api";
import { cn } from "@/common/utils/cn";
import { paths } from "@/config/paths";
import { useSignUpMutation } from "@/features/auth/api/auth-api";
import { OAuth2Buttons } from "@/features/auth/components/oauth2-buttons";
import {
	type SignUpInput,
	signUpInputSchema,
} from "@/features/auth/schemas/sign-up.schema";

interface Props {
	className?: string;
	redirectPath?: string;
}

export const SignUpForm = ({ className, redirectPath }: Props) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(signUpInputSchema),
		defaultValues: {
			email: "",
			password: "",
			firstName: "",
			lastName: "",
		},
	});
	const [signUp, { isLoading, error }] = useSignUpMutation();
	const { apiValidationErrors } = useHandleError<(keyof SignUpInput)[]>(error);

	const onSubmit = async (data: SignUpInput) => {
		const response = await signUp(data).unwrap();
		toast.success("Success", { description: response.data });
	};

	return (
		<div className={cn("max-w-[480px] w-full", className)}>
			<h1 className="font-semibold text-2xl mb-3 md:text-4xl">Register</h1>
			<div className="flex flex-col gap-y-5 md:gap-y-6">
				<span className="font-semibold md:text-xl">Sign up with</span>
				<OAuth2Buttons redirectPath={redirectPath} />
				<form onSubmit={handleSubmit(onSubmit)}>
					<fieldset
						disabled={isLoading}
						className="flex flex-col gap-y-5 md:gap-y-6"
					>
						<span className="font-semibold text-xl font-secondary uppercase">
							or
						</span>
						<div className="flex flex-col gap-y-4 md:gap-y-5">
							<span className="font-semibold text-xl md:text-2xl">
								Your Name
							</span>
							<FormInput
								control={control}
								name="firstName"
								required
								placeholder="First Name"
								error={apiValidationErrors.firstName}
							/>
							<FormInput
								control={control}
								name="lastName"
								required
								placeholder="Last Name"
								error={apiValidationErrors.lastName}
							/>
						</div>
						<div className="flex flex-col gap-y-4 md:gap-y-5">
							<span className="font-semibold text-xl md:text-2xl">Gender</span>
							<div className="flex items-center gap-x-8">
								<Controller
									control={control}
									name="gender"
									render={({ field }) => (
										<RadioGroup
											value={field.value}
											onValueChange={field.onChange}
											className="flex gap-4"
										>
											{Object.values(UserGender).map((g) => (
												<div key={g} className="flex items-center gap-2">
													<RadioGroupItem value={g} id={g} />
													<label htmlFor={g} className="capitalize">
														{g}
													</label>
												</div>
											))}
										</RadioGroup>
									)}
								/>
							</div>
							{(errors.gender?.message || apiValidationErrors.gender) && (
								<span className="text-red-400">
									{errors.gender?.message || apiValidationErrors.gender}
								</span>
							)}
						</div>
						<div className="flex flex-col gap-y-4 md:gap-y-5">
							<span className="font-semibold text-xl md:text-2xl">
								Login Details
							</span>

							<FormInput
								control={control}
								name="email"
								required
								placeholder="Email"
								type="email"
								error={apiValidationErrors.email}
							/>

							<div className="flex flex-col gap-y-1">
								<FormInput
									control={control}
									name="password"
									required
									placeholder="Password"
									type="password"
									error={apiValidationErrors.password}
								/>

								<span className="text-sm font-third">
									Minimum 8 characters with at least one uppercase, one
									lowercase, one special character and a number
								</span>
							</div>
						</div>
						<div className="flex gap-x-2">
							<Checkbox required className="size-4" />
							<span className="font-secondary font-semibold text-sm md:text-base -translate-y-1">
								By clicking 'Register' you agree to our website KicksClub Terms
								& Conditions, Kicks Privacy Notice and Terms & Conditions.
							</span>
						</div>
						<Button className="justify-between">
							<span>Register</span>
							{isLoading ? <Spinner variant="secondary" /> : <ArrowRight />}
						</Button>
						<div className="flex items-center gap-x-1">
							<span className="text-sm md:text-base">
								Already have an account?
							</span>
							<AppLink
								to={paths.auth.signIn.href}
								className="font-semibold underline md:text-base text-primary"
							>
								Log in
							</AppLink>
						</div>
					</fieldset>
				</form>
			</div>
		</div>
	);
};
