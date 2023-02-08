import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider";
import { UsersContextProvider } from "./context/UserContext";
import { InventoryContextProvider } from "./context/InventoryContext";
import { RequestContextProvider } from "./context/RequestContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <UsersContextProvider>
        <InventoryContextProvider>
          <RequestContextProvider>
            <App />
          </RequestContextProvider>
        </InventoryContextProvider>
      </UsersContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
