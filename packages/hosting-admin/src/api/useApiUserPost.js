import { useCallback } from "react";
import { useApi } from "./useApi";

export const useApiUserPost = () => {
  const { post, loading, response } = useApi("/users/:userId");

  const postUser = useCallback(
    async (user) => {
      return post(user);
    },
    [post]
  );

  return {
    postUser,
    postUserLoading: loading,
    postUserResponse: response,
  };
};
