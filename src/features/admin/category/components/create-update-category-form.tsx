import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
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
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
} from "@/features/admin/category/api/admin-category-api.ts";
import {
	type CreateCategoryInput,
	createCategoryInputSchema,
} from "@/features/admin/category/schemas/create-category.schema.ts";
import {
	type UpdateCategoryInput,
	updateCategoryInputSchema,
} from "@/features/admin/category/schemas/update-category.schema.ts";
import { Button } from "@/common/components/ui/button/button.tsx";
import {
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	useState,
} from "react";

interface Props {
	className?: string;
	updateData?: UpdateCategoryInput;
	renderTrigger: (
		setIsOpen: Dispatch<SetStateAction<boolean>>,
		isOpen: boolean,
	) => ReactNode;
}

export const CreateUpdateCategoryForm = ({
	updateData,
	renderTrigger,
}: Props) => {
	const { control, handleSubmit } = useForm({
		resolver: zodResolver(
			!updateData ? createCategoryInputSchema : updateCategoryInputSchema,
		),
		defaultValues: updateData ?? {},
	});

	const { name } = useWatch({ control, disabled: !updateData });

	const [createCategory, { isLoading, error }] = useCreateCategoryMutation();
	const [updateCategory, { isLoading: updateLoading, error: updateError }] =
		useUpdateCategoryMutation({});

	const [open, setOpen] = useState(false);

	const { apiValidationErrors } = useHandleError<(keyof CreateCategoryInput)[]>(
		error || updateError,
	);

	const onSubmit = async (data: UpdateCategoryInput | CreateCategoryInput) => {
		if ("id" in data) {
			return await updateCategory(data).unwrap();
		}
		await createCategory(data);
		setOpen(false);
	};

	let btnText = "Loading...";

	if (updateData && !updateLoading) {
		btnText = "Update category";
	} else if (!updateData && !isLoading) {
		btnText = "Create category";
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{renderTrigger(setOpen, open)}</DialogTrigger>
			<DialogContent>
				<DialogHeader className="mb-5">
					<DialogTitle className="text-center">
						{!updateData ? "Create category" : "Update category"}
					</DialogTitle>
				</DialogHeader>

				<form onSubmit={handleSubmit(onSubmit)}>
					<FormInput
						disabled={isLoading || updateLoading}
						control={control}
						name="name"
						required
						placeholder="Category name"
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
