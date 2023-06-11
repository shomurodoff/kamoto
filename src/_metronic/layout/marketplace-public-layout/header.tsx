import React from "react";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../helpers";
import clsx from "clsx";
import { DisplayImage } from "../../../app/modules/widgets/components/General/DisplayImage";
import { HeaderUserMenu } from "../../partials";
import { useAuth } from "../../../app/modules/auth";

const Header = () => {
  const { currentUser } = useAuth();
  return (
    <div className="flex h-[80px] items-center justify-between px-[20px] md:px-20">
      <Link to="/dashboard">
        <>
          <img
            alt="Logo"
            src={toAbsoluteUrl("/media/auth/logo.png")}
            className={"hidden md:block"}
          />
          <img
            alt="Logo"
            src={toAbsoluteUrl("/media/auth/logo-mini.png")}
            className={"block md:hidden"}
          />
        </>
      </Link>
      <div className={"flex items-center gap-x-[8px] md:gap-x-4"}>
        <div
          className={
            "bg-[#2E2F45] flex items-center py-[4px] px-[14px] md:px-[20px]  md:gap-x-[12px] rounded"
          }
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_344_30567)">
              <path
                d="M17 8V5C17 4.73478 16.8946 4.48043 16.7071 4.29289C16.5196 4.10536 16.2652 4 16 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6M4 6C4 6.53043 4.21071 7.03914 4.58579 7.41421C4.96086 7.78929 5.46957 8 6 8H18C18.2652 8 18.5196 8.10536 18.7071 8.29289C18.8946 8.48043 19 8.73478 19 9V12M4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H18C18.2652 20 18.5196 19.8946 18.7071 19.7071C18.8946 19.5196 19 19.2652 19 19V16"
                stroke="#C2D24B"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 12V16H16C15.4696 16 14.9609 15.7893 14.5858 15.4142C14.2107 15.0391 14 14.5304 14 14C14 13.4696 14.2107 12.9609 14.5858 12.5858C14.9609 12.2107 15.4696 12 16 12H20Z"
                stroke="#C2D24B"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_344_30567">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <p className={"text-[14px] leading-5 text-[#FFFFFFCC] font-semibold"}>
            <span className={"font-normal mr-2 hidden md:inline-block"}>
              Credits
            </span>
            $250.56
          </p>
        </div>
        <div className={"flex items-center md:gap-x-1.5"}>
          <img
            src={toAbsoluteUrl("/media/avatars/300-1.jpg")}
            className={"w-10 h-10 rounded"}
          />
          <h3
            className={
              "text-[13px] leading-5 text-[#FFFFFFA6] font-semibold hidden md:inline-block"
            }
          >
            <span className={"text-[#FFFFFFCC]"}>Hi,</span> Sean
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Header;
