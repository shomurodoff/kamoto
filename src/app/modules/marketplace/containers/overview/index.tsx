import React from "react";
import Breadcrumb from "../../components/overview/breadcrumb";
import { LineChart } from "../../../../components/line-chart";
import Chart from "../../components/chart";
import { ChartOne } from "../../../dashboard/components/chart/ChartOne";

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
            profit={"25,560"}
            percentage={"5,6"}
            prevMonthProfit={"19,562"}
            withData={true}
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
      <div
        className={
          "col-span-12 md:col-span-3 bg-[#171825] shadow-[0px_1px_4px_0px_#0000001A] rounded"
        }
      >
        <div className={"px-5 pt-5"}>
          <h3 className="flex items-center gap-1 text-[14px] leading-5 text-[#FFFFFFA6] font-normal mb-2">
            API Requests
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.99967 14.6654C4.31767 14.6654 1.33301 11.6807 1.33301 7.9987C1.33301 4.3167 4.31767 1.33203 7.99967 1.33203C11.6817 1.33203 14.6663 4.3167 14.6663 7.9987C14.6663 11.6807 11.6817 14.6654 7.99967 14.6654ZM7.99967 13.332C9.41416 13.332 10.7707 12.7701 11.7709 11.7699C12.7711 10.7697 13.333 9.41319 13.333 7.9987C13.333 6.58421 12.7711 5.22766 11.7709 4.22746C10.7707 3.22727 9.41416 2.66536 7.99967 2.66536C6.58519 2.66536 5.22863 3.22727 4.22844 4.22746C3.22824 5.22766 2.66634 6.58421 2.66634 7.9987C2.66634 9.41319 3.22824 10.7697 4.22844 11.7699C5.22863 12.7701 6.58519 13.332 7.99967 13.332ZM7.33301 4.66536H8.66634V5.9987H7.33301V4.66536ZM7.33301 7.33203H8.66634V11.332H7.33301V7.33203Z"
                fill="white"
                fillOpacity="0.65"
              />
            </svg>
          </h3>
          <div
            className={
              "text-[12px] leading-5 font-normal text-[#FFFFFFA6] flex gap-9 mb-2"
            }
          >
            <p className={"flex gap-2"}>
              Successful <span>11K</span>
            </p>
            <p>
              Successful <span>11K</span>
            </p>
          </div>
          <p
            className={
              "text-[12px] leading-5 font-normal text-[#FFFFFFA6] flex gap-3 mb-2"
            }
          >
            Yesterday
          </p>
          <p
            className={
              "text-[12px] leading-5 font-normal text-[#FFFFFFA6] flex gap-3"
            }
          >
            <span>successful: 11k,</span>Failed: 50
          </p>
        </div>
        <div className={"-mx-3 overflow-hidden"}>
          <ChartOne className={""} />
        </div>
        <div className="flex justify-end px-2 pb-2">
          <a
            className={
              "text-[12px] leading-[18px] text-[#C2D24B]  flex items-center gap-1"
            }
          >
            Check API page
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.3"
                d="M4.00065 7.33268C3.63246 7.33268 3.33398 7.63116 3.33398 7.99935C3.33398 8.36754 3.63246 8.66602 4.00065 8.66602H12.0007C12.3688 8.66602 12.6673 8.36754 12.6673 7.99935C12.6673 7.63116 12.3688 7.33268 12.0007 7.33268H4.00065Z"
                fill="#C2D24B"
              />
              <path
                d="M7.52794 11.5279C7.26759 11.7883 7.26759 12.2104 7.52794 12.4708C7.78829 12.7311 8.2104 12.7311 8.47075 12.4708L12.4708 8.47075C12.7231 8.21837 12.732 7.81198 12.4908 7.54887L8.82412 3.54887C8.57532 3.27746 8.15361 3.25912 7.8822 3.50791C7.61079 3.75671 7.59245 4.17842 7.84125 4.44983L11.0766 7.9793L7.52794 11.5279Z"
                fill="#C2D24B"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
