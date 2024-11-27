import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Page403, Page404, UserIntegration, Users } from "../pages";
import { BaseLayout } from "../components/layout";
import { PrivateRoute } from "./PrivateRoute";

export const Router = () => (
  <Routes>
    <Route exact path="/login" element={<Login />} />
    <Route
      exact
      path="/users"
      element={
        <PrivateRoute>
          <BaseLayout>
            <Users />
          </BaseLayout>
        </PrivateRoute>
      }
    />
    <Route
      exact
      path="/users/:userId"
      element={
        <PrivateRoute>
          <BaseLayout>
            <UserIntegration />
          </BaseLayout>
        </PrivateRoute>
      }
    />
    <Route
      exact
      path="/403"
      element={
        <BaseLayout>
          <Page403 />
        </BaseLayout>
      }
    />
    <Route
      exact
      path="*"
      element={
        <BaseLayout>
          <Page404 />
        </BaseLayout>
      }
    />
  </Routes>
);
