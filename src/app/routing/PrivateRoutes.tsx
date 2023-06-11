import { FC, Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";

import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
import { WithChildren } from "../../_metronic/helpers";

import { OnboardingRoutes } from "../modules/onboarding";
import { useAuth } from "../modules/auth";
import { ToolbarWrapper } from "../../_metronic/layout/components/toolbar";

import { InvestorCrmRoutes } from "../modules/investor-crm/InvestorCrmRoutes";
import { ErrorsPage } from "../modules/errors/ErrorsPage";
import DataRoomsRoutes from "../modules/data-rooms/DataRoomsRoutes";
import { DashboardPage } from "../modules/dashboard/DashboardPage";
import { AiPersonalityPage } from "../modules/ai-personality/AiPersonalityPage";
import SupportPage from "../modules/support";
import Sitemap from "../modules/sitemap";
import ChatCreditsPage from "../modules/chat-credits";
import MarketplaceRouting from "../modules/marketplace/MarketplaceRouting";
import MarketplacePublicLayout from "../../_metronic/layout/marketplace-public-layout";
import MarketPlacePublicRoute from "../modules/marketplace-public/MarketPlacePublicRoute";

const InvestorDBRoutes = lazy(
  () => import("../modules//investor-database/InvestorDBRoutes")
);

const PrivateRoutes = () => {
  const { currentUser, storePersonalityId, personalityId, newPersonality } =
    useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!personalityId) {
      storePersonalityId(
        !!localStorage.getItem("personalityId")
          ? parseInt(localStorage.getItem("personalityId")!)
          : currentUser?.personality[0]?.personalityId
      );
    }
    if (currentUser) {
      setReady(true);
    }
  }, [currentUser, personalityId]); // eslint-disable-line
  return ready ? (
    <Routes>
      {/* Redirect to Dashboard after success login/registartion */}
      {newPersonality ?? personalityId ? (
        <>
          <Route element={<MasterLayout />}>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="my-ai/*" element={<AiPersonalityPage />} />
            <Route path="investor-crm/*" element={<InvestorCrmRoutes />} />
            <Route
              path="settings"
              element={
                <SuspensedView>
                  <ToolbarWrapper />
                </SuspensedView>
              }
            />
            <Route
              path="marketplace/*"
              element={
                <SuspensedView>
                  <MarketplaceRouting />
                </SuspensedView>
              }
            />
            <Route
              path="data-rooms/*"
              element={
                <SuspensedView>
                  <DataRoomsRoutes />
                </SuspensedView>
              }
            />
            <Route
              path="investor-database/*"
              element={
                <SuspensedView>
                  <InvestorDBRoutes />
                </SuspensedView>
              }
            />
            <Route
              path="chat-credits"
              element={
                <SuspensedView>
                  <ChatCreditsPage />
                </SuspensedView>
              }
            />
            <Route
              path="support"
              element={
                <SuspensedView>
                  <SupportPage />
                </SuspensedView>
              }
            />
            <Route path="/sitemap/*" element={<Sitemap />} />
            <Route path="*" element={<ErrorsPage />} />
          </Route>
          <Route
            path={"/marketplace-public/*"}
            element={<MarketPlacePublicRoute />}
          />
        </>
      ) : (
        <>
          <Route index element={<Navigate to="/onboarding/" />} />
          <Route path="/onboarding/*" element={<OnboardingRoutes />} />
          <Route element={<MasterLayout />}></Route>
          <Route path="*" element={<ErrorsPage />} />
        </>
      )}
      {/* Pages */}
    </Routes>
  ) : null;
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue("--kt-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
