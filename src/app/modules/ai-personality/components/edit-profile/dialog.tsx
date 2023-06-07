import React, { useState } from "react";
import TextInput from "../../../widgets/components/Input/TextInput";
import { useIntl } from "react-intl";
import { FieldArray, Form, Formik } from "formik";
import TextArea from "../../../widgets/components/Input/TextArea";
import { InfoCard } from "../../../widgets/components/UI/InfoCard";
import { isEqual } from "lodash";
import { ToolTipUI } from "../../../widgets/components/UI/ToolTipUI";
import clsx from "clsx";
import { SelectInput } from "../../../widgets/components/Input/SelectInput";
import Slider from "../../../../components/slider";
import Select from "../../../../components/select/select";
const Dialog: React.FC<any> = ({ setOpenEdit }) => {
  const { formatMessage } = useIntl();
  const [presetType, setPresetType] = useState(false);
  const [normalType, setNormalType] = useState(false);
  const messageFields = {
    messageText: "",
  };
  const questionFields = {
    questionText: "",
  };

  const initialValues = {
    dialog_example:
      "In the resonant and unmistakable voice of Shahrukh Khan, he speaks with an authoritative tone, \"The movie industry isn't for the faint-hearted. It's a place where creativity and commerce fuse, where dreams are forged into realities. It demands tenacity, dedication, and unquenchable passion. It's an arena that pushes you to continually redefine your limits. So, brace yourself for the challenge, and remember - the spotlight isn't just given, it's earned",
    messageTextList: [messageFields],
    questionTextList: [questionFields],
  };

  return (
    <div className={"grid grid-cols-12 gap-y-[20px] md:gap-x-[40px]"}>
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {(formik) => {
          return (
            <Form className={"col-span-12 md:col-span-7 order-0"}>
              <div className={"bg-[#171825] p-[20px] rounded"}>
                <h4
                  className={
                    "text-[16px] leading-6 font-medium text-[#FFFFFFCC] mb-[16px]"
                  }
                >
                  Dialogue Style
                </h4>
                <div className={"flex gap-x-[20px] md:gap-x-20 mb-6"}>
                  <div className={"flex items-center gap-x-4"}>
                    <input
                      type={"radio"}
                      className={"form-check-input"}
                      checked={presetType}
                      onClick={() => setPresetType(true)}
                    />
                    <label
                      className={clsx(
                        "text-[16px] leading-6 font-medium md:font-semibold  flex gap-1",
                        presetType ? "!text-[#C2D24B]" : "!text-[#FFFFFFA6]"
                      )}
                    >
                      Preset <ToolTipUI tooltipText={""} />
                    </label>
                  </div>
                  <div className={"flex items-center gap-x-4"}>
                    <input
                      type={"radio"}
                      className={"form-check-input"}
                      checked={!presetType}
                      onClick={() => setPresetType(false)}
                    />
                    <label
                      className={clsx(
                        "text-[16px] leading-6 font-medium md:font-semibold flex gap-1",
                        !presetType ? "!text-[#C2D24B]" : "!text-[#FFFFFFA6]"
                      )}
                    >
                      Custom <ToolTipUI tooltipText={""} />
                    </label>
                  </div>
                </div>
                {presetType ? (
                  <div>
                    <SelectInput
                      fieldName={"dialog-style"}
                      placeholder={"Select Dialogue Style"}
                      formik={formik}
                      options={[{ name: "Comanding", value: 1 }]}
                    />
                    <TextArea
                      fieldName={"dialog-example"}
                      label={"Example dialogue"}
                      toolTipText={"Example dialogue"}
                      formik={formik}
                      defaultValue={
                        "In the resonant and unmistakable voice of Shahrukh Khan, he speaks with an authoritative tone, \"The movie industry isn't for the faint-hearted. It's a place where creativity and commerce fuse, where dreams are forged into realities. It demands tenacity, dedication, and unquenchable passion. It's an arena that pushes you to continually redefine your limits. So, brace yourself for the challenge, and remember - the spotlight isn't just given, it's earned"
                      }
                      placeholder={""}
                      className={"!min-h-[140px]"}
                    />
                  </div>
                ) : (
                  <div>
                    <TextInput
                      label={"Adjectives"}
                      toolTipText={"Adjectives"}
                      fieldName={"adjectives"}
                      placeholder={"Custom Adjectives"}
                      fieldType={"text"}
                      formik={formik}
                    />
                    <TextInput
                      label={"Adverbs"}
                      toolTipText={"Adverbs"}
                      fieldName={"adverbs"}
                      placeholder={"Custom Adverbs"}
                      fieldType={"text"}
                      formik={formik}
                    />
                    <TextInput
                      label={"Colloquialism"}
                      toolTipText={"Colloquialism"}
                      fieldName={"colloquialism"}
                      placeholder={"Custom Colloquialism"}
                      fieldType={"text"}
                      formik={formik}
                    />{" "}
                    <TextArea
                      fieldName={"dialog-example"}
                      label={"Example dialogue"}
                      toolTipText={"Example dialogue"}
                      formik={formik}
                      defaultValue={
                        "In the resonant and unmistakable voice of Shahrukh Khan, he speaks with an authoritative tone, \"The movie industry isn't for the faint-hearted. It's a place where creativity and commerce fuse, where dreams are forged into realities. It demands tenacity, dedication, and unquenchable passion. It's an arena that pushes you to continually redefine your limits. So, brace yourself for the challenge, and remember - the spotlight isn't just given, it's earned"
                      }
                      placeholder={""}
                      className={"!min-h-[140px]"}
                    />
                  </div>
                )}
              </div>
              <div className={"mb-[32px] mt-[16px]"}>
                <label
                  className={
                    "text-[13px] text-[#FFFFFFA6] leading-5   flex gap-1 mb-[28px]"
                  }
                >
                  Select dialogue length <ToolTipUI tooltipText={"Longest"} />
                </label>
                <div className={"md:w-1/2"}>
                  <Slider startLabel={"Shortest"} stopLabel={"Longest"} />
                </div>
              </div>
              <div>
                <label
                  className={
                    "text-[13px] text-[#FFFFFFA6] leading-5   flex gap-1 mb-[28px]"
                  }
                >
                  How often you want this personality to ask counter questions{" "}
                  <ToolTipUI tooltipText={"Longest"} />
                </label>
                <div className={"md:w-1/2"}>
                  <Slider startLabel={"Never"} stopLabel={"Always"} />
                </div>
              </div>
              <div className={"mt-[44px]"}>
                <label
                  className={
                    "text-[13px] text-[#FFFFFFA6] leading-5   flex gap-1 mb-[8px]"
                  }
                >
                  Capitalization in Chat Reply{" "}
                  <ToolTipUI tooltipText={"Longest"} />
                </label>
                <div
                  className={
                    "flex flex-col md:flex-row gap-x-[20px] md:gap-x-20 gap-y-4 mb-6"
                  }
                >
                  <div className={"flex items-center gap-x-4"}>
                    <input
                      type={"radio"}
                      className={"form-check-input"}
                      checked={normalType}
                      onClick={() => setNormalType(true)}
                    />
                    <label
                      className={clsx(
                        "text-[14px] leading-6 flex gap-1",
                        normalType ? "!text-[#C2D24B]" : "!text-[#FFFFFFA6]"
                      )}
                    >
                      Normal Style <ToolTipUI tooltipText={""} />
                    </label>
                  </div>
                  <div className={"flex items-center gap-x-4"}>
                    <input
                      type={"radio"}
                      className={"form-check-input"}
                      checked={!normalType}
                      onClick={() => setNormalType(false)}
                    />
                    <label
                      className={clsx(
                        "text-[14px] leading-6 flex gap-1",
                        !normalType ? "!text-[#C2D24B]" : "!text-[#FFFFFFA6]"
                      )}
                    >
                      Capitalize replies always <ToolTipUI tooltipText={""} />
                    </label>
                  </div>
                </div>
              </div>
              <Select
                toltipText={"Words to say at the beginning of each reply"}
                isMulti={true}
                className={"without-arrow"}
                label={"Words to say at the beginning of each reply"}
                isClearable={false}
                defaultValue={[
                  { value: "asian", label: "asian" },
                  { value: "asian", label: "asian" },
                ]}
                options={[
                  { value: "asian", label: "asian" },
                  { value: "asian", label: "asian" },
                  { value: "vanilla", label: "Vanilla" },
                ]}
              />
              <Select
                toltipText={"Words to say at the end of each reply"}
                isMulti={true}
                className={"without-arrow"}
                label={"Words to say at the end of each reply"}
                isClearable={false}
                defaultValue={[
                  { value: "asian", label: "asian" },
                  { value: "asian", label: "asian" },
                ]}
                options={[
                  { value: "asian", label: "asian" },
                  { value: "asian", label: "asian" },
                  { value: "vanilla", label: "Vanilla" },
                ]}
              />
              <div className={"bg-[#171825] p-[20px] rounded mt-[16px]"}>
                <h4
                  className={
                    "text-[16px] leading-6 font-medium text-[#FFFFFFCC] mb-[16px]"
                  }
                >
                  List of famous dialogues of this AI Personality which it will
                  often uses
                </h4>
                <FieldArray
                  name="listDialogues"
                  render={(arrayHelpers) => {
                    return (
                      <>
                        {formik.values.messageTextList.map((_, index) => (
                          <div key={index}>
                            <div
                              className={
                                "flex flex-col md:flex-row  items-start gap-x-[20px] gap-y-[12px]"
                              }
                            >
                              <div className={"flex-grow w-full md:w-auto"}>
                                <TextArea
                                  label={formatMessage({
                                    id: "Dialogue" + " " + (index + 1),
                                  })}
                                  fieldName={"dialogText"}
                                  placeholder={formatMessage({
                                    id: "Bade bade deshon mein aisi choti choti batein hoti rehti hain... seneorita!!!",
                                  })}
                                  formik={formik}
                                  toolTipText={"text"}
                                  className={"!min-h-[140px]"}
                                />
                              </div>
                              <div
                                className={
                                  "flex justify-end gap-[12px] md:mt-[26px]"
                                }
                              >
                                <button
                                  className={
                                    "p-[6px] bg-[#C2D24B1A] rounded-[6px]"
                                  }
                                  onClick={() => {
                                    if (!isEqual(index, 0))
                                      arrayHelpers.remove(index);
                                  }}
                                >
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M4 7H20M10 11V17M14 11V17M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7"
                                      stroke="#C2D24B"
                                      strokeWidth="1.6"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>
                                <button
                                  className={
                                    "p-[6px] bg-[#C2D24B1A] rounded-[6px]"
                                  }
                                >
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clipPath="url(#clip0_344_35631)">
                                      <path
                                        d="M17 21H7M17 21H17.803C18.921 21 19.48 21 19.907 20.782C20.284 20.59 20.59 20.284 20.782 19.908C21 19.481 21 18.921 21 17.803V9.22C21 8.77 21 8.545 20.952 8.331C20.9094 8.14007 20.839 7.95643 20.743 7.786C20.637 7.596 20.487 7.431 20.193 7.104L17.438 4.042C17.097 3.664 16.924 3.472 16.717 3.334C16.5303 3.21012 16.3241 3.11851 16.107 3.063C15.863 3 15.6 3 15.075 3H6.2C5.08 3 4.52 3 4.092 3.218C3.71565 3.40969 3.40969 3.71565 3.218 4.092C3 4.52 3 5.08 3 6.2V17.8C3 18.92 3 19.48 3.218 19.907C3.41 20.284 3.715 20.59 4.092 20.782C4.519 21 5.079 21 6.197 21H7M17 21V17.197C17 16.079 17 15.519 16.782 15.092C16.5899 14.7156 16.2836 14.4096 15.907 14.218C15.48 14 14.92 14 13.8 14H10.2C9.08 14 8.52 14 8.092 14.218C7.71565 14.4097 7.40969 14.7157 7.218 15.092C7 15.52 7 16.08 7 17.2V21M15 7H9"
                                        stroke="#C2D24B"
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_344_35631">
                                        <rect
                                          width="24"
                                          height="24"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className={"flex justify-end mt-[16px]"}>
                          <button
                            className={
                              "bg-[#C2D24B] text-black text-[13px] leading-5  py-[12px] w-full  md:w-[180px] rounded"
                            }
                            onClick={() =>
                              arrayHelpers.push({
                                messageText: "",
                              })
                            }
                          >
                            Add Another Dialogue
                          </button>
                        </div>
                      </>
                    );
                  }}
                />
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
          title={formatMessage({
            id: "Understanding Dialogue Style of AI Personality",
          })}
          desc={formatMessage({
            id:
              'In KamotoAI, the "Dialogue Style" section allows you to shape the manner in which your virtual AI persona communicates with users. You have the freedom to define the dialogue style, whether it\'s assertive, commanding, or submissive, among others. \n' +
              "<br/>" +
              "<br/>" +
              "By customizing the dialogue style, you give your AI personality a distinct voice and tone that aligns with its character traits and purpose. Whether it's a friendly companion, an authoritative guide, or a playful conversationalist, KamotoAI empowers you to create AI personalities that resonate with users on a deeper level. \n" +
              "<br/>" +
              "<br/>" +
              "With the ability to provide example dialogues, you can bring your AI personality to life and create meaningful interactions that captivate and engage users.",
          })}
          slug={"#"}
        />
      </div>
    </div>
  );
};

export default Dialog;
