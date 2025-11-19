import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button/button";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Input } from "@/components/ui/input/input";
import { useSignUpMutation } from "@/features/auth/api/auth-api";
import {
	type SignUpInput,
	signUpInputSchema,
} from "@/features/auth/schemas/sign-up.schema";
import { cn } from "@/utils/cn";
import facebookIcon from "../assets/facebook.svg";
import googleIcon from "../assets/google.svg";

interface Props {
	className?: string;
}

export const SignUpForm = ({ className }: Props) => {
	const {
		handleSubmit,
		control,
		register,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(signUpInputSchema),
	});
	const [signUp, { isLoading, error }] = useSignUpMutation();

	const onSubmit = async (data: SignUpInput) => {
		await signUp(data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={cn("max-w-[480px] w-full", className)}
		>
			<fieldset disabled={isLoading}>
				<h1 className="font-semibold text-2xl mb-3 md:text-4xl">Register</h1>
				<div className="flex flex-col gap-y-5 md:gap-y-6">
					<span className="font-semibold md:text-xl">Sign up with</span>
					<div className="flex items-center gap-x-5 md:gap-x-6 mb-5">
						<Button
							type="button"
							variant="ghost"
							className="border border-primary-150 py-4! px-12 md:px-[57px] rounded-[12px] h-14 md:h-16"
						>
							<img
								src={googleIcon}
								alt="google"
								className="w-6 h-6 md:w-8 md:h-8"
							/>
						</Button>
						<Button
							type="button"
							variant="ghost"
							className="border border-primary-150 py-4! px-12 md:px-[57px] rounded-[12px] h-14 md:h-16"
						>
							<img
								src={facebookIcon}
								alt="facebook"
								className="w-6 h-6 md:w-8 md:h-8"
							/>
						</Button>
					</div>
					<span className="font-semibold text-xl font-secondary uppercase">
						or
					</span>
					<div className="flex flex-col gap-y-4 md:gap-y-5">
						<span className="font-semibold text-xl md:text-2xl">Your Name</span>
						<Input required placeholder="First Name" />
						<Input required placeholder="Last Name" />
					</div>
					<div className="flex flex-col gap-y-4 md:gap-y-5">
						<span className="font-semibold text-xl md:text-2xl">Gender</span>
						<div className="flex items-center gap-x-8">
							<div className="flex items-center gap-x-2">
								<Checkbox className="size-4" />
								<span className="font-semibold font-secondary">Male</span>
							</div>
							<div className="flex items-center gap-x-2">
								<Checkbox />
								<span className="font-semibold font-secondary">Female</span>
							</div>

							<div className="flex items-center gap-x-2">
								<Checkbox />
								<span className="font-semibold font-secondary">Other</span>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-y-4 md:gap-y-5">
						<span className="font-semibold text-xl md:text-2xl">
							Login Details
						</span>
						<Input required type="email" placeholder="Email" />
						<div className="flex flex-col gap-y-1">
							<Input required type="password" placeholder="Password" />
							<span className="text-sm font-third">
								Minimum 8 characters with at least one uppercase, one lowercase,
								one special character and a number
							</span>
						</div>
					</div>
					<div className="flex gap-x-2">
						<Checkbox className="size-4" />
						<span className="font-secondary font-semibold text-sm md:text-base -translate-y-1">
							By clicking 'Log In' you agree to our website KicksClub Terms &
							Conditions, Kicks Privacy Notice and Terms & Conditions.
						</span>
					</div>
					<div className="flex gap-x-2">
						<Checkbox className="size-4" />
						<span className="font-secondary font-semibold text-sm md:text-base -translate-y-1">
							Keep me logged in - applies to all log in options below. More info
						</span>
					</div>
					<Button className="justify-between">
						<span>Register</span>
						<ArrowRight />
					</Button>
				</div>
			</fieldset>
		</form>
	);
};
