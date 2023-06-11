import React from "react";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../helpers";

const Footer = () => {
  return (
    <footer className={"px-[20px] md:px-20 py-10 md:mt-[120px]"}>
      <div
        className={
          "grid grid-cols-12 md:gap-x-10 gap-y-6 text-[#FFFFFFA6] text-[14px] leading-5"
        }
      >
        <div className={"col-span-12 md:col-span-6 lg:col-span-3"}>
          <img
            alt="Logo"
            src={toAbsoluteUrl("/media/auth/logo.png")}
            className={"mb-4"}
          />
          <p className={"mb-[16px] max-w-sm"}>
            KamotoAI is revolutionizing the AI landscape by enabling users to
            create, train, and monetize bespoke AI personalities while offering
            celebrities & influencers the chance to license authentic AI
            replicas of themselves for an innovative, interactive, and
            monetizable experience.
          </p>
          <div className={"flex items-center gap-x-[24px]"}>
            <Link to={"/"}>
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.7242 10.4004C20.7242 4.84289 16.2467 0.337891 10.7242 0.337891C5.19918 0.339141 0.72168 4.84289 0.72168 10.4016C0.72168 15.4229 4.37918 19.5854 9.15918 20.3404V13.3091H6.62168V10.4016H9.16168V8.18289C9.16168 5.66164 10.6554 4.26914 12.9392 4.26914C14.0342 4.26914 15.1779 4.46539 15.1779 4.46539V6.94039H13.9167C12.6754 6.94039 12.2879 7.71664 12.2879 8.51289V10.4004H15.0604L14.6179 13.3079H12.2867V20.3391C17.0667 19.5841 20.7242 15.4216 20.7242 10.4004Z"
                  fill="#8898A6"
                />
              </svg>
            </Link>
            <Link to={"/"}>
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.00711 19.0907C14.5546 19.0907 18.6834 12.837 18.6834 7.42321C18.6834 7.24821 18.6834 7.07071 18.6759 6.89571C19.4797 6.31382 20.1734 5.5934 20.7246 4.76821C19.9738 5.09927 19.1781 5.31747 18.3634 5.41571C19.2215 4.90276 19.8643 4.09567 20.1721 3.14446C19.3658 3.62212 18.4834 3.95743 17.5634 4.13571C16.9448 3.47699 16.1264 3.04061 15.2347 2.89416C14.3431 2.74771 13.428 2.89936 12.6313 3.32563C11.8346 3.7519 11.2006 4.429 10.8277 5.25204C10.4547 6.07507 10.3636 6.99813 10.5684 7.87821C8.93679 7.7964 7.34063 7.37254 5.88341 6.63414C4.4262 5.89573 3.14046 4.85926 2.10961 3.59196C1.58628 4.49581 1.42658 5.56496 1.66292 6.58229C1.89926 7.59962 2.51393 8.48887 3.38211 9.06946C2.73153 9.04736 2.09526 8.87266 1.52461 8.55946V8.61571C1.52573 9.56256 1.85374 10.48 2.4532 11.2129C3.05266 11.9458 3.88679 12.4493 4.81461 12.6382C4.46244 12.7352 4.09865 12.7836 3.73336 12.782C3.47584 12.7827 3.21884 12.7589 2.96586 12.7107C3.22809 13.5258 3.7387 14.2384 4.42617 14.7488C5.11363 15.2592 5.94353 15.5418 6.79961 15.557C5.3453 16.6992 3.54886 17.3187 1.69961 17.3157C1.37376 17.3171 1.04814 17.2983 0.724609 17.2595C2.6015 18.456 4.78123 19.0914 7.00711 19.0907Z"
                  fill="#8898A6"
                />
              </svg>
            </Link>
            <Link to={"/"}>
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.7884 2.83789H10.8996C11.9271 2.84164 17.1334 2.87914 18.5371 3.25664C18.9615 3.37185 19.3482 3.59642 19.6586 3.9079C19.9689 4.21938 20.1921 4.60687 20.3059 5.03164C20.4321 5.50664 20.5209 6.13539 20.5809 6.78414L20.5934 6.91414L20.6209 7.23914L20.6309 7.36914C20.7121 8.51164 20.7221 9.58164 20.7234 9.81539V9.90914C20.7221 10.1516 20.7109 11.2941 20.6209 12.4841L20.6109 12.6154L20.5996 12.7454C20.5371 13.4604 20.4446 14.1704 20.3059 14.6929C20.1925 15.1178 19.9694 15.5055 19.659 15.817C19.3485 16.1286 18.9616 16.353 18.5371 16.4679C17.0871 16.8579 11.5759 16.8854 10.8121 16.8866H10.6346C10.2484 16.8866 8.65086 16.8791 6.97586 16.8216L6.76336 16.8141L6.65461 16.8091L6.44086 16.8004L6.22711 16.7916C4.83961 16.7304 3.51836 16.6316 2.90961 16.4666C2.48522 16.3519 2.09844 16.1276 1.78801 15.8163C1.47759 15.505 1.25442 15.1176 1.14086 14.6929C1.00211 14.1716 0.909609 13.4604 0.847109 12.7454L0.837109 12.6141L0.827109 12.4841C0.765419 11.6371 0.731234 10.7884 0.724609 9.93914L0.724609 9.78539C0.727109 9.51664 0.737109 8.58789 0.804609 7.56289L0.813359 7.43414L0.817109 7.36914L0.827109 7.23914L0.854609 6.91414L0.867109 6.78414C0.927109 6.13539 1.01586 5.50539 1.14211 5.03164C1.25548 4.6067 1.47856 4.21903 1.789 3.90749C2.09944 3.59596 2.48632 3.37151 2.91086 3.25664C3.51961 3.09414 4.84086 2.99414 6.22836 2.93164L6.44086 2.92289L6.65586 2.91539L6.76336 2.91164L6.97711 2.90289C8.16674 2.86461 9.35687 2.84336 10.5471 2.83914H10.7884V2.83789ZM8.72461 6.85039V12.8729L13.9209 9.86289L8.72461 6.85039Z"
                  fill="#8898A6"
                />
              </svg>
            </Link>
            <Link to={"/"}>
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.724609 1.77234C0.724609 0.981094 1.38211 0.339844 2.19336 0.339844H19.2559C20.0671 0.339844 20.7246 0.981094 20.7246 1.77234V18.9073C20.7246 19.6986 20.0671 20.3398 19.2559 20.3398H2.19336C1.38211 20.3398 0.724609 19.6986 0.724609 18.9073V1.77234ZM6.90336 17.0823V8.05109H3.90211V17.0823H6.90336ZM5.40336 6.81734C6.44961 6.81734 7.10086 6.12484 7.10086 5.25734C7.08211 4.37109 6.45086 3.69734 5.42336 3.69734C4.39586 3.69734 3.72461 4.37234 3.72461 5.25734C3.72461 6.12484 4.37586 6.81734 5.38336 6.81734H5.40336ZM11.5384 17.0823V12.0386C11.5384 11.7686 11.5584 11.4986 11.6384 11.3061C11.8546 10.7673 12.3484 10.2086 13.1784 10.2086C14.2646 10.2086 14.6984 11.0361 14.6984 12.2511V17.0823H17.6996V11.9023C17.6996 9.12734 16.2196 7.83734 14.2446 7.83734C12.6521 7.83734 11.9384 8.71234 11.5384 9.32859V9.35984H11.5184C11.525 9.34941 11.5317 9.33899 11.5384 9.32859V8.05109H8.53836C8.57586 8.89859 8.53836 17.0823 8.53836 17.0823H11.5384Z"
                  fill="#8898A6"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className={"col-span-12 md:col-span-6 lg:col-span-3"}>
          <h3
            className={
              "text-[18px] leading-6 text-[#FFFFFFCC] font-bold mb-[14px]"
            }
          >
            Kamoto AI
          </h3>
          <ul>
            <li className={"mb-2"}>
              <Link to={"/"}>Home</Link>
            </li>
            <li className={"mb-2"}>
              <Link to={"/"}>About</Link>
            </li>{" "}
            <li className={"mb-2"}>
              <Link to={"/"}>Blog</Link>
            </li>
            <li className={"mb-2"}>
              <Link to={"/"}>Pricing</Link>
            </li>
            <li className={"mb-2"}>
              <Link to={"/"}>Sign in</Link>
            </li>
            <li className={"mb-2"}>
              <Link to={"/"}>Register</Link>
            </li>
            <li className={"mb-2"}>
              <Link to={"/"}>Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className={"col-span-12 md:col-span-6 lg:col-span-3"}>
          <h3
            className={
              "text-[18px] leading-6 text-[#FFFFFFCC] font-bold mb-[14px]"
            }
          >
            Use Cases
          </h3>
          <ul>
            <li className={"mb-2"}>
              <Link to={"/"}>Individuals</Link>
            </li>
            <li className={"mb-2"}>
              <Link to={"/"}>Celebrities & Influencers</Link>
            </li>{" "}
            <li className={"mb-2"}>
              <Link to={"/"}>Businesses</Link>
            </li>
            <li className={"mb-2"}>
              <Link to={"/"}>Game & App Developers</Link>
            </li>
            <li className={"mb-2"}>
              <Link to={"/"}>Educational Institutions</Link>
            </li>
            <li className={"mb-2"}>
              <Link to={"/"}>Healthcare Providers</Link>
            </li>
            <li className={"mb-2"}>
              <Link to={"/"}>Legal Firms</Link>
            </li>
          </ul>
        </div>
        <div className={"col-span-12 md:col-span-6 lg:col-span-3"}>
          <h3
            className={
              "text-[18px] leading-6 text-[#FFFFFFCC] font-bold mb-[14px]"
            }
          >
            News & Update
          </h3>
          <ul>
            <li className={"mb-2"}>
              <div className="relative mb-[16px]">
                <input type="text" className="form-control h-[56px]" />
                <span className="absolute right-0 top-0 h-full w-[50px] bg-[#C2D24B] flex justify-center items-center rounded-r">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_344_31206)">
                      <path
                        d="M4.29573 9.52632L19.7727 5.19232C19.8582 5.1684 19.9485 5.16767 20.0344 5.19021C20.1203 5.21275 20.1986 5.25774 20.2613 5.32056C20.324 5.38338 20.3689 5.46177 20.3913 5.54766C20.4137 5.63356 20.4128 5.72387 20.3887 5.80932L16.0557 21.2853C16.0282 21.3849 15.9705 21.4734 15.8906 21.5389C15.8106 21.6043 15.7124 21.6434 15.6094 21.6507C15.5064 21.6581 15.4036 21.6333 15.3152 21.5799C15.2268 21.5264 15.1571 21.447 15.1157 21.3523L11.8677 13.9703C11.8176 13.8556 11.7262 13.7639 11.6117 13.7133L4.22973 10.4653C4.13508 10.424 4.05554 10.3544 4.00203 10.2661C3.94853 10.1778 3.92368 10.075 3.93092 9.97202C3.93815 9.869 3.9771 9.77075 4.04243 9.69076C4.10775 9.61078 4.19624 9.55398 4.29573 9.52632Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_344_31206">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(0.264648 0.609375)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
              </div>
            </li>
            <li className={"mb-2"}>
              <Link to={"/"}>Terms & Conditions</Link>
            </li>{" "}
            <li className={"mb-2"}>
              <Link to={"/"}>Privacy Policy</Link>
            </li>
            <li className={"mb-2"}>
              <Link to={"/"}>Refund Policy</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={"w-full h-[1px] bg-[#2E2F45] my-6"} />
      <div className={"text-center"}>
        <p className={"text-[13px] md:text-[14px] leading-5"}>
          Copyright © 2023,{" "}
          <span className={"text-[#E6F85E] font-poppins"}>
            Kamoto Labs Inc.
          </span>{" "}
          All Right Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
