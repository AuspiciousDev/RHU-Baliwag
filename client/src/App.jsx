import "./App.css";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
// ! PUBLIC ROUTES
import NotFound404 from "./page/public/NotFound404";
import Home from "./page/public/Home";
import Login from "./page/public/Login";
import ForgotPassword from "./page/public/ForgotPassword";

import InventoryPublic from "./page/admin/Inventory/InventoryPublic";
import RequestCreatePublic from "./page/admin/Request/RequestCreatePublic";
// ! PRIVATE ROUTES

import PersistLogin from "./page/components/PersistLogin";
import RequireAuth from "./page/components/RequireAuth";
import Activate from "./page/public/Activate";

import Dashboard from "./page/admin/Dashboard/Dashboard";
import ADMIN_Layout from "./page/admin/Layout/ADMIN_Layout";
import User from "./page/admin/User/User";
import UserCreate from "./page/admin/User/UserCreate";
import UserRecord from "./page/admin/User/UserRecord";
import UserRecordEdit from "./page/admin/User/UserRecordEdit";
import ChangePassword from "./page/admin/User/ChangePassword";

import Inventory from "./page/admin/Inventory/Inventory";
import Archive from "./page/admin/Archive/Archive";
import Restock from "./page/admin/Restock/Restock";
import Transaction from "./page/admin/Transaction/Transaction";
import InventoryCreate from "./page/admin/Inventory/InventoryCreate";
import RestockCreate from "./page/admin/Restock/RestockCreate";
import Request from "./page/admin/Request/Request";
import RequestCreate from "./page/admin/Request/RequestCreate";
import RequestDetails from "./page/admin/Request/RequestDetails";
import TransactionsDetails from "./page/admin/Transaction/TransactionDetails";
import InventoryEdit from "./page/admin/Inventory/InventoryEdit";
import ResetPassword from "./page/public/ResetPassword";
import Admin from "./page/admin/Admin/Admin";
import AdminCreate from "./page/admin/Admin/AdminCreate";
import AdminRecord from "./page/admin/Admin/AdminRecord";
import AdminRecordEdit from "./page/admin/Admin/AdminRecordEdit";

const USER_TYPE = {
  ADMIN: "admin",
  DISTRIBUTOR: "distributor",
};
function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route
              path="auth/activate/:activation_token"
              element={<Activate />}
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/public/inventory" element={<InventoryPublic />} />
            <Route path="/public/request" element={<RequestCreatePublic />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {/* <Route path="/register" element={""} />
              <Route path="unauthorized" element={""} />
              */}
            <Route
              path="auth/reset-password/:resetToken"
              element={<ResetPassword />}
            />

            <Route path="*" element={<NotFound404 />} />
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={[USER_TYPE.ADMIN]} />}>
                <Route path="/admin" element={<ADMIN_Layout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="request" element={<Request />} />
                  <Route
                    path="request/details/:reqID"
                    element={<RequestDetails />}
                  />
                  <Route path="request/create" element={<RequestCreate />} />
                  <Route path="transaction" element={<Transaction />} />
                  <Route
                    path="transaction/details/:transID"
                    element={<TransactionsDetails />}
                  />
                  <Route path="inventory" element={<Inventory />} />
                  <Route
                    path="inventory/edit/:medID"
                    element={<InventoryEdit />}
                  />
                  <Route
                    path="inventory/create"
                    element={<InventoryCreate />}
                  />
                  <Route path="restock" element={<Restock />} />
                  <Route path="restock/create" element={<RestockCreate />} />
                  <Route path="user" element={<User />} />
                  <Route path="user/create" element={<UserCreate />} />
                  <Route
                    path="user/profile/:username"
                    element={<UserRecord />}
                  />
                  <Route
                    path="user/edit/:username"
                    element={<UserRecordEdit />}
                  />
                  <Route
                    path="user/changePassword"
                    element={<ChangePassword />}
                  />

                  <Route path="archive" element={<Archive />} />
                  <Route path="admin" element={<Admin />} />
                  <Route path="admin/create" element={<AdminCreate />} />
                  <Route
                    path="admin/edit/:username"
                    element={<AdminRecordEdit />}
                  />
                  <Route
                    path="admin/profile/:username"
                    element={<AdminRecord />}
                  />
                </Route>
              </Route>
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
