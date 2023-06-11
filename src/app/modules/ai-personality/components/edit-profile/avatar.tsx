import React, { useState } from "react";
import { useIntl } from "react-intl";
import { InfoCard } from "../../../widgets/components/UI/InfoCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import AvatarImage from "../../../../assets/images/personality/avatar-image.png";
import ThumnailImage from "../../../../assets/images/personality/avatar-thumnail.png";
import { map, range } from "lodash";
const Avatar: React.FC<any> = ({ setOpenEdit }) => {
  const { formatMessage } = useIntl();
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  return (
    <div className={"grid grid-cols-12 gap-y-[20px] md:gap-x-[40px]"}>
      <div
        className={
          "col-span-12 md:col-span-7 bg-[#171825] pt-[20px] pb-[32px] px-[24px]"
        }
      >
        <h3
          className={
            "text-[16px] leading-6 text-[#FFFFFFCC] font-medium mb-[46px]"
          }
        >
          Select a Predefined Avatar or Create a Custom Avatar
        </h3>
        <div className={"flex justify-center gap-[8px] "}>
          <button
            className={
              "flex items-center gap-2 border py-2 px-4 border-gradient rounded bg-[#161718]"
            }
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.33333 9.33333C10.48 9.33333 11.5556 9.69778 12.4178 10.32L16.96 5.77778H12.8889V4L20 4V11.1111H18.2222V7.03111L13.68 11.5556C14.3022 12.4444 14.6667 13.5111 14.6667 14.6667C14.6667 16.0812 14.1048 17.4377 13.1046 18.4379C12.1044 19.4381 10.7478 20 9.33333 20C7.91885 20 6.56229 19.4381 5.5621 18.4379C4.5619 17.4377 4 16.0812 4 14.6667C4 13.2522 4.5619 11.8956 5.5621 10.8954C6.56229 9.89524 7.91885 9.33333 9.33333 9.33333ZM9.33333 11.1111C8.39034 11.1111 7.48597 11.4857 6.81918 12.1525C6.15238 12.8193 5.77778 13.7237 5.77778 14.6667C5.77778 15.6097 6.15238 16.514 6.81918 17.1808C7.48597 17.8476 8.39034 18.2222 9.33333 18.2222C10.2763 18.2222 11.1807 17.8476 11.8475 17.1808C12.5143 16.514 12.8889 15.6097 12.8889 14.6667C12.8889 13.7237 12.5143 12.8193 11.8475 12.1525C11.1807 11.4857 10.2763 11.1111 9.33333 11.1111Z"
                fill="white"
              />
            </svg>
            Male
          </button>
          <button
            className={
              "flex items-center gap-2 border py-2 px-4  rounded bg-[#161718]"
            }
          >
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 0.5C6.32608 0.5 7.59785 1.02678 8.53553 1.96447C9.47322 2.90215 10 4.17392 10 5.5C10 7.975 8.2 10.0333 5.83333 10.4333V12.1667H7.5V13.8333H5.83333L5.83333 15.5L4.16667 15.5L4.16667 13.8333H2.5L2.5 12.1667H4.16667V10.4333C1.8 10.0333 0 7.975 0 5.5C0 4.17392 0.526784 2.90215 1.46447 1.96447C2.40215 1.02678 3.67392 0.5 5 0.5ZM5 2.16667C4.11594 2.16667 3.2681 2.51786 2.64298 3.14298C2.01786 3.7681 1.66667 4.61594 1.66667 5.5C1.66667 6.38405 2.01786 7.2319 2.64298 7.85702C3.2681 8.48214 4.11594 8.83333 5 8.83333C5.88405 8.83333 6.7319 8.48214 7.35702 7.85702C7.98214 7.2319 8.33333 6.38405 8.33333 5.5C8.33333 4.61594 7.98214 3.7681 7.35702 3.14298C6.7319 2.51786 5.88405 2.16667 5 2.16667Z" fill="white"/>
            </svg>
            Female
          </button>
          <button
            className={
              "flex items-center gap-2 border py-2 px-4 rounded bg-[#161718]"
            }
          ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4.5C13.3261 4.5 14.5979 5.02678 15.5355 5.96447C16.4732 6.90215 17 8.17392 17 9.5C17 11.975 15.2 14.0333 12.8333 14.4333V16.1667H14.5V17.8333H12.8333L12.8333 19.5H11.1667L11.1667 17.8333H9.5V16.1667H11.1667V14.4333C8.8 14.0333 7 11.975 7 9.5C7 8.17392 7.52678 6.90215 8.46447 5.96447C9.40215 5.02678 10.6739 4.5 12 4.5ZM12 6.16667C11.1159 6.16667 10.2681 6.51786 9.64298 7.14298C9.01786 7.7681 8.66667 8.61594 8.66667 9.5C8.66667 10.3841 9.01786 11.2319 9.64298 11.857C10.2681 12.4821 11.1159 12.8333 12 12.8333C12.8841 12.8333 13.7319 12.4821 14.357 11.857C14.9821 11.2319 15.3333 10.3841 15.3333 9.5C15.3333 8.61594 14.9821 7.7681 14.357 7.14298C13.7319 6.51786 12.8841 6.16667 12 6.16667Z" fill="white"/>
          </svg>

            Non-Gender
          </button>
        </div>
        <div className={"max-w-md mx-auto"}>
          <Swiper
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            loop={true}
            centeredSlides={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="avatar-swiper"
          >
            {map(range(0, 9), () => (
              <SwiperSlide
                className={"!flex justify-center w-full items-center"}
              >
                <img src={AvatarImage} className={""} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={"flex justify-center mt-[20px] mb-[36px]"}>
            <button
              className={
                "bg-[#C2D24B] py-[12px] px-[24px] rounded w-[170px] text-black"
              }
            >
              Select
            </button>
          </div>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={6}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="avatar-swiper-thumbnail"
          >
            {map(range(0, 9), () => (
              <div>
                <SwiperSlide>
                  <div className={"text-center"}>
                    <img
                      src={ThumnailImage}
                      className={"rounded border border-[#363738] mb-1"}
                    />
                    <p className={"text-[12px] text-normal leading-[18px]"}>
                      Peter
                    </p>
                  </div>
                </SwiperSlide>
              </div>
            ))}
          </Swiper>
        </div>
      </div>
      <div
        className={
          "col-span-12 md:col-span-5 flex flex-col justify-start gap-[20px]"
        }
      >
        <div className={"flex justify-end gap-[10px] md:order-1 md:mt-auto"}>
          <button
            onClick={() => setOpenEdit(false)}
            className={
              "bg-[#C2D24B1A] text-[#C2D24B] text-[14px] leading-5 font-medium py-[12px] w-1/2 md:w-[128px] rounded"
            }
          >
            Cancel
          </button>
          <button
            className={
              "bg-[#C2D24B] text-black text-[14px] leading-5 font-medium py-[12px] w-1/2  md:w-[140px] rounded"
            }
          >
            Save
          </button>
        </div>
        <InfoCard
          title={formatMessage({ id: "What is an AI Personality?" })}
          desc={formatMessage({
            id:
              "KamotoAI empowers AI personality owners and managers to create engaging social media-like posts. These posts serve as broadcasted messages from the AI personality, similar to tweets or Facebook posts. They are visible on the AI Personality's Public page within the Marketplace. \n" +
              "\n" +
              "The purpose of these posts is to increase user engagement, fostering connections and interactions between the AI personality and KamotoAI's user base. By creating compelling content, AI personality owners can effectively grow their audience, enhance user engagement, and ultimately boost their revenue potential within the platform.",
          })}
          slug={"#"}
        />
      </div>
    </div>
  );
};

export default Avatar;
