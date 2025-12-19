import type {
	AdminProduct,
	AdminProductFilters,
	ApiSuccessResponse,
	WithPageCountResponse,
} from "@/common/types/api";

import type {
	GetAllAdminProductsInput
} from "@/features/admin/product/schemas/get-all-admin-products.schema.ts";
import type {CreateProductInput} from "@/features/admin/product/schemas/create-product.schema.ts";
import type {UpdateProductInput} from "@/features/admin/product/schemas/update-product.schema.ts";
import type {RemoveProductInput} from "@/features/admin/product/schemas/remove-product.schema.ts";

export type GetAllAdminProductsRequest = GetAllAdminProductsInput;
export type GetAllAdminProductsResponse = ApiSuccessResponse<
	WithPageCountResponse<"products", AdminProduct[]>
>;

export type GetAdminProductFiltersRequest = null;
export type GetAdminProductFiltersResponse =
	ApiSuccessResponse<AdminProductFilters>;

export type CreateProductRequest = CreateProductInput
export type CreateProductResponse = ApiSuccessResponse<{ id: AdminProduct["id"] }>

export type UpdateProductRequest = UpdateProductInput
export type UpdateProductResponse = ApiSuccessResponse<null>

export type RemoveProductRequest = RemoveProductInput
export type RemoveProductResponse = ApiSuccessResponse<null>