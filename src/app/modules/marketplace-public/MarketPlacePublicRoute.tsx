import React from "react";
import { Route, Routes } from "react-router-dom";
import EventPage from "./pages/events";
import MarketplacePublicLayout from "../../../_metronic/layout/marketplace-public-layout";
const MarketPlacePublicRoute = () => {
  return (
    <Routes>
      <Route element={<MarketplacePublicLayout />}>
        <Route index element={<EventPage />} />
      </Route>
    </Routes>
  );
};

export default MarketPlacePublicRoute;
