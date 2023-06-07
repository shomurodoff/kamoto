import { Link, Outlet } from "react-router-dom";
import { useThemeMode } from "../../../_metronic/partials";
import AuthBg from "../../assets/images/auth/auth-background.png";
import LogoImg from "../../assets/images/auth/logo.svg";

const ErrorsLayout = () => {
  const { mode } = useThemeMode();
  return (
    <div className={"h-full "}>
      <div
        className={
          "md:bg-[#171825] md:shadow-default px-[16px] md:px-[68px] py-[32px] md:py-12 rounded-md h-full flex justify-center"
        }
      >
        <Outlet />
      </div>
    </div>
  );
};

export { ErrorsLayout };
