import React from "react";
import TextInput from "../../../widgets/components/Input/TextInput";
import { useIntl } from "react-intl";
import { Form, Formik } from "formik";
import TextArea from "../../../widgets/components/Input/TextArea";
import { InfoCard } from "../../../widgets/components/UI/InfoCard";
import Slider from "rc-slider";
import { SelectInput } from "../../../widgets/components/Input/SelectInput";
import Select from "../../../../components/select/select";
const Voice: React.FC<any> = ({ setOpenEdit }) => {
  const { formatMessage } = useIntl();
  return (
    <div className={"grid grid-cols-12 gap-y-[20px] md:gap-x-[40px]"}>
      <Formik initialValues={{}} onSubmit={() => {}}>
        {(formik) => {
          return (
            <Form className={"col-span-12 md:col-span-7 order-0"}>
              <div
                className={
                  "bg-[#171825] p-[20px] pb-[40px]  rounded mb-[14px] md:mb-[24px]"
                }
              >
                <h4
                  className={
                    "text-[16px] leading-6 font-medium text-[#FFFFFFCC] mb-[16px]"
                  }
                >
                    Select Stock Voice
                </h4>
                <div
                  className={
                    "flex flex-col md:flex-row  items-center gap-x-[20px] gap-y-[12px]"
                  }
                >
                  <div className={"flex-grow w-full md:w-auto "}>
                    <Select
                      toltipText={"Commonly used filler words"}
                      label={"Select Voice from this list"}
                      isClearable={false}
                      options={[
                        { value: "chocolate", label: "Chocolate" },
                        { value: "strawberry", label: "Strawberry" },
                        { value: "vanilla", label: "Vanilla" },
                      ]}
                      defaultValue={{
                          value:"charles",
                          label:"Charles Weathers (Male)"
                      }}
                    />
                  </div>
                  <div
                    className={"flex justify-end gap-[12px] w-full md:w-auto"}
                  >
                    <button
                      className={
                        "flex items-center gap-1 bg-[#C2D24B] h-full rounded py-[8px] px-6 text-[13px]  text-black  leading-5"
                      }
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_344_29788)">
                          <path
                            d="M12.5 6.66666C13.0175 7.05478 13.4375 7.55804 13.7268 8.13661C14.0161 8.71517 14.1667 9.35314 14.1667 10C14.1667 10.6469 14.0161 11.2848 13.7268 11.8634C13.4375 12.442 13.0175 12.9452 12.5 13.3333M14.75 4.16666C15.62 4.86971 16.3217 5.75844 16.8037 6.76776C17.2858 7.77709 17.536 8.88146 17.536 10C17.536 11.1185 17.2858 12.2229 16.8037 13.2322C16.3217 14.2416 15.62 15.1303 14.75 15.8333M5 12.5H3.33333C3.11232 12.5 2.90036 12.4122 2.74408 12.2559C2.5878 12.0996 2.5 11.8877 2.5 11.6667V8.33333C2.5 8.11232 2.5878 7.90036 2.74408 7.74408C2.90036 7.5878 3.11232 7.5 3.33333 7.5H5L7.91667 3.75C7.9895 3.60852 8.11054 3.49777 8.25791 3.43774C8.40527 3.37772 8.56925 3.37238 8.72021 3.4227C8.87117 3.47302 8.99915 3.57567 9.08103 3.71211C9.16291 3.84856 9.19328 4.00978 9.16667 4.16666V15.8333C9.19328 15.9902 9.16291 16.1514 9.08103 16.2879C8.99915 16.4243 8.87117 16.527 8.72021 16.5773C8.56925 16.6276 8.40527 16.6223 8.25791 16.5623C8.11054 16.5022 7.9895 16.3915 7.91667 16.25L5 12.5Z"
                            stroke="black"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_344_29788">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      Listen
                    </button>
                  </div>
                </div>
                <div className={"flex flex-col md:flex-row gap-[40px]"}>
                  <div className={"md:w-1/2"}>
                    <label className={"text-[13px] leading-5 text-[#FFFFFFA6]"}>
                      Pitch
                    </label>
                    <Slider
                      dots={true}
                      min={0}
                      max={30}
                      railStyle={{
                        background: "#2E2F45",
                        height: 10,
                        borderRadius: 2,
                      }}
                      trackStyle={{
                        background: "#C2D24B",
                        height: 10,
                        borderRadius: 2,
                      }}
                      dotStyle={{
                        borderRadius: 0,
                        width: 0.1,
                        boxShadow: "none",
                        border: "none",
                      }}
                      handleStyle={{
                        marginTop: -3,
                        opacity: 1,
                        border: "none",
                        height: 16,
                        width: 16,
                        background: "#fff",
                      }}
                    />
                  </div>
                  <div className={"md:w-1/2"}>
                    <label className={"text-[13px] leading-5 text-[#FFFFFFA6]"}>
                      Talking Speed
                    </label>
                    <Slider
                      dots={true}
                      min={0}
                      max={30}
                      railStyle={{
                        background: "#2E2F45",
                        height: 10,
                        borderRadius: 2,
                      }}
                      trackStyle={{
                        background: "#C2D24B",
                        height: 10,
                        borderRadius: 2,
                      }}
                      dotStyle={{
                        borderRadius: 0,
                        width: 0.1,
                        boxShadow: "none",
                        border: "none",
                      }}
                      handleStyle={{
                        marginTop: -3,
                        opacity: 1,
                        border: "none",
                        height: 16,
                        width: 16,
                        background: "#fff",
                      }}
                    />
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
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
          title={formatMessage({ id: "Understanding Voice of AI Personality" })}
          desc={formatMessage({
            id:"In KamotoAI, AI Personality owners can customize their personality's voice style and audio to enhance the user experience. \n" +
                "<br/>" +
                "<br/>" +
                "Paid users can select a voice, adjust pitch and talking speed to match their desired criteria. During chat, users have control over the AI Personality's audio, with the ability to toggle it on or off. They can also reply using their own voice by enabling the microphone option. These features provide a unique and interactive chat experience. \n" +
                "<br/>" +
                "<br/>" +
                "Voice customization adds a personal touch to interactions, allowing users to fully immerse themselves in conversations with their AI Personality. For detailed instructions, please refer to our documentation or contact our support team." })}
          slug={"#"}
        />
      </div>
    </div>
  );
};

export default Voice;
