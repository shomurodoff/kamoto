import React from "react";
import Categories from "../../components/events/categories";
import Card from "../../components/events/card";
import { cards } from "../../components/events/card/cards";
import { get, map } from "lodash";
import { UsersListPagination } from "../../../apps/user-management/users-list/components/pagination/UsersListPagination";
import ReactPaginate from "react-paginate";
import HeroSection from "../../components/events/hero-section/hero-section";

const Index = () => {
  return (
    <div>
      <HeroSection />
      <Categories />
      <div
        className={
          "grid grid-cols-12 gap-x-[8px] md:gap-x-[18px]  gap-y-5 mb-9"
        }
      >
        {map(cards, (el) => (
          <div
            className={"col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2"}
            key={get(el, "id")}
          >
            <Card
              image={get(el, "image")}
              name={get(el, "name")}
              occupation={get(el, "occupation")}
              isVerified={get(el, "isVerified")}
              followers={get(el, "follower")}
              likes={get(el, "likes")}
            />
          </div>
        ))}
      </div>
      <div className={"flex justify-between items-center"}>
        <div className={"flex items-center gap-x-2"}>
          <div className={"w-[75px]"}>
            <select
              className={
                "form-control form-select form-control-sm py-0 leading-0 !min-h-[32px] !h-[32px]"
              }
            >
              <option value={10}>10</option>
              <option value={12}>12</option>
              <option value={14}>14</option>
              <option value={16}>16</option>
              <option value={18}>17</option>
              <option value={20}>20</option>
            </select>
          </div>
          <p
            className={
              "text-[#FFFFFFA6] text-[12px] leading-[18px] hidden md:inline-block"
            }
          >
            Showing 1 to 18 of 570 records
          </p>
        </div>
        <div>
          <ReactPaginate
            pageCount={4}
            containerClassName={"flex gap-x-2"}
            pageClassName={
              "w-8 h-8 bg-[#21233A] text-[14px] leading-[18px] text-[#FFFFFF99] flex items-center justify-center rounded"
            }
            nextClassName={
              "w-8 h-8 bg-[#21233A] flex items-center justify-center rounded"
            }
            previousClassName={
              "w-8 h-8 bg-[#21233A] flex items-center justify-center rounded"
            }
            activeClassName={"bg-[#C2D24B] text-black"}
            nextLabel={
              <svg
                width="5"
                height="7"
                viewBox="0 0 5 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.218094 0.265H1.71309L4.85909 3.242L1.71309 6.232H0.218094L3.36409 3.242L0.218094 0.265Z"
                  fill="white"
                  fillOpacity="0.6"
                />
              </svg>
            }
            previousLabel={
              <svg
                width="6"
                height="7"
                viewBox="0 0 6 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.11953 6.232L0.986531 3.242L4.11953 0.265H5.61453L2.46853 3.242L5.61453 6.232H4.11953Z"
                  fill="white"
                  fillOpacity="0.6"
                />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
