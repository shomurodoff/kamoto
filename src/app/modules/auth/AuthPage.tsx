import { Route, Routes } from "react-router-dom";
import { Registration } from "./views/Registration";
import { ForgotPassword } from "./views/ForgotPassword";
import { Login } from "./views/Login";
import { AuthLayout } from "./AuthLayout";
import { ResetPassword } from "./views/ResetPassword";
import { ErrorsPage } from "../errors/ErrorsPage";

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="login" element={<Login />} />
      <Route path="registration" element={<Registration />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password/:token" element={<ResetPassword />} />
    </Route>
    <Route path="*" element={<ErrorsPage />} />
  </Routes>
);

export { AuthPage };
