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
            {/* <Route path="/register" element={""} />
              <Route path="unauthorized" element={""} />
              <Route path="/forgot-password" element={""} />
              <Route path="auth/reset-password/:resetToken" element={""} />
              <Route path="auth/activate/:activation_token" element={""} /> */}
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
