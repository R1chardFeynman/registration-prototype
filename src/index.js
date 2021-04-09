import React from "react";
import ReactDOM from "react-dom";
import { App } from "components/App";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { StoreProvider } from "stores";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Router>
      <StoreProvider>
        <App />
      </StoreProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
