import React from "react";
import { LineChart } from "../../../../components/line-chart";
import { Tooltip } from "react-bootstrap";
import { ToolTipUI } from "../../../widgets/components/UI/ToolTipUI";

type Props = {
  title?: string;
  profit?: string;
  prevMonthProfit?: string;
  percentage?: string;
  withData?: boolean;
};
const Index: React.FC<Props> = ({
  title,
  profit,
  prevMonthProfit,
  percentage,
  withData,
}) => {
  return (
    <>
      <div className={"px-5 pt-5"}>
        <h3 className="flex items-center gap-1 text-[14px] leading-5 text-[#FFFFFFA6] font-normal mb-4">
          {title}
          <ToolTipUI tooltipText={title} />
        </h3>
        <div className="flex items-center gap-4 mb-1">
          <h1 className="mb-0 text-[28px] leading-[36px] text-[#FFFFFFCC] font-semibold flex items-center gap-1">
            <span className={"text-[14px] leading-5 text-[#FFFFFFA6]"}>$</span>
            {profit}
          </h1>
          <p className="mb-0 flex items-center text-[14px] leading-5 text-[#3DD883] font-normal">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.5"
                d="M10.7617 14.2644V6.1677C10.7617 5.76119 10.4205 5.43164 9.9996 5.43164C9.57869 5.43164 9.23748 5.76119 9.23748 6.1677V14.2644C9.23748 14.6709 9.57869 15.0005 9.9996 15.0005C10.4205 15.0005 10.7617 14.6709 10.7617 14.2644Z"
                fill="#3DD883"
              />
              <path
                d="M10.4311 7.31969L13.6201 10.3996C13.9357 10.7045 14.4476 10.7045 14.7632 10.3996C15.0789 10.0947 15.0789 9.60039 14.7632 9.29551L10.5389 5.21559C10.2413 4.92814 9.75872 4.92814 9.46111 5.21559L5.23676 9.29551C4.92108 9.60039 4.92108 10.0947 5.23676 10.3996C5.55244 10.7045 6.06426 10.7045 6.37994 10.3996L9.56887 7.31969C9.80696 7.08973 10.193 7.08973 10.4311 7.31969Z"
                fill="#3DD883"
              />
            </svg>
            {percentage}%
          </p>
        </div>
        <p
          className={
            "text-[14px] leading-5 font-normal text-[#FFFFFFA6] flex gap-3"
          }
        >
          <span>${prevMonthProfit}</span>previous month
        </p>
      </div>
      <div className={"-mx-3 overflow-hidden"}>
        <LineChart className={""} withData={withData} />
      </div>
    </>
  );
};

export default Index;
