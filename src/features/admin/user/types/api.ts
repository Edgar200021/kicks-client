import type {
	AdminUser,
	ApiSuccessResponse,
	WithPageCountResponse,
} from "@/common/types/api";
import type { GetAllUsersInput } from "../schemas/get-all-users.schema";

export type GetAllUsersRequest = GetAllUsersInput;
export type GetAllUsersResponse = ApiSuccessResponse<
	WithPageCountResponse<"users", AdminUser[]>
>;
