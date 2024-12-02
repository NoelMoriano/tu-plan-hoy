import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Page403, Page404, UserIntegration, Users } from "../pages";
import { BaseLayout } from "../components/layout";
import { PrivateRoute } from "./PrivateRoute";

export const Router = () => (
  <Routes>
    <Route exact path="/login" element={<Login />} />

    <Route path="/" element={<PrivateRoute />}>
      <Route
        exact
        path="/"
        element={
          <BaseLayout>
            <Users />
          </BaseLayout>
        }
      />
      <Route
        exact
        path="/users"
        element={
          <BaseLayout>
            <Users />
          </BaseLayout>
        }
      />
      <Route
        exact
        path="/users/:userId"
        element={
          <BaseLayout>
            <UserIntegration />
          </BaseLayout>
        }
      />
      <Route
        exact
        path="/companies"
        element={
          <BaseLayout>
            <h2>Modulo de companias</h2>
          </BaseLayout>
        }
      />
      <Route
        exact
        path="/advertisements"
        element={
          <BaseLayout>
            <h2>Modulo donde se visualizaran los anuncios</h2>
          </BaseLayout>
        }
      />
    </Route>

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
