import { zodResolver } from "@hookform/resolvers/zod";
import {
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	useState,
} from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/common/components/ui/button/button.tsx";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/common/components/ui/dialog/dialog";
import { FormInput } from "@/common/components/ui/form/form-input.tsx";
import { useHandleError } from "@/common/hooks/use-handler-error.ts";
import {
	useCreateBrandMutation,
	useUpdateBrandMutation,
} from "@/features/admin/brand/api/admin-brand-api.ts";
import {
	type CreateBrandInput,
	createBrandInputSchema,
} from "@/features/admin/brand/schemas/create-brand.schema.ts";
import {
	type UpdateBrandInput,
	updateBrandInputSchema,
} from "@/features/admin/brand/schemas/update-brand.schema.ts";

interface Props {
	className?: string;
	updateData?: UpdateBrandInput;
	renderTrigger: (
		setIsOpen: Dispatch<SetStateAction<boolean>>,
		isOpen: boolean,
	) => ReactNode;
}

export const CreateUpdateBrandForm = ({ updateData, renderTrigger }: Props) => {
	const { control, handleSubmit } = useForm({
		resolver: zodResolver(
			!updateData ? createBrandInputSchema : updateBrandInputSchema,
		),
		defaultValues: updateData ?? {},
	});

	console.log(updateData);

	const { name } = useWatch({ control, disabled: !updateData });

	const [createBrand, { isLoading, error }] = useCreateBrandMutation();
	const [updateBrand, { isLoading: updateLoading, error: updateError }] =
		useUpdateBrandMutation({});

	const [open, setOpen] = useState(false);

	const { apiValidationErrors } = useHandleError<(keyof CreateBrandInput)[]>(
		error || updateError,
	);

	const onSubmit = async (data: UpdateBrandInput | CreateBrandInput) => {
		if ("id" in data) {
			await updateBrand(data).unwrap();
		} else {
			await createBrand(data).unwrap();
		}

		setOpen(false);
	};

	let btnText = "Loading...";

	if (updateData && !updateLoading) {
		btnText = "Update brand";
	} else if (!updateData && !isLoading) {
		btnText = "Create brand";
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{renderTrigger(setOpen, open)}</DialogTrigger>
			<DialogContent>
				<DialogHeader className="mb-5">
					<DialogTitle className="text-center">
						{!updateData ? "Create brand" : "Update brand"}
					</DialogTitle>
				</DialogHeader>

				<form onSubmit={handleSubmit(onSubmit)}>
					<FormInput
						disabled={isLoading || updateLoading}
						control={control}
						name="name"
						required
						placeholder="Brand name"
						error={apiValidationErrors.name}
						className="mb-5"
					/>

					<Button disabled={updateData && name === updateData.name}>
						{btnText}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};
