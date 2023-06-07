import React from "react";
import { Route, Routes } from "react-router-dom";
import { InvestorDetailsScreen } from "./views/InvestorDetailsScreen";
import { InvestorPageLayout } from "./components/InvestorPageLayout";

export const InvestorCrmRoutes = () => {
  return (
    <Routes>
      <Route index element={<InvestorDetailsScreen />} />
      <Route path="investor/:investorId" element={<InvestorPageLayout />} />
    </Routes>
  );
};
