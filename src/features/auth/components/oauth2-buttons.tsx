import { Button } from "@/common/components/ui/button/button";
import { cn } from "@/common/utils/cn";
import { env } from "@/config/env";
import { OAUth2Provider } from "@/features/auth/types/oauth2";
import facebookIcon from "../assets/facebook.svg";
import googleIcon from "../assets/google.svg";

interface Props {
	className?: string;
	redirectPath?: string;
}

const providers: { icon: string; authPath: OAUth2Provider; alt: string }[] = [
	{
		icon: googleIcon,
		authPath: OAUth2Provider.google,
		alt: "google",
	},
	{
		icon: facebookIcon,
		authPath: OAUth2Provider.facebook,
		alt: "facebook",
	},
];

export const OAuth2Buttons = ({ className, redirectPath }: Props) => {
	return (
		<div className={cn("flex items-center gap-x-5 md:gap-x-6", className)}>
			{providers.map(({ authPath, icon, alt }) => (
				<form
					key={authPath}
					action={`${env.API_URL}/auth/${authPath}`}
					method="GET"
				>
					{redirectPath && (
						<input type="hidden" name="redirectPath" value={redirectPath} />
					)}
					<Button
						variant="ghost"
						className="border border-primary-150 py-4! px-12 md:px-[57px] rounded-[12px] h-14 md:h-16"
					>
						<img src={icon} alt={alt} className="w-6 h-6 md:w-8 md:h-8" />
					</Button>
				</form>
			))}
		</div>
	);
};
