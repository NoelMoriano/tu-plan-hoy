"use client";
import React, { useEffect, useTransition } from "react";
import { useAppStore } from "@/store/useAppStore";
import { getCategories } from "@/services/globalFetchs";

interface Props {
  children?: React.ReactNode;
}

export const InitialGlobalProvider = ({ children }: Props) => {
  const [pendingCategories, startTransitionCategories] = useTransition();

  useEffect(() => {
    (async () => await initialFetch())();
  }, []);

  const initialFetch = async () => {
    startTransitionCategories(async () => {
      const categories = await getCategories();

      useAppStore.setState({
        categories,
        loadingCategories: pendingCategories,
      });
    });
  };

  return <div>{children}</div>;
};
