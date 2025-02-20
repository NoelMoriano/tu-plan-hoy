import { firestore } from "../index";
import { fetchDocumentOnce } from "../utils";
import { fetchCollectionOnce, setDocument, updateDocument } from "../firestore";

export const categoriesRef = firestore.collection("categories");

export const getCategoryId = () => categoriesRef.doc().id;

export const fetchCategory = () => async (id) =>
  fetchDocumentOnce(categoriesRef.doc(id));

export const fetchCompanies = async () =>
  fetchCollectionOnce(categoriesRef.where("isDeleted", "==", false));

export const addCategory = async (category) =>
  setDocument(categoriesRef.doc(category.id), category);

export const updateCategory = async (categoryId, category) =>
  updateDocument(categoriesRef.doc(categoryId), category);
