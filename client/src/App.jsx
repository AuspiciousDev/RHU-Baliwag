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
            {/* <Route path="/register" element={""} />
              <Route path="unauthorized" element={""} />
             
              <Route path="auth/reset-password/:resetToken" element={""} />
              */}
            <Route path="*" element={<NotFound404 />} />
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={[USER_TYPE.ADMIN]} />}>
                <Route path="/admin" element={<ADMIN_Layout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="request" element={<Inventory />} />
                  <Route path="transaction" element={<Transaction />} />
                  <Route path="inventory" element={<Inventory />} />
                  <Route path="restock" element={<Restock />} />
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
