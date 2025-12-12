import { toast } from "sonner";
import { useHandleError } from "@/common/hooks/use-handler-error";
import type { AdminUser } from "@/common/types/api";
import { validateSchema } from "@/common/utils/schema";
import { useBlockToggleMutation } from "@/features/admin/user/api/admin-user-api";
import { blockToggleInputSchema } from "@/features/admin/user/schemas/block-toggle.schema";

export const useBlockToggle = (
	userId: AdminUser["id"],
	isBanned: AdminUser["isBanned"],
) => {
	const [blockToggle, { isLoading, error }] = useBlockToggleMutation();
	useHandleError(error);

	const handleBan = () => {
		const action = isBanned ? "Unblock" : "Block";

		toast(`Are you sure you want to ${action} the user with ID ${userId}?`, {
			action: {
				label: action,
				onClick: async () => {
					const result = await validateSchema(blockToggleInputSchema, {
						id: userId,
					});

					if (!result.success) {
						return;
					}

					toast.promise(blockToggle(result.data).unwrap(), {
						loading: "Loading...",
						success: () => {
							return `\`${action}\` action completed for user ${userId}`;
						},
					});
				},
			},
			className: "md:w-[550px]!",
		});
	};

	return {
		blockToggle: handleBan,
		isLoading,
		error,
	};
};
