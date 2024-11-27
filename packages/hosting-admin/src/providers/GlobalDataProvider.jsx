import React, { createContext, useContext, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthentication } from "./AuthenticationProvider";
import { notification, Spinner } from "../components/ui";
import { orderBy } from "lodash";
import { usersRef } from "../firebase/collections/index.js";

const GlobalDataContext = createContext({
  users: [],
});

export const GlobalDataProvider = ({ children }) => {
  const { authUser } = useAuthentication();

  const [users = [], usersLoading, usersError] = useCollectionData(
    authUser ? usersRef.where("isDeleted", "==", false) : null
  );

  const error = usersError;
  const loading = usersLoading;

  useEffect(() => {
    error && notification({ type: "error" });
  }, [error]);

  if (loading) return <Spinner height="100svh" />;

  return (
    <GlobalDataContext.Provider
      value={{
        users: orderBy(users, (user) => [user.createAt], ["desc"]),
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};

export const useGlobalData = () => useContext(GlobalDataContext);
