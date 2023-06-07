import React from "react";
import { Routes, Route } from "react-router-dom";
import { PrivacyPolicy } from "../../pages/PrivacyPolicy";
import { TermsOfUse } from "../../pages/TermsOfUse";
import { OnboardingLayout } from "./OnboardingLayout";
import { CompanyDetails } from "./views/CompanyDetails";
import { TeamMembers } from "./views/TeamMembers";
import { InitializeRound } from "./views/InitializeRound";

export const OnboardingRoutes = () => {
  return (
    <Routes>
      <Route element={<OnboardingLayout />}>
        <Route index element={<CompanyDetails />} />
        <Route path="initialize-round" element={<InitializeRound />} />
        <Route path="team-members" element={<TeamMembers />} />
        <Route path="terms-of-use" element={<TermsOfUse />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
      </Route>
    </Routes>
  );
};
