import { useCallback } from "react";
import { useApi } from "./useApi";

export const useApiCompanyPatch = () => {
  const { loading, patch, response } = useApi("/companies");

  const patchCompany = useCallback(
    async (company) => {
      const url = `/${company.id}`;

      return patch(url, company);
    },
    [patch]
  );

  return {
    patchCompany,
    patchCompanyLoading: loading,
    patchCompanyResponse: response,
  };
};
