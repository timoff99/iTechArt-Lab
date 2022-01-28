import React from "react";
import { Route, Routes } from "react-router-dom";

import { ROUTE_NAMES } from "./routeNames";

import { Home } from "../pages/Home";
import { LogIn } from "../pages/LogIn";
import { SignUp } from "../pages/SignUp";
import { Layout } from "../shared/ui-kit/Layout";

import { Test } from "../pages/Test";

import { CookBookSearch } from "../pages/CookBookSearch";

export const Router = () => {
  return (
    <Routes>
      <Route
        path={ROUTE_NAMES.HOME}
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />

      <Route path={ROUTE_NAMES.LOGIN} element={<LogIn />} />
      <Route path={ROUTE_NAMES.SIGNUP} element={<SignUp />} />

      <Route path="/test" element={<Test />} />

      <Route path={ROUTE_NAMES.COOKBOOK_SEARCH} element={<CookBookSearch />} />

    </Routes>
  );
};
