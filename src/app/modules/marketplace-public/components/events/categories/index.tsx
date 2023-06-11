import { get, isEqual, map } from "lodash";
import React, { useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { categories } from "./categories";
import clsx from "clsx";
import SVG from "react-inlinesvg";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  return (
    <div>
      <Swiper
        modules={[Navigation]}
        className="w-full personality-swiper py-10"
        navigation={true}
        spaceBetween={10}
        slidesPerView={"auto"}
        pagination={{
          clickable: true,
        }}
      >
        {map(categories, (el, i) => (
          <SwiperSlide
            key={get(el, "id")}
            className={"w-auto"}
            onClick={() => setActiveCategory(i)}
          >
            <div
              className={clsx(
                "flex items-center gap-x-[10px] px-[14px] md:px-[24px] py-[8px] md:py-[16px]  shadow-default rounded-[75px]",
                isEqual(activeCategory, i)
                  ? "bg-[#C2D24B] text-[#000]"
                  : "bg-[#21233A] text-[#FFFFFFA6]"
              )}
            >
              <img src={get(el, "icon")} />
              <p className={"text-[14px] leading-5"}>{get(el, "title")}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Index;
