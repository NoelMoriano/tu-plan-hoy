import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  loadingCategories: boolean;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      categories: [],
      setCategories: (categories) => set({ categories }),
      loadingCategories: true,
    }),
    { name: "app-storage" },
  ),
);
