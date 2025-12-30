import { type ChangeEvent, type ComponentProps, useRef } from "react";
import galleryIcon from "@/common/assets/icons/gallery.svg";
import { cn } from "@/common/utils/cn.ts";

interface Props extends ComponentProps<"input"> {
	className?: string;
	maxLength: number;
	maxSize: number;
	types?: ("jpeg" | "jpg" | "png" | "svg" | "webp")[];
	onSetFiles: (files: File[]) => void;
}

export const ImagePicker = ({
	className,
	types = ["jpeg", "png"],
	maxLength,
	maxSize,
	onSetFiles,
	disabled,
	...rest
}: Props) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const accept = types.map((t) => `.${t}`).join(", ");

	const handleSetFiltes = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files) return;

		const filtered = Array.from(files)
			.slice(0, maxLength)
			.filter((f) => f.size <= maxSize);
		onSetFiles(filtered);
	};

	return (
		<div
			className={cn(
				"rounded-xl border border-dashed pt-[26px] pb-4 max-w-[457px]",
				className,
				disabled && "border-gray-300 bg-gray-50 cursor-not-allowed",
				!disabled && "border-primary-150",
			)}
		>
			<div className="max-w-[262px] mx-auto w-full flex flex-col gap-y-[26px] items-center text-center">
				<img
					width={51}
					height={43}
					src={galleryIcon}
					alt="gallery"
					className={disabled ? "opacity-40" : ""}
				/>
				<p
					onClick={() => {
						inputRef.current?.click();
					}}
					className={cn(
						"font-semibold font-secondary flex flex-col gap-y-2",
						disabled ? "text-gray-400" : "text-primary-100 cursor-pointer",
					)}
					role="button"
				>
					<span>Drop your imager here, or browse</span>
					<span>{types?.join(", ")}&nbsp;are allowed</span>
				</p>
			</div>
			<input
				className="hidden"
				{...rest}
				disabled={disabled}
				ref={inputRef}
				type="file"
				accept={accept}
				multiple
				onChange={handleSetFiltes}
			/>
		</div>
	);
};
