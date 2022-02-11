import React from "react";
import { Route, Routes } from "react-router-dom";

import { ROUTE_NAMES } from "./routeNames";

import { Layout } from "../shared/ui-kit/Layout";

import { Home } from "../pages/Home";
import { LogIn } from "../pages/LogIn";
import { SignUp } from "../pages/SignUp";
import { Search } from "../pages/Search";
import { Profile } from "../pages/Profile";

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

      <Route
        path={ROUTE_NAMES.SEARCH}
        element={
          <Layout>
            <Search />
          </Layout>
        }
      />
      <Route
        path={ROUTE_NAMES.PROFILE}
        element={
          <Layout>
            <Profile />
          </Layout>
        }
      />
    </Routes>
  );
};
