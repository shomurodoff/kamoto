/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { BasicButton } from "../../widgets/components/UI/BasicButton";
import { ToolTipUI } from "../../widgets/components/UI/ToolTipUI";
import { putPaypalReferralEmail } from "../core/_requests";
import SearchInput from "./SearchInput";

export function Referral({
  referral,
  totalEarning,
  totalReferred,
  setPaypalId,
  paypalId,
}: {
  paypalId?: string;
  referral?: string;
  totalEarning?: string;
  totalReferred?: string;
  setPaypalId: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(false);

  const addPaypalEmail = async () => {
    try {
      setLoading(true);
      const {
        data: { success, errors },
      } = await putPaypalReferralEmail({
        paypalEmail: paypalId,
      });

      if (success) {
        setLoading(false);
        toast.success(formatMessage({ id: "Paypal email updated" }));
      } else {
        setLoading(false);
        errors.forEach((error: string) => {
          toast.error(formatMessage({ id: error }));
        });
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <SearchInput />
      <div className="bg-[#171825] md:px-[50px] px-[16px] py-[16px] md:pb-[40px] shadow-default rounded min-h-[70vh]">
        <div className={"mb-[16px] md:mb-[32px]"}>
          <h4 className="text-[16px] leading-[22px] text-[#FFFFFFCC] font-medium  mb-[4px] md:mb-[8px]">
            {formatMessage({ id: "Invite Friends & Start Earning" })}
          </h4>
          <p className="text-[14px] leading-5 text-[#FFFFFFA6] font-normal">
            {formatMessage({
              id: "Invite a friend to foundercrate, and enjoy a lifetime of earnings from their activity.",
            })}
          </p>
        </div>
        <div className={"flex my-[16px] md:hidden"}>
          <BasicButton
            buttonText={formatMessage({ id: "Share" })}
            height="40px"
            border="none"
            color="#C2D24B"
            textColor="#000000"
            customClass={"min-w-[120px] flex-grow"}
            padding="8px 24px"
          />
        </div>
        <div>
          <div className={"grid grid-cols-12 md:gap-x-[32px] gap-y-[16px]"}>
            <div className="col-span-12 md:col-span-4">
              <label className="flex items-center gap-1 mb-[4px] md:mb-[8px]">
                {formatMessage({ id: "Referral Link" })}{" "}
                <ToolTipUI
                  tooltipText={"GLOBAL.TOOLTIP.REFFERAL.REFFERALLINK"}
                />
              </label>
              <div className={"relative rounded"}>
                <input
                  type="text"
                  className="flex-grow bg-[#2E2F45] form-control h-[40px] border  focus:outline-0!border  pr-[40px]"
                  value={`${window.location.protocol}//${window.location.hostname}/auth/registration?r=${referral}`}
                  placeholder="Some path"
                  // id='copy-input'
                  readOnly
                />
                <svg
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.protocol}//${window.location.hostname}/auth/registration?r=${referral}`
                    );
                    toast.success(formatMessage({ id: "Copied Successfully" }));
                  }}
                  className={
                    "absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
                  }
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_344_14928)">
                    <path
                      d="M7 6V3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2H20C20.2652 2 20.5196 2.10536 20.7071 2.29289C20.8946 2.48043 21 2.73478 21 3V17C21 17.2652 20.8946 17.5196 20.7071 17.7071C20.5196 17.8946 20.2652 18 20 18H17V21C17 21.552 16.55 22 15.993 22H4.007C3.87513 22.0008 3.7444 21.9755 3.62232 21.9256C3.50025 21.8757 3.38923 21.8022 3.29566 21.7093C3.20208 21.6164 3.12779 21.5059 3.07705 21.3841C3.02632 21.2624 3.00013 21.1319 3 21L3.003 7C3.003 6.448 3.453 6 4.01 6H7ZM5.003 8L5 20H15V8H5.003ZM9 6H17V16H19V4H9V6Z"
                      fill="#8898A6"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_344_14928">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4">
              <label className="flex items-center gap-1 mb-[4px] md:mb-[8px]">
                {formatMessage({ id: "Referral Link" })}{" "}
                <ToolTipUI
                  tooltipText={"GLOBAL.TOOLTIP.REFFERAL.REFFERALLINK"}
                />
              </label>
              <div className={"relative"}>
                <input
                  type="text"
                  className="flex-grow bg-[#2E2F45] form-control h-[40px]  border-r-0  focus:outline-0"
                  value={referral}
                  placeholder="Some path"
                  // id='copy-input'
                  readOnly
                />
                <svg
                  onClick={() => {
                    navigator.clipboard.writeText(`${referral}`);
                    toast.success(formatMessage({ id: "Copied Successfully" }));
                  }}
                  className={
                    "absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
                  }
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_344_14928)">
                    <path
                      d="M7 6V3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2H20C20.2652 2 20.5196 2.10536 20.7071 2.29289C20.8946 2.48043 21 2.73478 21 3V17C21 17.2652 20.8946 17.5196 20.7071 17.7071C20.5196 17.8946 20.2652 18 20 18H17V21C17 21.552 16.55 22 15.993 22H4.007C3.87513 22.0008 3.7444 21.9755 3.62232 21.9256C3.50025 21.8757 3.38923 21.8022 3.29566 21.7093C3.20208 21.6164 3.12779 21.5059 3.07705 21.3841C3.02632 21.2624 3.00013 21.1319 3 21L3.003 7C3.003 6.448 3.453 6 4.01 6H7ZM5.003 8L5 20H15V8H5.003ZM9 6H17V16H19V4H9V6Z"
                      fill="#8898A6"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_344_14928">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4">
              <label className="flex items-center gap-1 mb-[4px] md:mb-[14px]">
                {formatMessage({ id: "Share" })}{" "}
                <ToolTipUI tooltipText={"GLOBAL.TOOLTIP.REFFERAL.SHARELINK"} />
              </label>
              <div className="flex gap-x-2 md:mt-[8px]">
                <span
                  className={`svg-icon svg-icon-1 cursor-pointer`}
                  onClick={() =>
                    window.open(
                      `https://wa.me/?text=You are invited to join FounderCrate. Please follow my referral link to signup: ${window.location.protocol}//${window.location.hostname}/auth/registration?r=${referral}`,
                      "_blank",
                      "noreferrer"
                    )
                  }
                >
                  <img
                    src={toAbsoluteUrl("/media/svg/social-logos/whatsapp.svg")}
                    height="25px"
                    width="25px"
                    alt="img_icon"
                  />
                </span>
                <span
                  className={`svg-icon svg-icon-1 social-media-icon cursor-pointer`}
                  onClick={() =>
                    window.open(
                      `https://telegram.me/share/url?url=${window.location.protocol}//${window.location.hostname}/auth/registration?r=${referral}`,
                      "_blank",
                      "noreferrer"
                    )
                  }
                >
                  <img
                    src={toAbsoluteUrl("/media/svg/social-logos/telegram.svg")}
                    height="25px"
                    width="25px"
                    alt="img_icon"
                  />
                </span>
                <span
                  className={`svg-icon svg-icon-1 social-media-icon cursor-pointer`}
                  onClick={() =>
                    window.open(
                      `https://discord.com/share/url?url=${window.location.protocol}//${window.location.hostname}/auth/registration?r=${referral}`,
                      "_blank",
                      "noreferrer"
                    )
                  }
                >
                  <img
                    src={toAbsoluteUrl("/media/svg/social-logos/discord.svg")}
                    height="25px"
                    width="25px"
                    alt="img_icon"
                  />
                </span>
                <span
                  className={`svg-icon svg-icon-1 social-media-icon cursor-pointer`}
                  onClick={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${window.location.protocol}//${window.location.hostname}/auth/registration?r=${referral}`,
                      "_blank",
                      "noreferrer"
                    )
                  }
                >
                  <img
                    src={toAbsoluteUrl("/media/svg/social-logos/facebook.svg")}
                    height="25px"
                    width="25px"
                    alt="img_icon"
                  />
                </span>
                <span
                  className={`svg-icon svg-icon-1 social-media-icon cursor-pointer`}
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?url=${window.location.protocol}//${window.location.hostname}/auth/registration?r=${referral}`,
                      "_blank",
                      "noreferrer"
                    )
                  }
                >
                  <img
                    src={toAbsoluteUrl("/media/svg/social-logos/twitter.svg")}
                    height="25px"
                    width="25px"
                    alt="img_icon"
                  />
                </span>
                <span
                  className={`svg-icon svg-icon-1 social-media-icon cursor-pointer`}
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/share/?url='${window.location.protocol}//${window.location.hostname}/auth/registration?r=${referral}'`,
                      "_blank",
                      "noreferrer"
                    )
                  }
                >
                  <img
                    src={toAbsoluteUrl("/media/svg/social-logos/linkedin.svg")}
                    height="25px"
                    width="25px"
                    alt="img_icon"
                  />
                </span>
              </div>
            </div>
          </div>
          <div
            className={
              "grid grid-cols-12 gap-x-[8px] md:gap-x-[16px] max-w-[1200px] my-[14px] md:my-[32px]"
            }
          >
            <div className="col-span-6 md:col-span-3 bg-[#2E2F45] rounded border border-[#FFFFFF1A] p-[16px] md:pt-[26px] md:pb-[20px]">
              <img
                src={toAbsoluteUrl("/media/icons/setting/hand_holding.svg")}
                alt=""
                className="button-icon"
              />
              <h4
                className={
                  "text-[16px] md:text-[20px] leading-[28px] text-[#FFFFFFCC] font-semibold mb-[4px] md:mb-[8px]"
                }
              >{`$${totalEarning}`}</h4>
              <p
                className={"text-[12px] leading-4 text-[#FFFFFFCC] font-normal"}
              >
                {formatMessage({ id: "Total Referral earning" })}
              </p>
            </div>{" "}
            <div className="col-span-6 md:col-span-3 bg-[#2E2F45] rounded border border-[#FFFFFF1A] p-[16px] md:pt-[26px] md:pb-[20px]">
              <img
                src={toAbsoluteUrl("/media/icons/setting/people.svg")}
                alt=""
                className="button-icon"
              />
              <h4
                className={
                  "text-[16px] md:text-[20px] leading-[28px] text-[#FFFFFFCC] font-semibold mb-[4px] md:mb-[8px]"
                }
              >{`$${totalReferred}`}</h4>
              <p
                className={"text-[12px] leading-4 text-[#FFFFFFCC] font-normal"}
              >
                {formatMessage({ id: "Total Referred Companies" })}
              </p>
            </div>{" "}
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-12 mb-1">
              <label className="flex items-center gap-1 mb-[4px] md:mb-[8px]">
                {formatMessage({
                  id: "Your PayPal ID for referral earning payout",
                })}{" "}
                <ToolTipUI
                  tooltipText={"GLOBAL.TOOLTIP.REFFERAL.PAYPAL_REFERRAL"}
                />
              </label>
            </div>
            <div className="md:col-span-5 col-span-12">
              <div className="flex flex-col md:flex-row  gap-x-[20px] gap-y-[16px]">
                <input
                  type="email"
                  className="flex-grow bg-[#2E2F45] form-control h-[40px]  border-r-0  focus:outline-0"
                  placeholder="mypaypalid@paypal.com"
                  onChange={(e) => setPaypalId(e.target.value)}
                  value={paypalId}
                />
                <BasicButton
                  disabled={loading}
                  loading={loading}
                  buttonText={formatMessage({ id: "Save" })}
                  height="40px"
                  border="none"
                  color="#C2D24B"
                  textColor="#000000"
                  customClass={"min-w-[120px] flex-grow"}
                  padding="8px 24px"
                  onClick={addPaypalEmail}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
