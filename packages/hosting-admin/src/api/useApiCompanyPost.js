import { useCallback } from "react";
import { useApi } from "./useApi";

// interface Return {
//   postUser: (user: OmitDefaultFirestoreProps<User>) => Promise<unknown>;
//   postUserLoading: boolean;
//   postUserResponse: Res<string>;
// }

export const useApiCompanyPost = () => {
  const { post, loading, response } = useApi("/companies");

  const postCompany = useCallback(
    async (company) => {
      const url = `/${company.id}`;

      return post(url, company);
    },
    [post]
  );

  return {
    postCompany,
    postCompanyLoading: loading,
    postCompanyResponse: response,
  };
};
