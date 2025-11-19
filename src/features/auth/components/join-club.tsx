import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { cn } from "@/utils/cn";

interface Props {
	className?: string;
}

export const JoinClub = ({ className }: Props) => {
	return (
		<div
			className={cn(
				"bg-fa-white py-6 px-4 md:px-6 rounded-2xl flex-flex-col max-w-[731px] w-full",
				className,
			)}
		>
			<div className="flex flex-col gap-y-6 mb-6 md:mb-16 font-semibold">
				<p className="text-2xl md:text-4xl font-semibold max-w-[288px] md:max-w-[658px] opacity-80 uppercase text-primary-150">
					Join Kicks Club Get Rewarded Today.
				</p>
				<p className="text-sm md:text-base max-w-[683px] font-secondary opacity-80">
					As kicks club member you get rewarded with what you love for doing
					what you love. Sign up today and receive immediate access to these
					Level 1 benefits:
				</p>
				<ul className="font-secondary text-sm md:text-base opacity-80 ml-8 list-disc">
					<li>Free shipping</li>
					<li>A 15% off voucher for your next purchase</li>
					<li>Access to Members Only products and sales</li>
					<li>Access to adidas Running and Training apps</li>
					<li>Special offers and promotions</li>
				</ul>
				<p className="text-sm md:text-base max-w-[683px] font-secondary opacity-80">
					Join now to start earning points, reach new levels and unlock more
					rewards and benefits from adiClub.​
				</p>
			</div>
			<Button className="w-full justify-between">
				<span>join the club</span>
				<ArrowRight />
			</Button>
		</div>
	);
};
