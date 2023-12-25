import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../src/assets/scss/App.scss";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./contexts/ModalProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <App />
      </ModalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
