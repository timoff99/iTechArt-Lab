import React from "react";
import { Router } from "./router/Router";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "./theme";
import { UserProvider } from "./shared/ui-kit/UserProvider";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <GlobalStyle />
        <UserProvider>
          <Router />
        </UserProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
