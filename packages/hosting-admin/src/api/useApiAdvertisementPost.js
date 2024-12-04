import { useCallback } from "react";
import { useApi } from "./useApi";

export const useApiAdvertisementPost = () => {
  const { post, loading, response } = useApi("/advertisement");

  const postAdvertisement = useCallback(
    async (advertisement) => {
      return post(advertisement);
    },
    [post]
  );

  return {
    postAdvertisement,
    postAdvertisementLoading: loading,
    postAdvertisementResponse: response,
  };
};
