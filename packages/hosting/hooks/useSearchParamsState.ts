import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

// 📌 Base structure by default
const DEFAULT_SEARCH_KEY: SearchKey = {
  text: "",
  maps: false,
  filters: {
    price: { min: "", max: "" },
    categories: [],
    dates: { key: "all", dateStart: "", dateEnd: "" },
    location: { z: 12, center: { lat: 0, lng: 0 } },
    city: [],
  },
  page: 1,
  country: "PE",
};

export const useSearchParamsState = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchKey, setSearchKey] = useState(DEFAULT_SEARCH_KEY);

  // 📌 Read `searchKey` from the URL on page load
  useEffect(() => {
    const searchKeyParam = searchParams.get("searchKey");
    if (searchKeyParam) {
      try {
        const parsedKey = JSON.parse(decodeURIComponent(searchKeyParam));
        setSearchKey((prev) => ({ ...prev, ...parsedKey }));
      } catch (error) {
        console.error("Error parsing searchKey:", error);
      }
    }
  }, [searchParams]);

  // 📌 Get the current state of searchKey with complete structure
  const getSearchKey = useCallback((): SearchKey => {
    const searchKey = searchParams.get("searchKey");
    const parsedKey = searchKey
      ? JSON.parse(decodeURIComponent(searchKey))
      : {};

    return { ...DEFAULT_SEARCH_KEY, ...parsedKey };
  }, [searchParams]);

  // 📌 🔥 Merge the new values with the existing ones in the URL
  const updateSearchKey = useCallback(
    (newValues: Partial<SearchKey>) => {
      const currentParams = getSearchKey();

      // 🔄 Keep existing values and merge new ones
      const updatedParams = {
        ...currentParams,
        ...newValues,
        filters: {
          ...currentParams.filters,
          ...newValues.filters,
        },
      };

      const encodedSearchKey = encodeURIComponent(
        JSON.stringify(updatedParams),
      );
      router.push(`?searchKey=${encodedSearchKey}`, { scroll: false });
    },
    [router, getSearchKey],
  );

  // 📌 🗑️ Delete a field, but keep the structure
  const removeSearchKeyField = useCallback(
    (key: keyof SearchKey) => {
      const currentParams = getSearchKey();
      const updatedParams = {
        ...currentParams,
        [key]: DEFAULT_SEARCH_KEY[key],
      };

      const encodedSearchKey = encodeURIComponent(
        JSON.stringify(updatedParams),
      );
      router.push(`?searchKey=${encodedSearchKey}`, { scroll: false });
    },
    [router, getSearchKey],
  );

  // 📌 🔄 Reset `searchKey` to its initial state
  const resetSearchKey = useCallback(() => {
    const encodedSearchKey = encodeURIComponent(
      JSON.stringify(DEFAULT_SEARCH_KEY),
    );
    router.push(`?searchKey=${encodedSearchKey}`, { scroll: false });
  }, [router]);

  return {
    searchKey,
    getSearchKey,
    updateSearchKey,
    removeSearchKeyField,
    resetSearchKey,
  };
};
