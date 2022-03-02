import React from "react";
import { Box } from "../../helpers/Box";
import { Footer } from "../Footer";
import { Header } from "../Header";

export const Layout = ({ children, mainPage }) => {
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Header mainPage={mainPage} />
      <Box flex="1">{children}</Box>
      <Footer />
    </Box>
  );
};
