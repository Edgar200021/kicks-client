import { toast } from "sonner";
import { useHandleError } from "@/common/hooks/use-handler-error";
import type { Brand } from "@/common/types/api";
import { validateSchema } from "@/common/utils/schema";
import { useRemoveBrandMutation } from "@/features/admin/brand/api/admin-brand-api.ts";
import { removeBrandInputSchema } from "@/features/admin/brand/schemas/remove-brand.schema.ts";

export const useRemoveBrand = (brandId: Brand["id"]) => {
	const [removeBrand, { isLoading, error }] = useRemoveBrandMutation();
	const { handleError } = useHandleError(error);

	const handleRemove = () => {
		toast(`Are you sure you want to remove the brand with ID ${brandId}?`, {
			action: {
				label: "Remove",
				onClick: async () => {
					const result = await validateSchema(removeBrandInputSchema, {
						id: brandId,
					});

					if (!result.success) {
						return;
					}

					toast.promise(removeBrand(result.data).unwrap(), {
						loading: "Loading...",
						success: () => {
							return `Brand with id ${brandId} successfully deleted`;
						},
						error: (err) => {
							handleError(err);
							return "";
						},
					});
				},
			},
			className: "md:w-[550px]!",
		});
	};

	return {
		removeBrand: handleRemove,
		isLoading,
		error,
	};
};
