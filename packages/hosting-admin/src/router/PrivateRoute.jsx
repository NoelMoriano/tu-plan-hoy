import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthentication } from "../providers";

export const PrivateRoute = () => {
  const { authUser } = useAuthentication();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  const isEnabledAccess = () => {
    const rules = {
      isAuth: authUser,
    };

    return Object.values(rules).every((rule) => !!rule);
  };

  return isLoginPage || isEnabledAccess() ? <Outlet /> : <Navigate to="/" />;
};
