import React from "react";
import { Route, Routes } from "react-router-dom";

import { ROUTE_NAMES } from "./routeNames";

import { Home } from "../pages/Home";
import { LogIn } from "../pages/LogIn";
import { SignUp } from "../pages/SignUp";
import { Layout } from "../shared/ui-kit/Layout";

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
    </Routes>
  );
};
