import type { ApiSuccessResponse, Brand } from "@/common/types/api";

import type { GetAllBrandsInput } from "@/features/admin/brand/schemas/get-all-brands.schema.ts";
import type { CreateBrandInput } from "@/features/admin/brand/schemas/create-brand.schema.ts";
import type { UpdateBrandInput } from "@/features/admin/brand/schemas/update-brand.schema.ts";
import type { RemoveBrandInput } from "@/features/admin/brand/schemas/remove-brand.schema.ts";

export type GetAllBrandsRequest = GetAllBrandsInput;
export type GetAllBrandsResponse = ApiSuccessResponse<Brand[]>;

export type CreateBrandRequest = CreateBrandInput;
export type CreateBrandResponse = ApiSuccessResponse<Brand>;

export type UpdateBrandRequest = UpdateBrandInput;
export type UpdateBrandResponse = ApiSuccessResponse<null>;

export type RemoveBrandRequest = RemoveBrandInput;
export type RemoveBrandResponse = ApiSuccessResponse<null>;
