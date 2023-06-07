import { useIntl } from "react-intl";
import { MenuItem } from "./MenuItem";
import { MenuInnerWithSub } from "./MenuInnerWithSub";
import { MegaMenu } from "./MegaMenu";

export function MenuInner() {
  const intl = useIntl();
  return (
    <>
      <MenuItem
        title={intl.formatMessage({ id: "Dashboard" })}
        to="/dashboard"
      />
      <MenuItem title="Layout Builder" to="/builder" />
      <MenuInnerWithSub
        title="Crafted"
        to="/"
        menuPlacement="bottom-start"
        menuTrigger="click"
      >
        {/* PAGES */}
        <MenuInnerWithSub
          title="Pages"
          to="/settings/"
          fontIcon="bi-archive"
          hasArrow={true}
          menuPlacement="right-start"
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuInnerWithSub
            title="Settings"
            to="/settings"
            hasArrow={true}
            hasBullet={true}
            menuPlacement="right-start"
            menuTrigger={`{default:'click', lg: 'hover'}`}
          >
            <MenuItem
              to="/settings/user"
              title={intl.formatMessage({ id: "Settings" })}
              hasBullet={true}
            />
            <MenuItem
              to="/settings/company"
              title={intl.formatMessage({ id: "Settings" })}
              hasBullet={true}
            />
            <MenuItem
              to="/settings/billing"
              title={intl.formatMessage({ id: "Settings" })}
              hasBullet={true}
            />
            <MenuItem
              to="/settings/email-integration"
              title={intl.formatMessage({ id: "Settings" })}
              hasBullet={true}
            />
            <MenuItem
              to="/settings/bcc-tracking"
              title={intl.formatMessage({ id: "Settings" })}
              hasBullet={true}
            />
            <MenuItem
              to="/settings/locale"
              title={intl.formatMessage({ id: "Settings" })}
              hasBullet={true}
            />
            <MenuItem
              to="/settings/notification-preferences"
              title={intl.formatMessage({ id: "Settings" })}
              hasBullet={true}
            />
            <MenuItem
              to="/settings/referral"
              title={intl.formatMessage({ id: "Settings" })}
              hasBullet={true}
            />
          </MenuInnerWithSub>
          <MenuInnerWithSub
            title={intl.formatMessage({ id: "Wizards" })}
            to="/crafted/pages/wizards"
            hasArrow={true}
            hasBullet={true}
            menuPlacement="right-start"
            menuTrigger={`{default:'click', lg: 'hover'}`}
          >
            <MenuItem
              to="/crafted/pages/wizards/horizontal"
              title="Horizontal"
              hasBullet={true}
            />
            <MenuItem
              to="/crafted/pages/wizards/vertical"
              title="Vertical"
              hasBullet={true}
            />
          </MenuInnerWithSub>
        </MenuInnerWithSub>

        {/* ACCOUNT */}
        <MenuInnerWithSub
          title={intl.formatMessage({ id: "Accounts" })}
          to="/crafted/accounts"
          fontIcon="bi-person"
          hasArrow={true}
          menuPlacement="right-start"
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem
            to="/settings"
            title={intl.formatMessage({ id: "Overview" })}
            hasBullet={true}
          />
          <MenuItem
            to="/settings"
            title={intl.formatMessage({ id: "Settings" })}
            hasBullet={true}
          />
        </MenuInnerWithSub>

        {/* ERRORS */}
        <MenuInnerWithSub
          title="Errors"
          to="/error"
          fontIcon="bi-sticky"
          hasArrow={true}
          menuPlacement="right-start"
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem to="/error/404" title="Error 404" hasBullet={true} />
          <MenuItem to="/error/500" title="Error 500" hasBullet={true} />
        </MenuInnerWithSub>

        {/* Widgets */}
        <MenuInnerWithSub
          title="Widgets"
          to="/crafted/widgets"
          fontIcon="bi-layers"
          hasArrow={true}
          menuPlacement="right-start"
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem
            to="/crafted/widgets/lists"
            title="Lists"
            hasBullet={true}
          />
          <MenuItem
            to="/crafted/widgets/statistics"
            title="Statistics"
            hasBullet={true}
          />
          <MenuItem
            to="/crafted/widgets/charts"
            title="Charts"
            hasBullet={true}
          />
          <MenuItem
            to="/crafted/widgets/mixed"
            title="Mixed"
            hasBullet={true}
          />
          <MenuItem
            to="/crafted/widgets/tables"
            title="Tables"
            hasBullet={true}
          />
          <MenuItem
            to="/crafted/widgets/feeds"
            title="Feeds"
            hasBullet={true}
          />
        </MenuInnerWithSub>
      </MenuInnerWithSub>

      <MenuInnerWithSub
        title="Apps"
        to="/apps"
        menuPlacement="bottom-start"
        menuTrigger="click"
      >
        {/* PAGES */}
        <MenuInnerWithSub
          title="Chat"
          to="/apps/chat"
          icon="/media/icons/duotune/communication/com012.svg"
          hasArrow={true}
          menuPlacement="right-start"
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem
            to="/apps/chat/private-chat"
            title="Private Chat"
            hasBullet={true}
          />
          <MenuItem
            to="/apps/chat/group-chat"
            title="Group Chart"
            hasBullet={true}
          />
          <MenuItem
            to="/apps/chat/drawer-chat"
            title="Drawer Chart"
            hasBullet={true}
          />
        </MenuInnerWithSub>
        <MenuItem
          icon="/media/icons/duotune/general/gen051.svg"
          to="/apps/user-management/users"
          title="User management"
        />
      </MenuInnerWithSub>

      <MenuInnerWithSub
        isMega={true}
        title="Mega menu"
        to="/mega-menu"
        menuPlacement="bottom-start"
        menuTrigger="click"
      >
        <MegaMenu />
      </MenuInnerWithSub>
    </>
  );
}
