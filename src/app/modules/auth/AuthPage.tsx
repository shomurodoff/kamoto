import { Route, Routes } from "react-router-dom";
import { Registration } from "./views/Registration";
import { ForgotPassword } from "./views/ForgotPassword";
import { Login } from "./views/Login";
import { AuthLayout } from "./AuthLayout";
import { ResetPassword } from "./views/ResetPassword";
import { ErrorsPage } from "../errors/ErrorsPage";

// @ts-ignore
import { AiPersonalityPage } from "../ai-personality/AiPersonalityPage";
import { MasterLayout } from "../../../_metronic/layout/MasterLayout";
import MarketPlaceOverviewPage from "../marketplace/pages/overview";

const AuthPage = () => (
  <Routes>
    <Route element={<MasterLayout />}>
      <Route path="login" element={<AiPersonalityPage />} />
      <Route
        path="/marketplace/overview"
        element={<MarketPlaceOverviewPage />}
      />
    </Route>
    <Route element={<AuthLayout />}>
      <Route path="registration" element={<Registration />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password/:token" element={<ResetPassword />} />
    </Route>
    <Route path="*" element={<ErrorsPage />} />
  </Routes>
);

export { AuthPage };
