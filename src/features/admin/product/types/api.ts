import type {
	AdminProduct,
	AdminProductFilters,
	ApiSuccessResponse,
	WithPageCountResponse,
} from "@/common/types/api";

import type { GetAllAdminProductsInput } from "@/features/admin/product/schemas/get-all-admin-products.schema.ts";

export type GetAllAdminProductsRequest = GetAllAdminProductsInput;
export type GetAllAdminProductsResponse = ApiSuccessResponse<
	WithPageCountResponse<"products", AdminProduct[]>
>;

export type GetAdminProductFiltersRequest = null;
export type GetAdminProductFiltersResponse =
	ApiSuccessResponse<AdminProductFilters>;
