import React, { useState } from "react";
import Breadcrumb from "../../components/settings/breadcrumb";
import Tabs, { Tab } from "react-best-tabs";
import { Field, Form, Formik } from "formik";
import TextArea from "../../../widgets/components/Input/TextArea";
import { InfoCard } from "../../../widgets/components/UI/InfoCard";
import { useIntl } from "react-intl";
import TextInput from "../../../widgets/components/Input/TextInput";
import clsx from "clsx";
import { ToolTipUI } from "../../../widgets/components/UI/ToolTipUI";
import { isEqual, values } from "lodash";
import { FileUpload } from "../../../widgets/components/FileUpload";
import { toAbsoluteUrl } from "../../../../../_metronic/helpers";
import Switch from "react-switch";
import FormikReactSelect from "../../../widgets/components/Input/FormikReactSelect";
const Index = () => {
  const [modelStatus, setModelStatus] = useState<boolean>(false);
  const { formatMessage } = useIntl();

  const onSubmit = async (values: any) => {
    console.log(values);
  };

  return (
    <div className="overflow-scroll px-5 py-3">
      <Breadcrumb />
      <Tabs
        activeTab={1}
        className="font-size-13 mt-[16px]"
        ulClassName="text-muted  dark-border !justify-start mb-4"
        activityClassName="bg-primary !text-primary"
        children={[
          <Tab className={""} title={"Settings"}>
            <div>
              <Formik
                initialValues={{
                  ga4orTag: "",
                  verification: false,
                }}
                onSubmit={onSubmit}
                validateOnMount
              >
                {(formik) => {
                  return (
                    <Form
                      className={
                        "md:bg-[#171825] md:shadow-default rounded md:px-[32px] py-[20px] md:!py-6"
                      }
                    >
                      <div
                        className={
                          "grid grid-cols-12 md:gap-y-[20px] md:gap-x-[40px] "
                        }
                      >
                        <div className={"col-span-12 md:col-span-7 order-0"}>
                          <TextInput
                            label={formatMessage({
                              id: "AI Personality usage term link",
                            })}
                            toolTipText={formatMessage({
                              id: "Personality",
                            })}
                            fieldName={"alter-name"}
                            placeholder={formatMessage({
                              id: "Enter AI Personality usage term link",
                            })}
                            fieldType={"text"}
                            formik={formik}
                          />
                          <div
                            className={
                              "flex flex-col md:flex-row gap-y-[14px] md:gap-x-[40px]"
                            }
                          >
                            <div className={"flex items-center gap-x-[16px]"}>
                              <Field
                                className={"form-check-input "}
                                type={"radio"}
                                name={"ga4orTag"}
                                value={"analytics"}
                              />
                              <label
                                className={clsx(
                                  "text-[16px] leading-6 font-semibold",
                                  isEqual(formik.values.ga4orTag, "analytics")
                                    ? "!text-[#C2D24B]"
                                    : "!text-[#FFFFFFA6]"
                                )}
                              >
                                GA4 Analytics
                              </label>
                            </div>
                            <div>
                              <div className={"flex items-center gap-x-[16px]"}>
                                <Field
                                  className={"form-check-input"}
                                  type={"radio"}
                                  name={"ga4orTag"}
                                  value={"manager"}
                                />
                                <label
                                  className={clsx(
                                    "text-[16px] leading-6 font-semibold",
                                    isEqual(formik.values.ga4orTag, "manager")
                                      ? "!text-[#C2D24B]"
                                      : "!text-[#FFFFFFA6]"
                                  )}
                                >
                                  Google Tag Manager
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className={"mt-[12px]"}>
                            {isEqual(formik.values.ga4orTag, "analytics") ? (
                              <TextInput
                                label={formatMessage({
                                  id: "GA4 Analytics",
                                })}
                                toolTipText={formatMessage({
                                  id: "GA4 Analytics",
                                })}
                                fieldName={"gAnalytics"}
                                placeholder={formatMessage({
                                  id: "Enter GA4 Analytics",
                                })}
                                fieldType={"text"}
                                formik={formik}
                              />
                            ) : (
                              <TextInput
                                label={formatMessage({
                                  id: "Google Tag Manager",
                                })}
                                toolTipText={formatMessage({
                                  id: "Google Tag Manager",
                                })}
                                fieldName={"tagManager"}
                                placeholder={formatMessage({
                                  id: "Enter Google Tag Manager",
                                })}
                                fieldType={"text"}
                                formik={formik}
                              />
                            )}
                          </div>
                          <div className={"md:max-w-[240px] mb-[24px]"}>
                            <label
                              className={
                                "flex justify-between text-[13px] leading-5 text-[#FFFFFFA6] mb-[4px] md:mb-[8px]"
                              }
                            >
                              Featured Image (Social share){" "}
                              <ToolTipUI
                                tooltipText={"Featured Image (Social share)"}
                              />
                            </label>
                            <div
                              className={
                                " bg-[#2E2F45] p-[8px] shadow-default rounded relative"
                              }
                            >
                              <div
                                className="rounded-full  bg-[#21233A] absolute -top-2 -right-3 p-2 shadow-[0px_2px_4px_0px_#0000001A]"
                                onClick={() => setModelStatus(true)}
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_344_12864)">
                                    <path
                                      d="M12.8667 5.94967L10.0333 3.14967L10.9667 2.21634C11.2222 1.96079 11.5362 1.83301 11.9087 1.83301C12.2807 1.83301 12.5944 1.96079 12.85 2.21634L13.7833 3.14967C14.0389 3.40523 14.1722 3.71367 14.1833 4.07501C14.1944 4.4359 14.0722 4.74412 13.8167 4.99967L12.8667 5.94967ZM11.9 6.93301L4.83333 13.9997H2V11.1663L9.06667 4.09967L11.9 6.93301Z"
                                      fill="white"
                                      fillOpacity="0.65"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_344_12864">
                                      <rect
                                        width="16"
                                        height="16"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <img
                                src={toAbsoluteUrl(
                                  "/media/avatars/banner-image.png"
                                )}
                                className={"w-full h-[125px]"}
                              />
                            </div>
                            <div
                              className={
                                "flex justify-center md:justify-start  mt-[8px]"
                              }
                            >
                              <div className={"max-w-[240px] md:max-w-full"}>
                                <p
                                  className={
                                    "text-[13px] leading-5 text-[#FFFFFFA6]"
                                  }
                                >
                                  Image must in 16:9 ration preferably
                                  1280x720px in jpg or png format only
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-x-[8px] bg-[#21233A] rounded p-[16px] mb-[24px]">
                            <div>
                              <Switch
                                onChange={(value) =>
                                  formik.setFieldValue("verification", value)
                                }
                                name={"verification"}
                                handleDiameter={22}
                                borderRadius={22}
                                activeBoxShadow={"null"}
                                checked={formik.values.verification}
                                checkedIcon={false}
                                uncheckedIcon={false}
                                offHandleColor={"#fff"}
                                width={45}
                                height={30}
                                onColor={"#C2D24B"}
                                offColor={"#474761"}
                              />
                            </div>
                            <div className="d-flex flex-column justify-content-end">
                              <div className="d-flex">
                                <div>
                                  <label
                                    className="text-[13px] leading-5 text-[#FFFFFFCC] font-semibold"
                                    data-bs-toggle="tooltip"
                                    data-kt-initialized="1"
                                  >
                                    Enable Blue Tick Verification
                                  </label>
                                </div>
                              </div>
                              <label className="text-[12px] leading-4 text-[#FFFFFFA6]">
                                This will be prominently displayed alongside
                                your AI Personality in AI Marketplace.
                              </label>
                            </div>
                          </div>

                          <FormikReactSelect
                            toltipText={"Commonly used Keywords"}
                            isMulti={true}
                            label={"Keywords"}
                            name={"keywords"}
                            className={"without-arrow"}
                            isClearable={false}
                            value={[
                              { value: "#Shah", label: "#Shah" },
                              { value: "#King", label: "#King" },
                            ]}
                            options={[
                              { value: "#Shah", label: "#Shah" },
                              { value: "#King", label: "#King" },
                              { value: "#vanilla", label: "#Vanilla" },
                            ]}
                          />
                          <FormikReactSelect
                            toltipText={"Commonly used Hashtags words"}
                            isMulti={true}
                            label={"Hashtags"}
                            name={"hashtags"}
                            className={"without-arrow"}
                            isClearable={false}
                            defaultValue={[
                              { value: "#Shah", label: "#Shah" },
                              { value: "#King", label: "#King" },
                            ]}
                            options={[
                              { value: "#Shah", label: "#Shah" },
                              { value: "#King", label: "#King" },
                              { value: "#vanilla", label: "#Vanilla" },
                            ]}
                          />
                        </div>

                        <div
                          className={
                            "col-span-12 md:col-span-5 flex flex-col justify-start gap-[20px] md:mt-[22px]"
                          }
                        >
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
                      <FileUpload
                        fileSize={2097152}
                        maxFileNumber={1}
                        allowType={["image/*", ".jpg", ".jpeg", ".png"]}
                        metaData={{
                          module: "profileimg",
                          isProtected: true,
                        }}
                        modalStatus={modelStatus}
                        handleClose={() => setModelStatus(false)}
                        handleSuccess={(id: number, name: string) => {
                          // setImgName(name);
                          formik.setFieldValue("profileImageId", id);
                        }}
                        resourceType="user-avatar"
                      />
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </Tab>,
        ]}
      />
    </div>
  );
};

export default Index;
