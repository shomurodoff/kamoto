import React from "react";
import { BasicButton } from "../../../../widgets/components/UI/BasicButton";
import { toAbsoluteUrl } from "../../../../../../_metronic/helpers";
import StarRatings from "react-star-ratings";

const Index = () => {
  return (
    <div
      className={
        "bg-[#2E2F45] p-[12px] md:px-[20px] md:py-[16px] rounded border border-[#FFFFFF1A]"
      }
    >
      <div className={"flex justify-between items-start"}>
        <div
          className={
            "flex flex-col md:flex-row md:flex-grow md:gap-x-[24px] md:items-start gap-y-[14px]"
          }
        >
          <div className={"flex gap-x-[12px] items-center"}>
            <img
              src={toAbsoluteUrl("/media/avatars/300-1.jpg")}
              className={
                "w-[32px] h-[32px] md:w-[48px] md:h-[48px] rounded-full"
              }
            />
            <div className={"flex flex-col justify-between"}>
              <h3
                className={
                  "text-[14px] md:text-[16px] leading-5 md:leading-6 text-[#FFFFFFCC] font-semibold mb-[4px] flex items-center gap-x-[8px] md:gap-x-[24px]"
                }
              >
                James Flutter
                <svg
                  className={"h-[16px] md:h-[24px] w-[16px] md:w-[24px]"}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 0L14.8553 3.21224L19.0534 2.2918L19.4753 6.56886L23.4127 8.2918L21.24 12L23.4127 15.7082L19.4753 17.4311L19.0534 21.7082L14.8553 20.7878L12 24L9.14468 20.7878L4.94658 21.7082L4.52468 17.4311L0.587322 15.7082L2.76 12L0.587322 8.2918L4.52468 6.56886L4.94658 2.2918L9.14468 3.21224L12 0Z"
                    fill="#0386FF"
                  />
                  <path
                    d="M8.30762 12.0002L10.7745 14.7694L17.0768 9.23096"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </h3>
              <span className={"text-[12px] leading-[18px] text-[#FFFFFF80]"}>
                Yesterday at 5:06 PM
              </span>
            </div>
          </div>
          <div className={"flex md:flex-col flex-row md:items-center gap-2"}>
            <StarRatings
              starRatedColor="#FFAD0F"
              starEmptyColor={"#FFFFFFA6"}
              starSpacing={"2"}
              numberOfStars={5}
              rating={3.5}
              starDimension={"16px"}
              name="rating"
              svgIconPath={
                "M5.49518 4.89328L1.24184 5.50995L1.16651 5.52528C1.05247 5.55556 0.948507 5.61555 0.865239 5.69915C0.78197 5.78274 0.72238 5.88694 0.692552 6.0011C0.662724 6.11526 0.663729 6.23529 0.695462 6.34893C0.727196 6.46257 0.788522 6.56576 0.873177 6.64795L3.95451 9.64728L3.22784 13.8839L3.21918 13.9573C3.2122 14.0752 3.23669 14.1929 3.29014 14.2983C3.3436 14.4037 3.4241 14.4929 3.5234 14.557C3.6227 14.621 3.73724 14.6575 3.85528 14.6627C3.97332 14.6679 4.09062 14.6416 4.19518 14.5866L7.99918 12.5866L11.7945 14.5866L11.8612 14.6173C11.9712 14.6606 12.0908 14.6739 12.2077 14.6558C12.3246 14.6377 12.4345 14.5888 12.5262 14.5141C12.618 14.4395 12.6882 14.3418 12.7297 14.231C12.7713 14.1203 12.7826 14.0005 12.7625 13.8839L12.0352 9.64728L15.1178 6.64728L15.1698 6.59062C15.2441 6.49913 15.2928 6.38958 15.311 6.27315C15.3292 6.15671 15.3161 6.03753 15.2732 5.92777C15.2303 5.818 15.1591 5.72157 15.0668 5.64829C14.9745 5.57501 14.8645 5.52751 14.7478 5.51062L10.4945 4.89328L8.59318 1.03995C8.53816 0.928305 8.45299 0.834292 8.3473 0.768551C8.24162 0.702811 8.11964 0.667969 7.99518 0.667969C7.87071 0.667969 7.74874 0.702811 7.64305 0.768551C7.53736 0.834292 7.45219 0.928305 7.39718 1.03995L5.49518 4.89328Z"
              }
              svgIconViewBox={"0 0 16 16"}
            />
            <span
              className={
                "text-[12px] text-[#FFFFFF80] leading-[18pxß] mt-[1.5px] font-normal"
              }
            >
              3.5 stars
            </span>
          </div>
        </div>
        <div className={"flex items-center gap-[8px]"}>
          <button
            className={
              "w-9 p-[6px] md:w-auto h-9 md:h-auto flex justify-center items-center md:px-[16px] md:py-[8px] bg-[#C2D24B1A] text-[13px] leading-5 text-[#C2D24B] rounded"
            }
          >
            <svg
              className={"md:hidden"}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.03 5.96592L10 0.315918L0.97 5.96592C0.39 6.31592 0 6.94592 0 7.67592V17.6759C0 18.7759 0.9 19.6759 2 19.6759H18C19.1 19.6759 20 18.7759 20 17.6759V7.67592C20 6.94592 19.61 6.31592 19.03 5.96592ZM18 17.6759H2V9.67592L10 14.6759L18 9.67592V17.6759ZM10 12.6759L2 7.67592L10 2.67592L18 7.67592L10 12.6759Z"
                fill="#C2D24B"
              />
            </svg>
            <span className={"hidden md:block"}>Mark as read</span>
          </button>
          <button
            className={
              "bg-[#3C3D54] h-9 w-9 flex justify-center items-center p-[2px]  rounded-[6px]"
            }
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_344_18077)">
                <path
                  d="M21 12C21 10.9 20.1 10 19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12ZM7 12C7 10.9 6.1 10 5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12ZM14 12C14 10.9 13.1 10 12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12Z"
                  fill="white"
                  fillOpacity="0.65"
                />
              </g>
              <defs>
                <clipPath id="clip0_344_18077">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(24) rotate(90)"
                  />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>
      <div className={"mt-[16px]"}>
        <p
          className={
            "text-[13px] md:text-[14px] leading-5 md:leading-[22px] text-[#FFFFFFA6]"
          }
        >
          While the Shahrukh Khan AI chatbot certainly has potential, I feel
          it's not as engaging as it could be. It might benefit from more
          interactivity, personalized responses, and a better emulation of
          Shahrukh's charismatic personality. Overall, it needs more
          user-centric enhancements for a lively conversation.
        </p>
      </div>
      <div className={"my-[16px] w-full h-[1px] bg-[#FFFFFF1A]"} />
      <div>
        <h3
          className={
            "text-[13px] leading-5 text-[#FFFFFFCC] font-medium mb-[4px] md:mb-[10px]"
          }
        >
          How can I improve?
        </h3>
        <div
          className={
            "flex flex-col md:flex-row md:justify-between md:gap-x-[20px] gap-y-[16px]"
          }
        >
          <p
            className={
              "text-[13px] md:text-[14px] leading-5 md:leading-[22px] text-[#FFFFFFA6]"
            }
          >
            May be enage me with the questions & other interesting topics for me
            to enjoy it
          </p>
          <button
            className={
              "flex md:flex-col  gap-x-[4px] md:gap-x-0 md:gap-y-[7px] justify-center items-center bg-[#C2D24B1A] md:px-[12px] py-[10px] md:py-[14px] text-[#C2D24B] rounded"
            }
          >
            <svg
              className={"w-[24px] md:h-[32px] h-[24px] md:h-[32px]"}
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_344_35317)">
                <path
                  d="M3.9375 3.05859L3.51525 3.45684L2.46075 4.51134L2.0625 4.93359L2.367 5.42559L3.9375 8.05059L4.14825 8.42559H6.3525L9.3525 11.4023C6.672 14.0948 3.26175 17.5163 3.14175 17.6371C1.9665 18.8116 1.96425 20.7361 3.16425 21.8558C4.3365 23.0123 6.24675 23.0423 7.3605 21.8558L7.383 21.8318L12 17.1916L16.641 21.8551L16.7108 21.9023C17.8883 23.0123 19.761 23.0273 20.8597 21.8551V21.8326H20.8822C22.0312 20.6573 22.0432 18.7471 20.8597 17.6363L20.8358 17.6138L16.9222 13.7228C19.5555 13.4768 21.618 11.2531 21.6562 8.56659H21.6795C21.6825 8.55159 21.6795 8.53434 21.6795 8.51934V8.49609C21.753 7.62909 21.5655 6.79959 21.117 6.08184L20.6025 5.28609L17.1097 8.77809L16.0553 7.67634L19.6178 4.11384L18.5865 3.69234C17.9287 3.40295 17.2186 3.25109 16.5 3.24609C13.617 3.24609 11.25 5.61309 11.25 8.49609C11.25 8.80959 11.3175 9.08184 11.367 9.36309C11.0393 9.69159 10.7933 9.96084 10.4062 10.3478L7.4295 7.37109V5.14434L7.0545 4.93359L4.4295 3.36309L3.9375 3.05859ZM16.5 4.74609C16.605 4.74609 16.6785 4.80759 16.7812 4.81659L13.9455 7.65234L14.4608 8.19159L16.5705 10.3711L17.0858 10.9103L20.0625 7.93359C20.0775 8.10609 20.2005 8.23209 20.1795 8.42559V8.49609C20.1795 10.5616 18.495 12.2461 16.4295 12.2461C16.1543 12.2461 15.8205 12.1816 15.4455 12.1051L15.0465 12.0353L14.7653 12.3166L6.30525 20.8006H6.28125V20.8246C5.74875 21.4073 4.8165 21.4216 4.1955 20.8006V20.7773H4.1715C3.58875 20.2448 3.5745 19.3126 4.1955 18.6916C4.47975 18.4066 9.984 12.8551 12.6795 10.1603L12.9847 9.85584L12.867 9.43359C12.7958 9.12596 12.7566 8.81179 12.75 8.49609C12.75 6.43059 14.4345 4.74609 16.5 4.74609ZM4.1715 4.93359L5.9295 6.01209V6.76209L5.766 6.92559H5.016L3.9375 5.16834L4.1715 4.93359ZM15.1403 14.0506L19.8053 18.6916V18.7148H19.8278C20.4113 19.2473 20.4255 20.1796 19.8053 20.8006H19.7812V20.8246C19.2488 21.4073 18.3165 21.4216 17.6955 20.8006L13.0545 16.1371L15.1403 14.0506Z"
                  fill="#C2D24B"
                />
              </g>
              <defs>
                <clipPath id="clip0_344_35317">
                  <rect
                    className={"w-[24px] md:h-[32px] h-[24px] md:h-[32px]"}
                    fill="white"
                    transform="translate(0 0.996094)"
                  />
                </clipPath>
              </defs>
            </svg>
            Utilize this data <br /> for Training
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
