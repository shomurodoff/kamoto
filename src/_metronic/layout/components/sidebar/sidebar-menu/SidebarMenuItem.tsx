import { FC } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { checkIsActive, KTSVG, WithChildren } from "../../../../helpers";
import { useLayout } from "../../../core";

type Props = {
  to: string;
  title: string;
  icon?: string;
  activeIcon?: string;
  fontIcon?: string;
  hasBullet?: boolean;
};

const SidebarMenuItem: FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  activeIcon,
  fontIcon,
  hasBullet = false,
}) => {
  const { pathname } = useLocation();
  const isActive = checkIsActive(pathname, to);
  const { config } = useLayout();
  const { app } = config;

  return (
    <div className="menu-item group">
      <Link
        className={clsx("menu-link without-sub hover:text-red-800", {
          active: isActive,
        })}
        to={to}
      >
        {hasBullet && (
          <span className="menu-bullet">
            <span className="bullet bullet-dot "></span>
          </span>
        )}
        {icon && activeIcon && app?.sidebar?.default?.menu?.iconType === "svg" && (
          <span className="menu-icon group-hover:stroke-[#C2D24B]">
            {" "}
            <>
              {isActive ? (
                <KTSVG path={activeIcon} className="svg-icon-2" />
              ) : (
                <KTSVG path={icon} className="svg-icon-2" />
              )}
            </>
          </span>
        )}
        {fontIcon && app?.sidebar?.default?.menu?.iconType === "font" && (
          <i className={clsx("bi fs-3", fontIcon)}></i>
        )}
        <span className="menu-title">{title}</span>
      </Link>
      {children}
    </div>
  );
};

export { SidebarMenuItem };
