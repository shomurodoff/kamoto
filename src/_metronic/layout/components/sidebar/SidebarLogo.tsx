import { memo } from "react";
import clsx from "clsx";
import { KTSVG } from "../../../helpers";
import { useLayout } from "../../core";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../../app/modules/auth";
import { DisplayImage } from "../../../../app/modules/widgets/components/General/DisplayImage";
import { BasicButton } from "../../../../app/modules/widgets/components/UI/BasicButton";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

const SidebarLogo = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { currentUser, storePersonalityId, setNewPersonality, personalityId } = useAuth();
  const [companyData, setCompanyData] = useState<any[]>();
  const { config } = useLayout();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const appSidebarDefaultMinimizeDesktopEnabled =
    config?.app?.sidebar?.default?.minimize?.desktop?.enabled;
  const appSidebarDefaultCollapseDesktopEnabled =
    config?.app?.sidebar?.default?.collapse?.desktop?.enabled;
  const toggleType = appSidebarDefaultCollapseDesktopEnabled
    ? "collapse"
    : appSidebarDefaultMinimizeDesktopEnabled
    ? "minimize"
    : "";
  const toggleState = appSidebarDefaultMinimizeDesktopEnabled ? "active" : "";
  const [selectCompany, setSelectedCompany] = useState<any>(null);
  const appSidebarDefaultMinimizeDefault =
    config.app?.sidebar?.default?.minimize?.desktop?.default;
  useEffect(() => {
    setCompanyData(currentUser?.personality);
    if (personalityId) {
      const findCompany = currentUser?.personality.find(
        (company: { personalityId: number }) => company.personalityId === personalityId
      );
      if (findCompany) {
        setSelectedCompany(findCompany);
      } else {
        setSelectedCompany(currentUser?.personality[0]);
      }
    }
    if (selectCompany === null && !personalityId) {
      setSelectedCompany(currentUser?.personality[0]);
    }
  }, [currentUser, selectCompany, personalityId]); // eslint-disable-line

  const onCompanySelect = (item: any) => {
    setSelectedCompany(item);
    storePersonalityId(item.personalityId);
    localStorage.setItem("personalityId", item.personalityId);
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="app-sidebar-logo border-0 px-6" id="kt_app_sidebar_logo">
      <div className="w-100">
        <div className="accordion-item" ref={dropdownRef}>
          <h2 className="accordion-header" id="panelsStayOpen-headingThree">
            <button
              className="accordion-button collapsed w-100 app-sidebar-logo-default"
              type="button"
              onClick={() => setOpenDropdown((prevState) => !prevState)}
            >
              <button className="btn d-flex p-0 align-items-center">
                <DisplayImage
                  imgName={selectCompany?.file?.name}
                  alt="comp"
                  height="30px"
                  width="30px"
                  fit="contain"
                />
                <h4 className="align-self-center  text-dark font-size-13 fw-bold ps-3 m-0">
                  {selectCompany?.name}
                </h4>
                <i
                  className="align-self-center fa fa-angle-down  ps-4 text-clr477 text-primary"
                  aria-hidden="true"
                ></i>
              </button>
            </button>
          </h2>
          <div className="w-100 app-sidebar-logo-minimize d-flex">
            <DisplayImage
              imgName={selectCompany?.file?.name}
              alt="comp"
              height="30px"
              width="30px"
              fit="contain"
              className={"app-sidebar-logo-minimize"}
            />
          </div>
          <div
            className={clsx(
              "accordion-collapse ms-6 bg-white  w-200px shadow px-2 border-bottom mh-1000px",
              openDropdown ? "" : "collapse"
            )}
          >
            <div className="accordion-body app-sidebar-logo-default overflow-scroll mh-550px">
              {companyData &&
                companyData.map((item) => (
                  <div
                    className="  py-2 border-bottom border-bottom-1"
                    key={item.personalityId}
                  >
                    <button
                      className={`btn ${
                        selectCompany &&
                        selectCompany.personalityId === item.personalityId &&
                        "btn-light"
                      }  col-12 d-flex w-100 align-items-center`}
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseThree"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseThree"
                      onClick={() => {
                        onCompanySelect(item);
                      }}
                    >
                      <DisplayImage
                        imgName={item.file?.name}
                        alt="img"
                        height="23px"
                        width="23px"
                        fit="contain"
                        className={"col-2"}
                      />
                      <p className="align-self-center col-8 fw-bold m-0 text-clr477 text-wrap font-size-13 d-flex ms-2">
                        {item.name}
                      </p>
                      {selectCompany &&
                        selectCompany.personalityId === item.personalityId && (
                          <i
                            className="align-self-center col-2 fa fa-check text-clr477 text-primary  "
                            aria-hidden="true"
                          ></i>
                        )}
                    </button>
                  </div>
                ))}
              <div className="d-flex justify-content-center py-2 border-bottom border-bottom-1">
                <BasicButton
                  buttonText={formatMessage({ id: "Add New Company" })}
                  height="44px"
                  border="none"
                  color="#C2D24B"
                  textColor="#FFFFFF"
                  padding="12px 21px"
                  onClick={() => {
                    setNewPersonality(false);
                    navigate("/onboarding/");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {(appSidebarDefaultMinimizeDesktopEnabled ||
        appSidebarDefaultCollapseDesktopEnabled) && (
        <div
          id="kt_app_sidebar_toggle"
          className={clsx(
            "app-sidebar-toggle btn btn-icon btn-shadow btn-sm btn-color-muted btn-active-color-primary body-bg h-30px w-30px position-absolute top-50 start-100 translate-middle rotate",
            { active: appSidebarDefaultMinimizeDefault }
          )}
          data-kt-toggle="true"
          data-kt-toggle-state={toggleState}
          data-kt-toggle-target="body"
          data-kt-toggle-name={`app-sidebar-${toggleType}`}
        >
          <KTSVG
            path="/media/icons/duotune/arrows/arr079.svg"
            className="svg-icon-2 rotate-180"
          />
        </div>
      )}
    </div>
  );
};

export default memo(SidebarLogo);
