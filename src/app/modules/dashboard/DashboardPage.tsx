import React from "react";
import { ChartOne } from "./components/chart/ChartOne";
import { ChartCountries } from "./components/chart/ChartCountries";
import Map from "./components/chart/Map";
import Breadcrumb from "./components/breadcrumb";
import "../../assets/index.css";
// @ts-ignore
import StarRatings from "react-star-ratings";
import { toAbsoluteUrl } from "../../../_metronic/helpers";
import { map, range } from "lodash";
const DashboardPage = () => {
  return (
    <div className="h-[100vh] overflow-scroll px-5 py-3">
      <Breadcrumb />
      <div className={"grid grid-cols-12 gap-4 my-[16px] md:my-[24px]"}>
        <div
          className={
            "col-span-12 md:col-span-3 bg-[#171825] shadow-[0px_1px_4px_0px_#0000001A] rounded"
          }
        >
          <div className={"px-5 pt-5"}>
            <h3 className="flex items-center gap-1 text-[14px] leading-5 text-[#FFFFFFA6] font-normal mb-4">
              Gross Revenue
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
            <p
              className={
                "text-[14px] leading-5 font-normal text-[#FFFFFFA6] flex gap-3"
              }
            >
              <span>$22,564</span>previous month
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
              Check Revenue
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
        <div
          className={
            "col-span-12 md:col-span-3 bg-[#171825] shadow-[0px_1px_4px_0px_#0000001A] rounded"
          }
        >
          <div className={"px-5 pt-5"}>
            <h3 className="flex items-center gap-1 text-[14px] leading-5 text-[#FFFFFFA6] font-normal mb-4">
              Feedbacks
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
            <div className="flex items-center gap-4 mb-6">
              <h1 className="mb-0 text-[28px] leading-[36px] text-[#FFFFFFCC] font-semibold flex items-center gap-1">
                29,420
              </h1>
            </div>
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
              Check Feedbacks
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
        <div
          className={
            "col-span-12 md:col-span-3 bg-[#171825] shadow-[0px_1px_4px_0px_#0000001A] rounded"
          }
        >
          <div className={"px-5 pt-5"}>
            <h3 className="flex items-center gap-1 text-[14px] leading-5 text-[#FFFFFFA6] font-normal mb-4">
              Feedbacks
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
            <div className="flex items-center gap-4 mb-6">
              <h1 className="mb-0 text-[28px] leading-[36px] text-[#FFFFFFCC] font-semibold flex items-center gap-1">
                32K
              </h1>
            </div>
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
              Personality Profile
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
      <div>
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
                <h3 className={"text-[20px] leading-7 text-[#FFFFFFA6]"}>
                  $156
                </h3>
              </div>
            </div>
            <ChartOne className={""} />
          </div>
          <div className={"col-span-12 md:col-span-5 p-6 "}>
            <div className={"border-b border-[#2E2F45] py-6"}>
              <div className={"flex items-center justify-between mb-2 "}>
                <div>
                  <h3 className="flex items-center gap-1 text-[14px] leading-5 text-[#FFFFFFA6] font-normal mb-3">
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
                  <h1
                    className={
                      " text-[28px] text-[#FFFFFFCC] leading-[36px] font-semibold "
                    }
                  >
                    9.24k
                  </h1>
                </div>
                <a
                  className={
                    "text-[12px] leading-[18px] text-[#C2D24B]  flex items-center gap-1"
                  }
                >
                  Check API Dashboard
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
              <p className={"text-[13px] leading-[18px] text-[#FFFFFFA6]"}>
                Number of total API Requests received today.
              </p>
            </div>
            <div className={"py-6"}>
              <div className={"flex items-center justify-between mb-2 "}>
                <div>
                  <h3 className="flex items-center gap-1 text-[14px] leading-5 text-[#FFFFFFA6] font-normal mb-3">
                    Chat Prompt Received
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
                  <h1
                    className={
                      " text-[28px] text-[#FFFFFFCC] leading-[36px] font-semibold "
                    }
                  >
                    8.92k
                  </h1>
                </div>
                <a
                  className={
                    "text-[12px] leading-[18px] text-[#C2D24B]  flex items-center gap-1"
                  }
                >
                  Check Engagement
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
              <p className={"text-[13px] leading-[18px] text-[#FFFFFFA6]"}>
                Total Chat Prompts Received by your AI Personality today.
              </p>
            </div>
          </div>
        </div>
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
              Reviews & ratings
            </h3>
            <div className={"flex gap-20"}>
              <div>
                <h3 className="flex items-center gap-1 text-[14px] leading-5 text-[#FFFFFFA6] font-normal mb-4">
                  Current Rating
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
                <div className="flex items-center gap-4 mb-1">
                  <h1 className="mb-0 text-[28px] leading-[36px] text-[#FFFFFFCC] font-semibold flex items-center gap-1">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_344_15763)">
                        <path
                          d="M8.24325 7.33992L1.86325 8.26492L1.75025 8.28792C1.57919 8.33333 1.42325 8.42333 1.29835 8.54872C1.17344 8.67412 1.08406 8.83041 1.03932 9.00165C0.994575 9.17289 0.996081 9.35293 1.04368 9.5234C1.09128 9.69386 1.18327 9.84864 1.31025 9.97192L5.93225 14.4709L4.84225 20.8259L4.82925 20.9359C4.81878 21.1128 4.85552 21.2894 4.9357 21.4474C5.01589 21.6055 5.13664 21.7394 5.28559 21.8354C5.43454 21.9315 5.60634 21.9862 5.7834 21.994C5.96046 22.0018 6.13642 21.9625 6.29325 21.8799L11.9993 18.8799L17.6922 21.8799L17.7922 21.9259C17.9573 21.9909 18.1367 22.0109 18.312 21.9837C18.4873 21.9565 18.6522 21.8832 18.7898 21.7712C18.9275 21.6592 19.0328 21.5127 19.0951 21.3466C19.1574 21.1804 19.1743 21.0008 19.1442 20.8259L18.0532 14.4709L22.6772 9.97092L22.7552 9.88592C22.8667 9.74869 22.9397 9.58438 22.967 9.40972C22.9942 9.23506 22.9747 9.0563 22.9103 8.89165C22.846 8.72701 22.7392 8.58235 22.6007 8.47244C22.4623 8.36252 22.2972 8.29126 22.1222 8.26592L15.7423 7.33992L12.8903 1.55992C12.8077 1.39246 12.68 1.25144 12.5214 1.15283C12.3629 1.05422 12.1799 1.00195 11.9933 1.00195C11.8066 1.00195 11.6236 1.05422 11.4651 1.15283C11.3065 1.25144 11.1788 1.39246 11.0963 1.55992L8.24325 7.33992Z"
                          fill="#FFAD0F"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_344_15763">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    4.24
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
                    2.6%
                  </p>
                </div>
              </div>
            </div>
            <ChartOne className={""} />
          </div>
          <div className={"col-span-12 md:col-span-5 p-6 "}>
            <h3
              className={
                "text-[20px] leading-7 font-semibold mb-5 text-[#FFFFFFCC]"
              }
            >
              Reviews & ratings
            </h3>
            <div className={""}>
              {map(range(0, 2), (item, index) => (
                <div className={`${index === 0 && "mb-4"}`}>
                  <div className={"flex justify-between mb-[14px]"}>
                    <div className={"flex gap-1 items-start"}>
                      <img
                        src={toAbsoluteUrl("/media/avatars/300-1.jpg")}
                        alt="Metornic"
                        className={"w-8 h-8 rounded-full"}
                      />
                      <div>
                        <h4
                          className={
                            "text-[14px] leading-5 text-[#FFFFFFCC] font-medium"
                          }
                        >
                          Mike Hudson
                        </h4>
                        <p
                          className={
                            "text-[12px] leading-[18px] text-[#FFFFFF80]"
                          }
                        >
                          Yesterday at 5:06 PM
                        </p>
                      </div>
                    </div>
                    <div className={"flex items-center gap-2"}>
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
                  <p className={"text-[12px] leading-[18px] text-[#FFFFFFA6]"}>
                    While the Shahrukh Khan AI chatbot certainly has potential,
                    I feel it's not as engaging as it could be. It might benefit
                    from more interactivity, personalized responses, and a
                    better emulation...
                  </p>
                </div>
              ))}
              <div className={"flex justify-end mt-4"}>
                <a
                  className={
                    "text-end flex items-center gap-2 text-[#C2D24B] font-medium text-[12px]"
                  }
                >
                  Earning & Reports
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
        </div>
        <div
          className={
            "grid grid-cols-12  bg-[#171825] shadow-[0px_1px_4px_0px_#0000001A] rounded p-5"
          }
        >
          <div
            className={
              "col-span-12 md:col-span-6 border-[#2E2F45] md:border-r p-3"
            }
          >
            <h4
              className={
                "flex justify-between items-center mb-8 text-[16px] leading-6 font-semibold"
              }
            >
              Countries{" "}
              <span
                className={
                  "flex items-center gap-2 text-[#C2D24B] font-medium text-[12px]"
                }
              >
                Earning & Reports
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
              </span>
            </h4>
            <Map />
          </div>
          <div className={"col-span-12 md:col-span-6 p-3"}>
            <h4
              className={
                "flex justify-between items-center mb-8 text-[16px] leading-6 font-semibold"
              }
            >
              Users
            </h4>
            <div className={"-mt-10"}>
              <ChartCountries className={""} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DashboardPage };
