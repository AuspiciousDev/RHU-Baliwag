import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider";
import { UsersContextProvider } from "./context/UserContext";
import { InventoryContextProvider } from "./context/InventoryContext";
import { RequestContextProvider } from "./context/RequestContext";
import { LoginsContextProvider } from "./context/LoginContext";
import { RestockContextProvider } from "./context/RestockContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <UsersContextProvider>
        <InventoryContextProvider>
          <RequestContextProvider>
            <LoginsContextProvider>
              <RestockContextProvider>
                <App />
              </RestockContextProvider>
            </LoginsContextProvider>
          </RequestContextProvider>
        </InventoryContextProvider>
      </UsersContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
