import clsx from "clsx";
import { KTSVG } from "../../../helpers";
import { ThemeModeComponent } from "../../../assets/ts/layout";
import { ThemeModeType, useThemeMode } from "./ThemeModeProvider";
import { useIntl } from "react-intl";
import { useLayout } from "../../../layout/core";

/* eslint-disable jsx-a11y/anchor-is-valid */
type Props = {
  toggleBtnClass?: string;
  toggleBtnIconClass?: string;
  menuPlacement?: string;
  menuTrigger?: string;
};

const systemMode = ThemeModeComponent.getSystemMode() as "light" | "dark";

const ThemeModeSwitcher = ({
  toggleBtnClass = "",
  toggleBtnIconClass = "svg-icon-2",
  menuPlacement = "bottom-end",
  menuTrigger = "{default: 'click', lg: 'hover'}",
}: Props) => {
  const { mode, menuMode, updateMode, updateMenuMode } = useThemeMode();
  const calculatedMode = mode === "system" ? systemMode : mode;
  const switchMode = (_mode: ThemeModeType) => {
    updateMenuMode(_mode);
    updateMode(_mode);
  };
  const { formatMessage } = useIntl();
  const { setLayoutType } = useLayout();

  return (
    <>
      <div
        className="menu-item w-100 px-2"
        data-kt-menu-trigger="hover"
        data-kt-menu-placement="left-start"
        data-kt-menu-flip="bottom"
      >
        <a href="#" className="menu-link ps-5 pe-8">
          <span className="menu-title position-relative">
            {formatMessage({ id: "Theme" })}
            <span className="fs-7 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-1/2 end-0">
              {calculatedMode === "dark" && (
                <div className={"flex items-center gap-1"}>
                  <span className="fs-7 text-gray-500 pe-4">
                    {formatMessage({ id: "Dark" })}
                  </span>
                  <KTSVG
                    path="/media/icons/duotune/general/gen061.svg"
                    className={clsx("theme-light-hide", toggleBtnIconClass)}
                  />
                </div>
              )}

              {calculatedMode === "light" && (
                <div className={"flex items-center gap-1"}>
                  <span className="fs-7 text-gray-500 pe-4">
                    {formatMessage({ id: "Light" })}
                  </span>
                  <KTSVG
                    path="/media/icons/duotune/general/gen060.svg"
                    className={clsx("theme-dark-hide", toggleBtnIconClass)}
                  />
                </div>
              )}
            </span>
          </span>
        </a>

        <div
          className=" menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-primary fw-semibold py-4 fs-base w-175px"
          data-kt-menu="true"
        >
          {/* begin::Menu item */}
          <div className="menu-item px-3 my-0">
            <a
              href="#"
              className={clsx("menu-link px-3 py-2", {
                active: menuMode === "light",
              })}
              onClick={() => {
                setLayoutType("light-sidebar");
                switchMode("light");
              }}
            >
              <span className="menu-icon" data-kt-element="icon">
                <KTSVG
                  path="/media/icons/duotune/general/gen060.svg"
                  className="svg-icon-3"
                />
              </span>
              <span className="menu-title">
                {formatMessage({ id: "Light" })}
              </span>
            </a>
          </div>
          {/* end::Menu item */}

          {/* begin::Menu item */}
          <div className="menu-item px-3 my-0">
            <a
              href="#"
              className={clsx("menu-link px-3 py-2", {
                active: menuMode === "dark",
              })}
              onClick={() => {
                setLayoutType("dark-sidebar");
                switchMode("dark");
              }}
            >
              <span className="menu-icon" data-kt-element="icon">
                <KTSVG
                  path="/media/icons/duotune/general/gen061.svg"
                  className="svg-icon-3"
                />
              </span>
              <span className="menu-title">
                {formatMessage({ id: "Dark" })}
              </span>
            </a>
          </div>
          {/* end::Menu item */}

          {/* begin::Menu item */}
          {/* <div className='menu-item px-3 my-0'>
          <a
            href='#'
            className={clsx('menu-link px-3 py-2', {active: menuMode === 'system'})}
            onClick={() => switchMode('system')}
          >
            <span className='menu-icon' data-kt-element='icon'>
              <KTSVG path='/media/icons/duotune/general/gen062.svg' className='svg-icon-3' />
            </span>
            <span className='menu-title'>System</span>
          </a>
        </div> */}
          {/* end::Menu item */}
        </div>
      </div>
      {/* begin::Menu toggle */}
      {/* <a href='#' className='menu-link px-5'>
        <span className='menu-title position-relative'>
          Theme
          <span className='fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0'>
            {calculatedMode === 'dark' && (
              <KTSVG
                path='/media/icons/duotune/general/gen061.svg'
                className={clsx('theme-light-hide', toggleBtnIconClass)}
              />
            )}

            {calculatedMode === 'light' && (
              <KTSVG
                path='/media/icons/duotune/general/gen060.svg'
                className={clsx('theme-dark-hide', toggleBtnIconClass)}
              />
            )}
          </span>
        </span>
      </a> */}
      {/* <div className='d-flex justify-content-between'>
        <p className='fs-6 text-dark fw-bold'>Theme</p>
        <a
          href='#'
          className={clsx('btn btn-icon ', toggleBtnClass)}
          data-kt-menu-trigger={menuTrigger}
          data-kt-menu-attach='parent'
          data-kt-menu-placement={menuPlacement}
        >
          {calculatedMode === 'dark' && (
            <KTSVG
              path='/media/icons/duotune/general/gen061.svg'
              className={clsx('theme-light-hide', toggleBtnIconClass)}
            />
          )}

          {calculatedMode === 'light' && (
            <KTSVG
              path='/media/icons/duotune/general/gen060.svg'
              className={clsx('theme-dark-hide', toggleBtnIconClass)}
            />
          )}
        </a>
      </div> */}

      {/* begin::Menu toggle */}

      {/* begin::Menu */}

      {/* end::Menu */}
    </>
  );
};

export { ThemeModeSwitcher };
