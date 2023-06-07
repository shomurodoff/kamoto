import "../../assets/index.css";
import { Link, Outlet } from "react-router-dom";
import AuthBg from "../../assets/images/auth/auth-background.png";
import LogoImg from "../../assets/images/auth/logo.svg";
import { useIntl } from "react-intl";

export const AuthLayout = () => {
  const { formatMessage } = useIntl();
  return (
    <div
      className={"h-screen relative auth-bg"}
      style={{
        backgroundImage: `url(${AuthBg})`,
      }}
    >
      <div
        className={
          "min-w-[340px] sm:min-w-[540px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        }
      >
        <div className={"flex justify-center mb-8"}>
          <img src={LogoImg} className={"w-[125px] md:w-[290px]"} />
        </div>
        <div
          className={
            " bg-[#171825]  shadow-[0px_2px_15px_0px_#00000040] px-[16px] md:px-[68px] py-[32px] md:py-12 rounded-md"
          }
        >
          <Outlet />
        </div>
        <div className="flex flex-wrap justify-center md:justify-between mt-[24px] md:mt-[12px] text-[#FFFFFFA6] text-[13px] leading-5">
          <p className={"w-full md:w-auto text-center mb-[8px]"}>
            2023© KamotoAI.
          </p>
          <div className={"flex justify-between gap-[25px]  mb-[8px]"}>
            <Link to="/terms-of-use">
              {formatMessage({ id: "Terms of use" })}
            </Link>

            <Link to="/privacy-policy">
              {formatMessage({ id: "Privacy Policy" })}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
