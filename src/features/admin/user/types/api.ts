import type {
	AdminUser,
	ApiSuccessResponse,
	WithPageCountResponse,
} from "@/common/types/api";
import type { BlockToggleInput } from "@/features/admin/user/schemas/block-toggle.schema";
import type { RemoveUserInput } from "@/features/admin/user/schemas/remove-user.schema";
import type { GetAllUsersInput } from "../schemas/get-all-users.schema";

export type GetAllUsersRequest = GetAllUsersInput;
export type GetAllUsersResponse = ApiSuccessResponse<
	WithPageCountResponse<"users", AdminUser[]>
>;

export type BlockToggleRequest = BlockToggleInput;
export type BlockToggleResponse = ApiSuccessResponse<null>;

export type RemoveUserRequest = RemoveUserInput;
export type RemoveUserResponse = ApiSuccessResponse<null>;
