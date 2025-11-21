import facebookIcon from "@/common/assets/icons/facebook.svg";
import instagramIcon from "@/common/assets/icons/instagram.svg";
import mediumLogoIcon from "@/common/assets/icons/medium-logo.svg";

import tiktokIcon from "@/common/assets/icons/tiktok.svg";
import twitterIcon from "@/common/assets/icons/twitter.svg";

import { Button } from "@/common/components/ui/button/button";
import { Input } from "@/common/components/ui/input/input";
import { cn } from "@/common/utils/cn";

interface Props {
	className?: string;
}

export const Footer = ({ className }: Props) => {
	return (
		<footer className={cn("", className)}>
			<div className="flex flex-col gap-y-8 bg-blue p-4 pb-20 rounded-tl-3xl rounded-tr-3xl md:flex-row md:gap-y-0 md:gap-x-5 md:px-[72px] md:pt-16 md:justify-between xl:pr-[184px]">
				<div className="flex flex-col md:max-w-[510px]">
					<p className="font-semibold text-white text-[32px] mb-2 md:mb-4 lg:text-[48px] md:uppercase max-w-[326px] md:max-w-[510px]">
						Join our KicksPlus Club & get 15% off
					</p>
					<p className="font-semibold mb-6 md:mb-8 font-secondary md:text-[20px] text-primary-50">
						Sign up for free! Join the community.
					</p>
					<div className="flex items-center gap-x-1 max-w-md w-full">
						<Input
							type="email"
							placeholder="Email address"
							variant="secondary"
						/>
						<Button>Submit</Button>
					</div>
				</div>
				<img className="w-60 lg:w-[350px]" src={mediumLogoIcon} alt="Kicks" />
			</div>
			<div className="rounded-3xl md:rounded-[48px] bg-primary-150 -translate-y-6 md:-translate-y-12 overflow-hidden">
				<div className="pt-6 px-4 md:pt-10 md:px-10 mb-10 md:mb-0">
					<div className="flex flex-col gap-y-10 md:flex-row md:flex-wrap md:gap-10 md:justify-between md:mb-[100px]">
						<div className="flex flex-col gap-y-1 max-w-[326px] md:max-w-[446px]">
							<span className="text-semibold text-yellow text-2xl md:text-4xl">
								About us
							</span>
							<p className="font-semibold font-secondary text-primary-50 md:text-xl">
								We are the biggest hyperstore in the universe. We got you all
								cover with our exclusive collections and latest drops.
							</p>
						</div>

						<div className="flex flex-col gap-y-4 max-w-[326px] md:max-w-[446px]">
							<span className="text-semibold text-yellow text-2xl">
								Categories
							</span>
							<ul className="md:text-xl text-primary-50 flex  flex-col gap-y-2">
								{/**TODO: */}
								<li>Runners</li>
								<li>Sneakers</li>
								<li>Basketball</li>
								<li>Outdoor</li>
								<li>Golf</li>
								<li>Hiking</li>
							</ul>
						</div>

						<div className="flex flex-col gap-y-4 max-w-[326px] md:max-w-[446px]">
							<span className="text-semibold text-yellow text-2xl">
								Company
							</span>
							<ul className="md:text-xl text-primary-50 flex flex-col gap-y-2">
								<li>About</li>
								<li>Contact</li>
								<li>Blogs</li>
							</ul>
						</div>

						<div className="flex flex-col gap-y-4 max-w-[326px] md:max-w-[446px]">
							<span className="text-semibold text-yellow text-2xl">
								Company
							</span>
							<ul className="md:text-xl text-primary-50 flex gap-x-[18px] md:gap-y-[26px]">
								<li>
									<img className="w-6 h-6" src={facebookIcon} alt="facebook" />
								</li>
								<li>
									<img className="w-6 h-6" src={instagramIcon} alt="facebook" />
								</li>
								<li>
									<img className="w-6 h-6" src={twitterIcon} alt="facebook" />
								</li>
								<li>
									<img className="w-6 h-6" src={tiktokIcon} alt="facebook" />
								</li>
							</ul>
						</div>
					</div>
					<img
						src={mediumLogoIcon}
						alt="Kicks"
						className="hidden md:inline-block w-full translate-y-16 lg:translate-y-24"
					/>
				</div>
				<img
					src={mediumLogoIcon}
					className="md:hidden w-full h-[120px] object-contain translate-y-7"
					alt="Kicks"
				/>
			</div>
		</footer>
	);
};
