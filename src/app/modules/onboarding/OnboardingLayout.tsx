import React from "react";
import { Layout } from "../widgets/components/General/Layout";
import AuthBg from "../../assets/images/auth/auth-background.png";
import LogoImg from "../../assets/images/auth/logo.svg";
import { Link, Outlet } from "react-router-dom";
import { useIntl } from "react-intl";

export const OnboardingLayout = () => {
  const { formatMessage } = useIntl();
  return (
    <div
      className={
        "min-h-screen  flex  justify-center items-center  auth-bg py-4"
      }
      style={{
        backgroundImage: `url(${AuthBg})`,
      }}
    >
      <div className={"container"}>
        <div className={"flex justify-center mb-8"}>
          <img src={LogoImg} className={"w-[125px] md:w-[290px]"} />
        </div>
        <div
          className={
            "bg-[#171825] shadow-[0px_2px_15px_0px_#00000040] px-[16px] md:px-[68px] py-[32px] md:py-12 rounded-md "
          }
        >
          <Outlet />
        </div>
        <div className="flex flex-wrap justify-center md:justify-between mt-[12px] text-[#FFFFFFA6] text-[13px] leading-5">
          <p className={"w-full md:w-auto text-center"}>2023© KamotoAI.</p>
          <div className={"flex justify-between gap-[25px]"}>
            <a href={process.env.REACT_APP_TERMS_POLICY_LINK} target="_blank" rel="noreferrer">
              {formatMessage({ id: "Terms of use" })}
            </a>
            <a href={process.env.REACT_APP_TERMS_POLICY_LINK} target="_blank" rel="noreferrer">
              {formatMessage({ id: "Privacy Policy" })}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
