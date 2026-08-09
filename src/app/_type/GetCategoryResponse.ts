import { Category } from "@/generated/prisma/client";

export type GetCategoryResponse = {
  categories: Category[];
};
