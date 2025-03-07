import type { Company } from "../../globalTypes";
import { firestore, setDocument } from "../index";
import {
  fetchCollection,
  fetchDocument,
  mergeDocument,
  updateDocument,
  WhereClauses,
} from "../index";

export const companiesRef = firestore.collection("companies");

export const getCompanyId = (): string => companiesRef.doc().id;

export const fetchCompanies = async (
  whereClauses?: WhereClauses<Company>[],
  limit?: number
): Promise<Company[]> =>
  fetchCollection<Company>(
    limit ? companiesRef.limit(limit) : companiesRef,
    whereClauses
  );

export const companyRef = (id: string) => companiesRef.doc(id);

export const fetchCompany = async (
  companyId: string
): Promise<Company | undefined> =>
  fetchDocument<Company>(companiesRef.doc(companyId));

export const addCompany = async (company: Company) =>
  setDocument<Company>(companiesRef.doc(company.id), company);

export const updateCompany = async (
  companyId: string,
  company: Partial<FirestoreFieldValue<Company>>
) =>
  updateDocument<Partial<FirestoreFieldValue<Company>>>(
    companiesRef.doc(companyId),
    company
  );

export const mergeCompany = async (
  companyId: string,
  company: Partial<FirestoreFieldValue<Company>>
) => mergeDocument(companiesRef.doc(companyId), company);
