import React from "react";
import { Route, Routes } from "react-router-dom";
import MarketplaceOverviewPage from "./pages/overview";
import MarketplaceFeedbackRatingPage from "./pages/feedback-rating";
import MarketplaceSettingsPage from "./pages/settings";

const MarketplaceRouting = () => {
  return (
    <Routes>
      <Route path={"overview"} element={<MarketplaceOverviewPage />} />
      <Route
        path={"feedback-ratings"}
        element={<MarketplaceFeedbackRatingPage />}
      />
      <Route
        path={"marketplace-settings"}
        element={<MarketplaceSettingsPage />}
      />
    </Routes>
  );
};

export default MarketplaceRouting;
