import React from "react";
import { Router } from "./router/Router";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "./theme";
import { UserProvider } from "./shared/ui-kit/UserProvider";
import { store } from "./store";
import { Provider } from "react-redux";

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
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
