import { useCallback } from "react";
import { useApi } from "./useApi";

export const useApiAdvertisementPatch = () => {
  const { loading, patch, response } = useApi("/advertisements");

  const patchAdvertisement = useCallback(
    async (advertisement) => {
      const url = `/${advertisement.id}`;

      return patch(url, advertisement);
    },
    [patch]
  );

  return {
    patchAdvertisement,
    patchAdvertisementLoading: loading,
    patchAdvertisementResponse: response,
  };
};
