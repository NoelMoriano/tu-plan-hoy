import { useCallback } from "react";
import { useApi } from "./useApi";

export const useApiCompanyPost = () => {
  const { post, loading, response } = useApi(`/companies/:companyId`);

  const postCompany = useCallback(
    async (company) => {
      return post(company);
    },
    [post]
  );

  return {
    postCompany,
    postCompanyLoading: loading,
    postCompanyResponse: response,
  };
};
