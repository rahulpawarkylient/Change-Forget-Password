import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";
import Regiseter from "./Register/Register";
import Forgot from "./ForgotPassword/Forgot";
import ResetPassword from "./ForgotPassword/ResetPassword";
import ChangePassword from "./ChangePassword/ChangePassword";
import { PrivateRoutes, PublicRoutes } from "./PrivateRoutes";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/changepassword" element={<ChangePassword />} />
          </Route>
          <Route element={<PublicRoutes />}>
            <Route path="/register" element={<Regiseter />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotPassword" element={<Forgot />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
