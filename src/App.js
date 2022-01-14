import React from "react";
import { Router } from "./router/Router";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "./theme";

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
