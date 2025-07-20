import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../frontend/src/Context/authContext";
import StoreContextProvider from "../../frontend/src/Context/StoreContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>

    <BrowserRouter>
      <StoreContextProvider>
        <App />

      </StoreContextProvider>
    </BrowserRouter>
  </AuthProvider>

);