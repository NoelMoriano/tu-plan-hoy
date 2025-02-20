import React, { createContext, useContext, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthentication } from "./AuthenticationProvider";
import { notification, Spinner } from "../components/ui";
import { orderBy } from "lodash";
import {
  advertisementsRef,
  categoriesRef,
  companiesRef,
  usersRef,
} from "../firebase/collections";

const GlobalDataContext = createContext({
  users: [],
  categories: [],
  companies: [],
  advertisements: [],
});

export const GlobalDataProvider = ({ children }) => {
  const { authUser } = useAuthentication();

  const [users = [], usersLoading, usersError] = useCollectionData(
    authUser ? usersRef.where("isDeleted", "==", false) : null
  );

  const [categories = [], categoriesLoading, categoriesError] =
    useCollectionData(
      authUser ? categoriesRef.where("isDeleted", "==", false) : null
    );

  const [companies = [], companiesLoading, companiesError] = useCollectionData(
    authUser ? companiesRef.where("isDeleted", "==", false) : null
  );

  const [advertisements = [], advertisementsLoading, advertisementsError] =
    useCollectionData(
      authUser ? advertisementsRef.where("isDeleted", "==", false) : null
    );

  const error =
    usersError || categoriesError || companiesError || advertisementsError;
  const loading =
    usersLoading ||
    categoriesLoading ||
    companiesLoading ||
    advertisementsLoading;

  useEffect(() => {
    error && notification({ type: "error" });
  }, [error]);

  if (loading) return <Spinner height="100svh" />;

  return (
    <GlobalDataContext.Provider
      value={{
        users: orderBy(users, (user) => [user.createAt], ["desc"]),
        categories: orderBy(categories, (categories) => [categories.createAt], [
          "desc",
        ]),
        companies: orderBy(companies, (company) => [company.createAt], [
          "desc",
        ]),
        advertisements: orderBy(
          advertisements,
          (advertisement) => [advertisement.createAt],
          ["desc"]
        ),
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};

export const useGlobalData = () => useContext(GlobalDataContext);
