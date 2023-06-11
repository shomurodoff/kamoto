import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Controller, EffectFade, EffectCoverflow } from "swiper";
import { get } from "lodash";
import clsx from "clsx";
import "swiper/scss/controller";
import { toAbsoluteUrl } from "../../../../../../_metronic/helpers";
import { useNavigate } from "react-router-dom";
const Index = ({ ...rest }) => {
  const [height, setHeight] = useState(0);
  const navigate = useNavigate();
  const [firstSwiper, setFirstSwiper] = useState<any | void>(null);
  const [secondSwiper, setSecondSwiper] = useState<any | void>(null);
  const swiperRef2 = useRef<any>(null);
  const mainImageRef = useRef<any>(null);
  const [numbers, setNumbers] = useState([]);

  useLayoutEffect(() => {
    setTimeout(() => {
      setHeight(mainImageRef.current.clientHeight);
    }, 100);
  }, [window.innerWidth]);

  useEffect(() => {
    function handleWindowResize() {
      setHeight(mainImageRef.current.clientHeight);
    }
    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("devicechange", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("devicechange", handleWindowResize);
    };
  }, []);

  const mainSiderSettings = {
    modules: [Controller, EffectFade],
    loop: false,
    slideToClickedSlide: true,
    noSwiping: true,
  };

  const thumbSliderSettings = {
    modules: [Controller, EffectCoverflow],
    centeredSlides: true,
    spaceBetween: 1,
    slidesPerView: 7,
    touchRatio: 0.2,
    allowTouchMove: true,
    slideToClickedSlide: true,
  };

  const handleOnNextSlide = () => {
    swiperRef2.current.slideNext();
  };
  const events: {
    id: any;
    title: string;
    subTitle: string;
    description: string;
    image: any;
  }[] = [
    {
      id: 1,
      title: "Have a conversation with Shahrukh Khan",
      subTitle: "India's First Immersive Game Show in the Metaverse",
      description:
        "Mollis nunc sed id semper risus in. Semper risus in hendrerit gravida. Habitant morbi tristique senectus et netus et. Condimentum mattis pellentesque.",
      image: toAbsoluteUrl("/media/event/event-image01.png"),
    },
    {
      id: 2,
      title: "Have a conversation with Shahrukh Khan",
      subTitle: "India's First Immersive Game Show in the Metaverse",
      description:
        "Mollis nunc sed id semper risus in. Semper risus in hendrerit gravida. Habitant morbi tristique senectus et netus et. Condimentum mattis pellentesque.",
      image: toAbsoluteUrl("/media/event/event-image01.png"),
    },
    {
      id: 3,
      title: "Have a conversation with Shahrukh Khan",
      subTitle: "India's First Immersive Game Show in the Metaverse",
      description:
        "Mollis nunc sed id semper risus in. Semper risus in hendrerit gravida. Habitant morbi tristique senectus et netus et. Condimentum mattis pellentesque.",
      image: toAbsoluteUrl("/media/event/event-image01.png"),
    },
    {
      id: 4,
      title: "Have a conversation with Shahrukh Khan",
      subTitle: "India's First Immersive Game Show in the Metaverse",
      description:
        "Mollis nunc sed id semper risus in. Semper risus in hendrerit gravida. Habitant morbi tristique senectus et netus et. Condimentum mattis pellentesque.",
      image: toAbsoluteUrl("/media/event/event-image01.png"),
    },
    {
      id: 5,
      title: "Have a conversation with Shahrukh Khan",
      subTitle: "India's First Immersive Game Show in the Metaverse",
      description:
        "Mollis nunc sed id semper risus in. Semper risus in hendrerit gravida. Habitant morbi tristique senectus et netus et. Condimentum mattis pellentesque.",
      image: toAbsoluteUrl("/media/event/event-image01.png"),
    },
    {
      id: 6,
      title: "Have a conversation with Shahrukh Khan",
      subTitle: "India's First Immersive Game Show in the Metaverse",
      description:
        "Mollis nunc sed id semper risus in. Semper risus in hendrerit gravida. Habitant morbi tristique senectus et netus et. Condimentum mattis pellentesque.",
      image: toAbsoluteUrl("/media/event/event-image01.png"),
    },
    {
      id: 7,
      title: "Have a conversation with Shahrukh Khan",
      subTitle: "India's First Immersive Game Show in the Metaverse",
      description:
        "Mollis nunc sed id semper risus in. Semper risus in hendrerit gravida. Habitant morbi tristique senectus et netus et. Condimentum mattis pellentesque.",
      image: toAbsoluteUrl("/media/event/event-image01.png"),
    },
    {
      id: 8,
      title: "Have a conversation with Shahrukh Khan",
      subTitle: "India's First Immersive Game Show in the Metaverse",
      description:
        "Mollis nunc sed id semper risus in. Semper risus in hendrerit gravida. Habitant morbi tristique senectus et netus et. Condimentum mattis pellentesque.",
      image: toAbsoluteUrl("/media/event/event-image01.png"),
    },
  ];
  return (
    <section className="relative">
      <Swiper
        className="events-slider-main"
        {...mainSiderSettings}
        onSwiper={setFirstSwiper}
        controller={{ control: secondSwiper }}
        effect="fade"
      >
        {events &&
          events.map((el, i) => (
            <SwiperSlide>
              <div className={"grid grid-cols-12 gap-y-5"}>
                <div className="col-span-12 md:col-span-5 flex items-center flex-col justify-center order-[2] md:order-1">
                  <h3 className="text-[24px] leading-[32px] lg:text-[48px] lg:leading-[60px] text-[#FFFFFFCC] md:mb-[20px] mb-[14px] font-bold slider-scale-anim">
                    {get(el, "title")}
                  </h3>
                  <p className="opacity-[80%] font-[500] text-xl lg:text-[24px] mb-[16px] events-swiper-sub-title slider-scale-anim">
                    {get(el, "subTitle")}
                  </p>
                  <p className="text-sm opacity-[65%] mb-[24px] events-swiper-description slider-scale-anim"></p>
                  <div className="flex items-center mb-[27px] events-swiper-address slider-scale-anim">
                    <p className="text-[14px] opacity-[65%]">
                      {get(el, "description")}
                    </p>
                  </div>
                  <div className={"flex w-full"}>
                    <button
                      className={
                        "text-[14px] leading-5 text-black bg-[#C2D24B] px-[28px] py-[18px] shadow-default rounded w-full md:w-auto "
                      }
                      onClick={() => navigate("/marketplace-public/profile")}
                    >
                      Start a conversation Now
                    </button>
                  </div>
                </div>
                <div
                  className={clsx(
                    "col-span-12 md:col-span-7 slider-scale-anim order-[1] md:order-2"
                  )}
                >
                  <img
                    alt="event-slider-thumb-img"
                    className="w-[100%] h-[100%]"
                    ref={mainImageRef}
                    src={get(el, "image")}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div
        className={clsx(`grid grid-cols-12 absolute z-[999] -translate-y-full`)}
        style={{
          top: height ? height : "100%",
        }}
      >
        <div className={"col-span-12 md:col-span-7 md:col-start-7 relative"}>
          <Swiper
            className="event-swiper-thumb !mr-0 md:!mr-[116px]"
            {...thumbSliderSettings}
            ref={swiperRef2}
            // centeredSlides={true}
            onSwiper={setSecondSwiper}
            controller={{ control: firstSwiper }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            effect={"coverflow"}
          >
            {events.map((el, i) => (
              <SwiperSlide
                className={clsx(
                  "!h-[60px] md:!h-[120px] !w-[60px] md:!w-[120px]"
                )}
              >
                <img alt="event-slider-thumb-img" src={get(el, "image")} />
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            className={clsx(
              "z-[99999999] absolute right-0 events-swiper-thumb-button top-0 h-full md:w-56"
            )}
            onClick={() => {
              console.log("Working");
              secondSwiper.slideNext();
            }}
          >
            <svg
              className="ml-[40px]"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 24L20 16L12 8"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Index;
