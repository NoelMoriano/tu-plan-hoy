import type { Category } from "../../globalTypes";
import { firestore, setDocument } from "../index";
import {
  fetchCollection,
  fetchDocument,
  mergeDocument,
  updateDocument,
  WhereClauses,
} from "../index";

export const categoriesRef = firestore.collection("categories");

export const getCategoryId = (): string => categoriesRef.doc().id;

export const fetchCategories = async (
  whereClauses?: WhereClauses<Category>[],
  limit?: number
): Promise<Category[]> =>
  fetchCollection<Category>(
    limit ? categoriesRef.limit(limit) : categoriesRef,
    whereClauses
  );

export const categoryRef = (id: string) => categoriesRef.doc(id);

export const fetchCategory = async (
  categoryId: string
): Promise<Category | undefined> =>
  fetchDocument<Category>(categoriesRef.doc(categoryId));

export const addCategory = async (category: Category) =>
  setDocument<Category>(categoriesRef.doc(category.id), category);

export const updateCategory = async (
  categoryId: string,
  category: Partial<FirestoreFieldValue<Category>>
) =>
  updateDocument<Partial<FirestoreFieldValue<Category>>>(
    categoriesRef.doc(categoryId),
    category
  );

export const mergeCategory = async (
  categoryId: string,
  category: Partial<FirestoreFieldValue<Category>>
) => mergeDocument(categoriesRef.doc(categoryId), category);
