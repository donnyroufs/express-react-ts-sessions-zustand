import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CSSReset, theme, ThemeProvider } from "@chakra-ui/core";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CSSReset />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
