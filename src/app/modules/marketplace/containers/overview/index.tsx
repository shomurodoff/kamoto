import React from "react";
import Breadcrumb from "../../components/overview/breadcrumb";
import { LineChart } from "../../../../components/line-chart";
import Chart from "../../components/chart";
import { ChartOne } from "../../../dashboard/components/chart/ChartOne";
import { get, map, range } from "lodash";
import { toAbsoluteUrl } from "../../../../../_metronic/helpers";
import StarRatings from "react-star-ratings";
import { ToolTipUI } from "../../../widgets/components/UI/ToolTipUI";
import ReactCohortGraph from "react-cohort-graph";
import { CorothonChart } from "../../../../components/cohort-chart";

const Index = () => {
  return (
    <div className="overflow-scroll px-5 py-3">
      <Breadcrumb />
      <div
        className={
          "grid grid-cols-12  md:gap-x-[18px] gap-y-[14px]  my-[16px] md:my-[24px]"
        }
      >
        <div
          className={
            "col-span-12 md:col-span-6 xl:col-span-3 shadow-default bg-[#171825] rounded"
          }
        >
          <Chart
            title={"Gross Revenue"}
            profit={"29,420"}
            percentage={"2,6"}
            prevMonthProfit={"22,564"}
            withData={true}
          />
        </div>
        <div
          className={
            "col-span-12 md:col-span-6 xl:col-span-3 shadow-default bg-[#171825] rounded"
          }
        >
          <Chart
            title={"Net Revenue"}
            // profit={"25,560"}
            percentage={"5,6"}
            // prevMonthProfit={"19,562"}
            withData={false}
          />
        </div>
        <div
          className={
            "col-span-12 md:col-span-6 xl:col-span-3 shadow-default bg-[#171825] rounded"
          }
        >
          <Chart
            title={"Spend per User"}
            profit={"55.48"}
            percentage={"5,8"}
            prevMonthProfit={"52.77"}
            withData={true}
          />
        </div>
        <div
          className={
            "col-span-12 md:col-span-6 xl:col-span-3 shadow-default bg-[#171825] rounded"
          }
        >
          <Chart
            title={"New Users"}
            profit={"56.4k"}
            percentage={"5.8"}
            prevMonthProfit={"50.18k"}
            withData={true}
          />
        </div>
      </div>
      <div className={"bg-[#2E2F45] h-[1px]  mb-6"} />
      <div
        className={
          "grid grid-cols-12 bg-[#171825] shadow-[0px_1px_4px_0px_#0000001A] rounded mb-6"
        }
      >
        <div className={"col-span-12 md:col-span-7 p-6"}>
          <h3
            className={
              "text-[20px] leading-7 font-semibold mb-5 text-[#FFFFFFCC]"
            }
          >
            Today
          </h3>
          <div className={"flex gap-20"}>
            <div>
              <h3 className="flex items-center gap-1 text-[14px] leading-5 text-[#FFFFFFA6] font-normal mb-4">
                Gross Volume
                <ToolTipUI tooltipText={"Gross Volume"} />
              </h3>
              <div className="flex items-center gap-4 mb-1">
                <h1 className="mb-0 text-[28px] leading-[36px] text-[#FFFFFFCC] font-semibold flex items-center gap-1">
                  <span className={"text-[14px] leading-5 text-[#FFFFFFA6]"}>
                    $
                  </span>
                  29,420
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
                  2.2%
                </p>
              </div>
            </div>
            <div>
              <h3 className="flex items-center gap-1 text-[14px] leading-5 text-[#FFFFFFA6] font-normal mb-4">
                Yesterday
              </h3>
              <h3 className={"text-[20px] leading-7 text-[#FFFFFFA6]"}>$156</h3>
            </div>
          </div>
          <ChartOne className={""} />
        </div>
        <div className={"col-span-12 md:col-span-5 p-6 "}>
          <div className={"border-b border-[#2E2F45] py-6"}>
            <div className={"flex items-center justify-between mb-2 "}>
              <div>
                <h3 className="flex items-center gap-1 text-[14px] leading-5 text-[#FFFFFFA6] font-normal mb-3">
                  USD Balance
                  <ToolTipUI tooltipText={"USD Balance"} />
                </h3>
                <h1 className="mb-0 text-[28px] leading-[36px] text-[#FFFFFFCC] font-semibold flex items-center gap-1">
                  <span className={"text-[14px] leading-5 text-[#FFFFFFA6]"}>
                    $
                  </span>
                  892.48
                </h1>
              </div>
            </div>
            <p className={"text-[13px] leading-[18px] text-[#FFFFFFA6]"}>
              Estimated future payouts ($748.68 available instantly)
            </p>
          </div>
          <div className={"py-6"}>
            <div className={"flex items-center justify-between mb-2 "}>
              <div>
                <h3 className="flex items-center gap-1 text-[14px] leading-5 text-[#FFFFFFA6] font-normal mb-3">
                  Payouts
                  <ToolTipUI tooltipText={"Payouts"} />
                </h3>
                <h1 className="mb-0 text-[28px] leading-[36px] text-[#FFFFFFCC] font-semibold flex items-center gap-1">
                  <span className={"text-[14px] leading-5 text-[#FFFFFFA6]"}>
                    $
                  </span>
                  892.48
                </h1>
              </div>
            </div>
            <p className={"text-[13px] leading-[18px] text-[#FFFFFFA6]"}>
              Expected tomorrow
            </p>
          </div>
        </div>
      </div>
      <div
        className={"grid grid-cols-12 md:gap-x-[22px] gap-y-[14px] md:gap-y-0 "}
      >
        <div
          className={
            "col-span-12 md:col-span-6 bg-[#171825] shadow-default p-[8px] md:p-5 rounded"
          }
        >
          <div className={"flex justify-between items-center"}>
            <h3
              className={
                "text-[16px] leading-6 text-[#FFFFFFCC] font-semibold flex items-center"
              }
            >
              Revenue retention by cohort
              <ToolTipUI tooltipText={"Revenue retention by cohort"} />
            </h3>
            <span className={"text-[14px] leading-5 text-[#FFFFFFA6]"}>
              Last 12 months
            </span>
          </div>
          <CorothonChart className={""} />
        </div>
        <div
          className={
            "col-span-12 md:col-span-6 bg-[#171825] shadow-default p-[8px] md:p-5 rounded "
            // cohort
          }
        >
          <div className={"flex justify-between items-center"}>
            <h3
              className={
                "text-[16px] leading-6 text-[#FFFFFFCC] font-semibold flex items-center"
              }
            >
              Subscriber retention by cohort
              <ToolTipUI tooltipText={"Subscriber retention by cohort"} />
            </h3>
            <span className={"text-[14px] leading-5 text-[#FFFFFFA6]"}>
              Last 12 months
            </span>
          </div>
          <CorothonChart className={""} />
        </div>
      </div>
    </div>
  );
};

export default Index;
