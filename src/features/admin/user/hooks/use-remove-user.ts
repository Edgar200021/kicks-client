import { toast } from "sonner";
import { useHandleError } from "@/common/hooks/use-handler-error";
import type { AdminUser } from "@/common/types/api";
import { validateSchema } from "@/common/utils/schema";
import { useRemoveUserMutation } from "@/features/admin/user/api/admin-user-api";
import { removeUserInputSchema } from "@/features/admin/user/schemas/remove-user.schema";

export const useRemoveUser = (userId: AdminUser["id"]) => {
	const [removeUser, { isLoading, error }] = useRemoveUserMutation();
	const { handleError } = useHandleError(error);

	const handleRemove = () => {
		toast(`Are you sure you want to remove the user with ID ${userId}?`, {
			action: {
				label: "Remove",
				onClick: async () => {
					const result = await validateSchema(removeUserInputSchema, {
						id: userId,
					});

					if (!result.success) {
						return;
					}

					toast.promise(removeUser(result.data).unwrap(), {
						loading: "Loading...",
						success: () => {
							return `User with id ${userId} successfully deleted`;
						},
						error: (err) => {
							handleError(err);
							return "";
						},
						// error: handleError,
					});
				},
			},
			className: "md:w-[550px]!",
		});
	};

	return {
		removeUser: handleRemove,
		isLoading,
		error,
	};
};
