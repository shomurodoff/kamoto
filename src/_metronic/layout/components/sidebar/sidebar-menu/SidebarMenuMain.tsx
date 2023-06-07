/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { useIntl } from "react-intl";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { SidebarMenuItem } from "./SidebarMenuItem";

const SidebarMenuMain: React.FC = () => {
  const intl = useIntl();

  return (
    <>
      <SidebarMenuItem
        to="/dashboard"
        icon="/media/icons/sidebar/DashboardIcon.svg"
        activeIcon="/media/icons/sidebar/DashboardActiveIcon.svg"
        title={intl.formatMessage({ id: "Dashboard" })}
        fontIcon="bi-app-indicator"
      />
      <SidebarMenuItem
        to="/my-ai"
        icon="/media/icons/sidebar/MyAiIcon.svg"
        activeIcon="/media/icons/sidebar/MyAiActiveIcon.svg"
        title={intl.formatMessage({ id: "My AI Personality" })}
        fontIcon="bi-app-indicator"
      />
      <SidebarMenuItem
        to="/train-my-ai"
        icon="/media/icons/sidebar/TrainAi.svg"
        activeIcon="/media/icons/sidebar/TrainAiActive.svg"
        title={intl.formatMessage({ id: "Train Your AI Personality" })}
        fontIcon="bi-app-indicator"
      />
      {/* <SidebarMenuItemWithSub
        to="/data-rooms"
        title="Data Rooms"
        icon="/media/icons/sidebar/DataRoomsIcon.svg"
        fontIcon="bi-person"
      >
        <SidebarMenuItem
          to="/data-rooms/overview"
          title="Overview"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/data-rooms/spaces"
          title="Data Rooms"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/data-rooms/files"
          title="Files"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub> */}
      <SidebarMenuItem
        to="/settings"
        icon="/media/icons/sidebar/SettingIcon.svg"
        activeIcon="/media/icons/sidebar/SettingActiveIcon.svg"
        title={intl.formatMessage({ id: "Settings" })}
        fontIcon="bi-layers"
      />
      <SidebarMenuItem
        to="/chat-credits"
        icon="/media/icons/sidebar/ChatCredits.svg"
        activeIcon="/media/icons/sidebar/ChatCreditsActive.svg"
        title={intl.formatMessage({ id: "Chat Credits" })}
        fontIcon="bi-app-indicator"
      />
      <SidebarMenuItem
        to="/support"
        icon="/media/icons/sidebar/Support.svg"
        activeIcon="/media/icons/sidebar/SupportActive.svg"
        title={intl.formatMessage({ id: "Support" })}
        fontIcon="bi-app-indicator"
      />
      <SidebarMenuItem
        to="/sitemap"
        // icon='/media/icons/sidebar/Support.svg'
        // activeIcon='/media/icons/sidebar/SupportActive.svg'
        title={intl.formatMessage({ id: "Sitemap" })}
        fontIcon="bi-app-indicator"
      />
    </>
  );
};

export { SidebarMenuMain };
