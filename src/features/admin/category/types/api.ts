import type { ApiSuccessResponse, Category } from "@/common/types/api";
import type { CreateCategoryInput } from "../schemas/create-category.schema";
import type { GetAllCategoriesInput } from "../schemas/get-all-categories.schema";
import type { RemoveCategoryInput } from "../schemas/remove-category.schema";
import type { UpdateCategoryInput } from "../schemas/update-category.schema";

export type GetAllCategoriesRequest = GetAllCategoriesInput;
export type GetAllCategoriesResponse = ApiSuccessResponse<Category[]>;

export type CreateCategoryRequest = CreateCategoryInput;
export type CreateCategoryResponse = ApiSuccessResponse<Category>;

export type UpdateCategoryRequest = UpdateCategoryInput;
export type UpdateCategoryResponse = ApiSuccessResponse<null>;

export type RemoveCategoryRequest = RemoveCategoryInput;
export type RemoveCategoryResponse = ApiSuccessResponse<null>;
