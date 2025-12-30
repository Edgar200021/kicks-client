import type {
	AdminProduct,
	AdminProductFilters,
	AdminProductSku,
	ApiSuccessResponse,
	WithPageCountResponse,
} from "@/common/types/api";
import type { CreateProductInput } from "@/features/admin/product/schemas/create-product.schema.ts";
import type { CreateProductSkuInput } from "@/features/admin/product/schemas/create-product-sku.schema.ts";
import type { GetAdminProductInput } from "@/features/admin/product/schemas/get-admin-product.schema.ts";
import type { GetAllAdminProductsInput } from "@/features/admin/product/schemas/get-all-admin-products.schema.ts";
import type { GetAllAdminProductsSkuInput } from "@/features/admin/product/schemas/get-all-admin-products-sku.schema.ts";
import type { RemoveProductInput } from "@/features/admin/product/schemas/remove-product.schema.ts";
import type { UpdateProductInput } from "@/features/admin/product/schemas/update-product.schema.ts";

export type GetAllAdminProductsRequest = GetAllAdminProductsInput;
export type GetAllAdminProductsResponse = ApiSuccessResponse<
	WithPageCountResponse<"products", AdminProduct[]>
>;

export type GetAllAdminProductsSkuRequest = GetAllAdminProductsSkuInput;
export type GetAllAdminProductsSkuResponse = ApiSuccessResponse<
	WithPageCountResponse<"productsSku", AdminProductSku[]>
>;

export type GetAdminProductRequest = GetAdminProductInput;
export type GetAdminProductResponse = ApiSuccessResponse<AdminProduct>;

export type GetAdminProductFiltersRequest = null;
export type GetAdminProductFiltersResponse =
	ApiSuccessResponse<AdminProductFilters>;

export type CreateProductRequest = CreateProductInput;
export type CreateProductResponse = ApiSuccessResponse<{
	id: AdminProduct["id"];
}>;

export type CreateProductSkuRequest = CreateProductSkuInput;
export type CreateProductSkuResponse = ApiSuccessResponse<{
	id: AdminProductSku["id"];
}>;

export type UpdateProductRequest = UpdateProductInput;
export type UpdateProductResponse = ApiSuccessResponse<null>;

export type RemoveProductRequest = RemoveProductInput;
export type RemoveProductResponse = ApiSuccessResponse<null>;
