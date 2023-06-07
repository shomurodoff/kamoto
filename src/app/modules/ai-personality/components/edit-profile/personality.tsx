import React from "react";
import TextInput from "../../../widgets/components/Input/TextInput";
import { useIntl } from "react-intl";
import { Form, Formik } from "formik";
import TextArea from "../../../widgets/components/Input/TextArea";
import { InfoCard } from "../../../widgets/components/UI/InfoCard";
import Select from "../../../../components/select/select";
import { ToolTipUI } from "../../../widgets/components/UI/ToolTipUI";
import Slider from "../../../../components/slider";

const Personality: React.FC<any> = ({ setOpenEdit }) => {
  const { formatMessage } = useIntl();

  return (
    <div className={"grid grid-cols-12 gap-y-[20px] md:gap-x-[40px]"}>
      <Formik initialValues={{}} onSubmit={() => {}}>
        {(formik) => {
          return (
            <Form className={"col-span-12 md:col-span-7 order-0"}>
              <Select
                toltipText={"Commonly used filler words"}
                isMulti={true}
                label={"Character Traits"}
                isClearable={false}
                defaultValue={[
                  { value: "Shah", label: "Shah" },
                  { value: "King", label: "King" },
                ]}
                options={[
                  { value: "Shah", label: "Shah" },
                  { value: "King", label: "King" },
                  { value: "vanilla", label: "Vanilla" },
                ]}
              />
              <label
                className={"flex text-[13px] leading-5 text-[#FFFFFFA6] mb-1"}
              >
                Basic Traits Control <ToolTipUI />
              </label>
              <div
                className={
                  "flex flex-col md:flex-row  gap-y-[24px] md:gap-x-[24px]"
                }
              >
                <div
                  className={
                    "p-[20px] pb-[32px] bg-[#171825] rounded md:w-1/2 w-full"
                  }
                >
                  <div className={"pb-[20px] border-b  border-[#2E2F45]"}>
                    <Slider startLabel={"Sadness"} stopLabel={"Joy"} />
                  </div>
                  <div className={"py-[20px] border-b  border-[#2E2F45]"}>
                    <Slider startLabel={"Anger"} stopLabel={"Fear"} />
                  </div>
                  <div className={"py-[20px] border-b  border-[#2E2F45]"}>
                    <Slider startLabel={"Disgust"} stopLabel={"Trust"} />
                  </div>
                  <div className={"py-[20px] border-b  border-[#2E2F45]"}>
                    <Slider
                      startLabel={"Anticipation"}
                      stopLabel={"Surprise"}
                    />
                  </div>
                  <div className={"py-[20px] border-b  border-[#2E2F45]"}>
                    <Slider startLabel={"Anger"} stopLabel={"Fear"} />
                  </div>
                  <div className={"pt-[20px]"}>
                    <Slider startLabel={"Neutral"} stopLabel={"Emotional"} />
                  </div>
                </div>
                <div
                  className={
                    "p-[20px] pb-[32px] bg-[#171825] rounded md:w-1/2 w-full"
                  }
                >
                  <div className={"pb-[20px] border-b  border-[#2E2F45]"}>
                    <Slider startLabel={"Negative"} stopLabel={"Positive"} />
                  </div>
                  <div className={"py-[20px] border-b  border-[#2E2F45]"}>
                    <Slider startLabel={"Aggressive"} stopLabel={"Peaceful"} />
                  </div>
                  <div className={"py-[20px] border-b  border-[#2E2F45]"}>
                    <Slider startLabel={"Cautious"} stopLabel={"Open"} />
                  </div>
                  <div className={"py-[20px] border-b  border-[#2E2F45]"}>
                    <Slider startLabel={"Anger"} stopLabel={"Fear"} />
                  </div>
                  <div className={"py-[20px] border-b  border-[#2E2F45]"}>
                    <Slider startLabel={"Introvert"} stopLabel={"Extrovert"} />
                  </div>
                  <div className={"pt-[20px]"}>
                    <Slider startLabel={"Insecure"} stopLabel={"Confident"} />
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
      <div
        className={
          "col-span-12 md:col-span-5 flex flex-col justify-start gap-[20px] md:mt-[20px]"
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
              "<br/>" +
              "<br/>" +
              "The purpose of these posts is to increase user engagement, fostering connections and interactions between the AI personality and KamotoAI's user base. By creating compelling content, AI personality owners can effectively grow their audience, enhance user engagement, and ultimately boost their revenue potential within the platform.",
          })}
          slug={"#"}
        />
      </div>
    </div>
  );
};

export default Personality;
