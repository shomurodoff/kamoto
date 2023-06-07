import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { HeaderWrapper } from "./components/header";
import { ScrollTop } from "./components/scroll-top";
import { Content } from "./components/content";
import { Sidebar } from "./components/sidebar";
import {
  DrawerMessenger,
  ActivityDrawer,
  InviteUsers,
  UpgradePlan,
  ThemeModeProvider,
} from "../partials";
import { PageDataProvider } from "./core";
import { reInitMenu } from "../helpers";

const MasterLayout = () => {
  const location = useLocation();
  useEffect(() => {
    reInitMenu();
  }, [location.key]);

  return (
    <PageDataProvider>
      <ThemeModeProvider>
        <div
          className="d-flex flex-column flex-root app-root min-h-screen"
          id="kt_app_root"
        >
          <div
            className="app-page flex-column flex-column-fluid"
            id="kt_app_page"
          >
            <HeaderWrapper />
            <div
              className="app-wrapper flex-column flex-row-fluid"
              id="kt_app_wrapper"
            >
              <Sidebar />
              <div
                className="app-main flex-column flex-row-fluid"
                id="kt_app_main"
              >
                <div className="">
                  <Content>
                    <Outlet />
                  </Content>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ActivityDrawer />
        <DrawerMessenger />
        <InviteUsers />
        <UpgradePlan />
        <ScrollTop />
      </ThemeModeProvider>
    </PageDataProvider>
  );
};

export { MasterLayout };
