import { useCallback } from "react";
import { useApi } from "./useApi";

// interface Return {
//   postUser: (user: OmitDefaultFirestoreProps<User>) => Promise<unknown>;
//   postUserLoading: boolean;
//   postUserResponse: Res<string>;
// }

export const useApiCompanyPost = () => {
  const { post, loading, response } = useApi("/company");

  const postCompany = useCallback(
    async (company) => {
      const url = `/`;

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
