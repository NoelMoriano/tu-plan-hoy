import { Category } from "../globalTypes";

export const getCategoriesByIds = (
  categories: Category[],
  categoryIds: string[]
): Category[] =>
  categories.filter((category) => categoryIds.includes(category.id));
