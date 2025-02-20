import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  AdvertisementIntegration,
  AdvertisementsIntegration,
  CategoriesIntegration,
  CategoryIntegration,
  Companies,
  CompanyIntegration,
  Login,
  Page403,
  Page404,
  UserIntegration,
  Users,
} from "../pages";
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
            <Companies />
          </BaseLayout>
        }
      />
      <Route
        exact
        path="/companies/:companyId"
        element={
          <BaseLayout>
            <CompanyIntegration />
          </BaseLayout>
        }
      />
      <Route
        exact
        path="/advertisements"
        element={
          <BaseLayout>
            <AdvertisementsIntegration />
          </BaseLayout>
        }
      />
      <Route
        exact
        path="/advertisements/:advertisementId"
        element={
          <BaseLayout>
            <AdvertisementIntegration />
          </BaseLayout>
        }
      />
      <Route
        exact
        path="/categories"
        element={
          <BaseLayout>
            <CategoriesIntegration />
          </BaseLayout>
        }
      />
      <Route
        exact
        path="/categories/:categoryId"
        element={
          <BaseLayout>
            <CategoryIntegration />
          </BaseLayout>
        }
      />
    </Route>
    {/*PUBLIC ROUTES*/}
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
