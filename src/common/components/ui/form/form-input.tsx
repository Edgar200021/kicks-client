import { type ComponentProps, useId } from "react";
import {
	type Control,
	Controller,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import { Input } from "@/common/components/ui/input/input";
import { cn } from "@/common/utils/cn.ts";

type FormInputProps<T extends FieldValues> = {
	control: Control<T>;
	name: FieldPath<T>;
	label?: string;
	error?: string;
} & ComponentProps<"input">;

export function FormInput<T extends FieldValues>({
	control,
	name,
	label,
	required,
	className,
	error,
	...rest
}: FormInputProps<T>) {
	const id = useId();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<div className={cn("flex flex-col gap-1", className)}>
					{label && (
						<label htmlFor={id} className="text-sm font-medium">
							{label} {required && "*"}
						</label>
					)}

					<Input {...rest} {...field} id={id} required={required} />

					{(fieldState.error || error) && (
						<span className="text-red-400 text-sm">
							{fieldState.error?.message || error}
						</span>
					)}
				</div>
			)}
		/>
	);
}