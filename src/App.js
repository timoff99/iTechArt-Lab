import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { UserProvider } from "./shared/ui-kit/UserProvider";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { Router } from "./router/Router";
import theme from "./theme";
import { store } from "./store";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
  }
`;

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <GlobalStyle />
          <UserProvider>
            <Router />
          </UserProvider>
          <ToastContainer theme="colored" position="bottom-right" />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
