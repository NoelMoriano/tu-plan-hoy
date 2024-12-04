import { useCallback } from "react";
import { useApi } from "./useApi";

export const useApiAdvertisementPut = () => {
  const { put, loading, response } = useApi("/advertisements");

  const putAdvertisement = useCallback(
    async (advertisement) => {
      const url = `/${advertisement.id}`;

      return put(url, advertisement);
    },
    [put]
  );

  return {
    putAdvertisement,
    putAdvertisementLoading: loading,
    putAdvertisementResponse: response,
  };
};
