import React from "react";
import { Router } from "./router/Router";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "./theme";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    min-width: 0;
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <GlobalStyle />
        <Router />
      </div>
    </ThemeProvider>
  );
}

export default App;
