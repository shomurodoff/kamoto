import { useEffect } from "react";
import { useLocation } from "react-router";
import clsx from "clsx";
import { useLayout } from "../../core";
import { DrawerComponent } from "../../../assets/ts/components";
import { WithChildren } from "../../../helpers";

const Content = ({ children }: WithChildren) => {
  const { config, classes } = useLayout();
  const location = useLocation();
  useEffect(() => {
    DrawerComponent.hideAll();
  }, [location]);

  const appContentContainer = config.app?.content?.container;
  return (
    <div
      id="kt_app_content"
      className={clsx(
        "h-[calc(100vh-70px)]",
        classes.content.join(" "),
        config?.app?.content?.class
      )}
    >
      {appContentContainer ? (
        <div
          id="kt_app_content_container"
          className={clsx(
            classes.contentContainer.join(" "),
            {
              "container-xxl": appContentContainer === "fixed",
              "container-fluid": appContentContainer === "fluid",
            },
            "md:px-[16px] md:py-[16px] py-[14px] h-full flex-grow"
          )}
        >
          {children}
        </div>
      ) : (
        <div className={"md:px-[16px] py-[16px] h-full"}>{children}</div>
      )}
    </div>
  );
};

export { Content };
