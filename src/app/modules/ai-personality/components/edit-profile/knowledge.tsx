import React from "react";
import TextInput from "../../../widgets/components/Input/TextInput";
import { useIntl } from "react-intl";
import { Form, Formik } from "formik";
import TextArea from "../../../widgets/components/Input/TextArea";
import { InfoCard } from "../../../widgets/components/UI/InfoCard";

const Knowledga: React.FC<any> = ({ setOpenEdit }) => {
  const { formatMessage } = useIntl();

  return (
    <div className={"grid grid-cols-12 gap-y-[20px] md:gap-x-[40px] "}>
      <Formik initialValues={{}} onSubmit={() => {}}>
        {(formik) => {
          return (
            <Form className={"col-span-12 md:col-span-7 order-0"}>
              <TextArea
                label={formatMessage({ id: "Description" })}
                fieldName={"description"}
                placeholder={formatMessage({
                  id: "Write a paragraph describing who your personality is",
                })}
                formik={formik}
                toolTipText={"text"}
                className={"!min-h-[210px]"}
              />
              <TextArea
                label={formatMessage({ id: "Motivations" })}
                fieldName={"motivations"}
                placeholder={formatMessage({
                  id: "What motivates your personality",
                })}
                formik={formik}
                toolTipText={"text"}
                className={"!min-h-[107px]"}
              />
            </Form>
          );
        }}
      </Formik>
      <div
        className={
          "col-span-12 md:col-span-5 flex flex-col justify-start gap-[20px] md:mt-[20px]"
        }
      >
        <div className={"flex justify-end gap-[10px] md:order-1  md:mt-auto"}>
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
          title={formatMessage({
            id: "Understanding Knowledge & Story of AI Personality",
          })}
          desc={formatMessage({
            id:
              'In KamotoAI, the "Knowledge & Story" section allows you to delve into the depths of your virtual AI persona\'s background and expertise. You have the power to shape its backstory, revealing its origins and unique experiences. Personal knowledge adds depth and authenticity to your AI personality, equipping it with specific knowledge in various subjects. \n' +
              "<br/>" +
              "<br/>" +
              "By infusing your AI persona with rich knowledge and story, you create a compelling and well-rounded character. \n" +
              "<br/>" +
              "<br/>" +
              "Whether it's a complex history or specialized expertise, KamotoAI enables you to craft AI personalities that are knowledgeable and intriguing. With KamotoAI, you can unlock the full potential of your virtual AI persona, ensuring it leaves a lasting impression on users.",
          })}
          slug={"#"}
        />
      </div>
    </div>
  );
};

export default Knowledga;
