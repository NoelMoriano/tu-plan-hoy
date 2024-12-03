import { useCallback } from "react";
import { useApi } from "./useApi";

export const useApiCompanyPut = () => {
  const { put, loading, response } = useApi("/companies");

  const putCompany = useCallback(
    async (user) => {
      const url = `/${user.id}`;

      return put(url, user);
    },
    [put]
  );

  return {
    putCompany,
    putCompanyLoading: loading,
    putCompanyResponse: response,
  };
};
