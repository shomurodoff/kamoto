import React, { Dispatch, SetStateAction, useState } from "react";
import "../styles/index.scss";
import { toAbsoluteUrl } from "../../../../_metronic/helpers/AssetHelpers";
import TextInput from "../../widgets/components/Input/TextInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useIntl } from "react-intl";
import { SelectInput } from "../../widgets/components/Input/SelectInput";
import { CustomButton } from "../../widgets/components/UI/CustomButton";
import { profileData, updateProfileInfo } from "../core/_requests";
import { FileUpload } from "../../widgets/components/FileUpload";
import { designationOptions, userInitialValues } from "../core/_constants";
import { useAuth } from "../../auth";
import { ChangePasswordModal } from "../../auth/components/ChangePasswordModal";
import { forgotPassword } from "../../auth/core/_requests";
import { DisplayImage } from "../../widgets/components/General/DisplayImage";
import { toast } from "react-toastify";
import { Spinner } from "../../widgets/components/General/Spinner";
import { ToolTipUI } from "../../widgets/components/UI/ToolTipUI";
import { BasicButton } from "../../widgets/components/UI/BasicButton";
import TextArea from "../../widgets/components/Input/TextArea";
import { Country } from "../../widgets/components/General/Country";
import { State } from "../../widgets/components/General/State";
import SearchInput from "./SearchInput";

export function AiPersonality({
  key,
  setImgName,
  imgName,
  getApiLoading,
  countryOptions,
}: {
  key: number;
  setImgName: Dispatch<SetStateAction<string | undefined>>;
  imgName: string | undefined;
  getApiLoading: boolean;
  countryOptions: any;
}) {
  const { formatMessage } = useIntl();

  const [modelStatus, setModelStatus] = useState<boolean>(false);
  const { personalityId, currentUser, setCurrentUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [, setHasErrors] = useState<boolean | undefined>();

  const userSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, formatMessage({ id: "Minimum 3 characters" }))
      .max(50, formatMessage({ id: "Maximum 50 characters" }))
      .required(formatMessage({ id: "First name is required" })),
    lastName: Yup.string()
      .max(50, formatMessage({ id: "Maximum 50 characters" }))
      .required(formatMessage({ id: "Last name is required" })),
    email: Yup.string()
      .email(formatMessage({ id: "Invalid email format" }))
      .max(50, formatMessage({ id: "Maximum 50 characters" }))
      .required(formatMessage({ id: "Email is required" })),
    contact: Yup.string()
      .required(formatMessage({ id: "Contact number is required" }))
      .min(6, formatMessage({ id: "Minimum 6 digits" }))
      .max(10, formatMessage({ id: "Maximum 10 digits" }))
      .nullable(),
    country: Yup.string()
      .required(formatMessage({ id: "Country is required" }))
      .nullable(),
    communication: Yup.object().shape({
      email: Yup.bool(),
      phone: Yup.bool(),
    }),
  });

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      let {
        data: { success, errors },
      } = await updateProfileInfo({
        ...values,
        country: parseInt(values.country),
        personalityId,
      });

      if (success) {
        if (personalityId) {
          const {
            data: { success, data, errors },
          } = await profileData(personalityId);
          if (success) {
            setCurrentUser({
              ...currentUser,
              firstName: data.firstName,
              profileImg: data.profileImage,
            });
            setImgName(data.profileImage);
            const communicationData = JSON.parse(data.communication);
            userInitialValues.firstName = data.firstName;
            userInitialValues.lastName = data.lastName;
            userInitialValues.email = data.email;
            userInitialValues.contact = data.contact!;
            userInitialValues.country = data.countryId!;
            userInitialValues.designation = data.designation;
            userInitialValues.profileImageId = data.profileImageId!;
            userInitialValues.communication.email =
              communicationData?.email || false;
            userInitialValues.communication.phone =
              communicationData?.phone || false;
          } else if (errors) {
            errors.forEach((error: string) => {
              toast.error(formatMessage({ id: error }));
            });
          }
        }
        setLoading(false);
        toast.success(formatMessage({ id: "Profile updated successfully" }));
      } else if (errors) {
        setLoading(false);
        errors.forEach((error: string) => {
          toast.error(formatMessage({ id: error }));
        });
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const getForgotedPassword = async () => {
    if (currentUser?.email) {
      try {
        setChangePasswordLoading(true);
        const {
          data: { success },
        } = await forgotPassword(currentUser?.email);
        if (success) {
          setShowModal(true);
          setHasErrors(false);
        } else {
          setHasErrors(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setChangePasswordLoading(false);
      }
    }
  };

  const handleOpen = () => {
    setModelStatus(true);
  };
  const handleClose = () => {
    setModelStatus(false);
  };

  return (
    <>
      {getApiLoading ? <Spinner /> : null}
      <SearchInput />
      <div className="flex flex-col md:flex-row gap-y-[20px] gap-x-[40px] bg-[#171825] md:px-[50px] px-[16px] py-[16px] md:pb-[40px] shadow-default rounded">
        <div className={"flex "}>
          <div className={`relative !rounded`}>
            <DisplayImage
              imgName={imgName}
              fit="contain"
              alt="profile"
              className={"md:w-[140px] w-[120px] h-[120px] rounded"}
            />
            <div
              className="rounded-full  bg-[#21233A] absolute -top-2 -right-3 p-2 shadow-[0px_2px_4px_0px_#0000001A]"
              onClick={handleOpen}
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
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <Formik
          initialValues={userInitialValues}
          validationSchema={userSchema}
          onSubmit={onSubmit}
          className={"flex-grow"}
        >
          {(formik) => {
            return (
              <Form className={"w-full"}>
                <h3
                  className={
                    "text-[16px] leading-[22px] text-[#FFFFFFCC] font-medium mb-[16px]"
                  }
                >
                  General
                </h3>
                <div className={"grid grid-cols-12 md:gap-x-[24px]"}>
                  <div className={"col-span-12 md:col-span-6"}>
                    <TextInput
                      fieldType={"text"}
                      label={formatMessage({ id: "Personality Name" })}
                      fieldName={"personalName"}
                      formik={formik}
                      placeholder="Shahrukh Khan"
                      toolTipText={formatMessage({
                        id: "GLOBAL.TOOLTIP.USER.FIRST_NAME",
                      })}
                      isStarRequired={true}
                    />
                  </div>
                  <div className={"col-span-12 md:col-span-6"}>
                    <TextInput
                      fieldType={"text"}
                      label={formatMessage({ id: "Tagline" })}
                      fieldName={"tagline"}
                      formik={formik}
                      placeholder="King of Bollywood"
                      toolTipText={formatMessage({
                        id: "GLOBAL.TOOLTIP.USER.LAST_NAME",
                      })}
                      width={5}
                      isStarRequired={true}
                    />
                  </div>
                  <div className={"col-span-12 md:col-span-6 "}>
                    <TextArea
                      label={formatMessage({ id: "Description" })}
                      fieldName={"description"}
                      formik={formik}
                      placeholder="Short description"
                      className={"!min-h-[80px]"}
                      toolTipText={formatMessage({
                        id: "GLOBAL.TOOLTIP.USER.EMAIL",
                      })}
                      isStarRequired={true}
                    />
                  </div>
                  <div className={"col-span-12 md:col-span-6"}>
                    <SelectInput
                      label={formatMessage({ id: "Gender" })}
                      fieldName={"gender"}
                      placeholder={formatMessage({
                        id: "Select your Position",
                      })}
                      formik={formik}
                      toolTipText={formatMessage({ id: "Select your gender" })}
                      options={[
                        { name: "Male", value: "male" },
                        { name: "Female", value: "female" },
                      ]}
                    />
                  </div>
                  <div className={"col-span-12 md:col-span-6"}>
                    <SelectInput
                      label={formatMessage({ id: "Personality Type" })}
                      fieldName={"personality"}
                      placeholder={formatMessage({
                        id: "Select your Fictional character",
                      })}
                      formik={formik}
                      toolTipText={formatMessage({
                        id: "Select your Fictional character",
                      })}
                      options={[
                        { name: "Fictional character", value: "fictional" },
                      ]}
                    />
                  </div>
                  <div className={"col-span-12 md:col-span-6"}>
                    <SelectInput
                      label={formatMessage({ id: "Visibility" })}
                      fieldName={"visibility"}
                      placeholder={formatMessage({
                        id: "Select your Fictional character",
                      })}
                      formik={formik}
                      toolTipText={formatMessage({
                        id: "Select your Fictional character",
                      })}
                      options={[
                        { name: "Public", value: "public" },
                        { name: "Private", value: "private" },
                      ]}
                    />
                  </div>
                  <div className={"col-span-12 md:col-span-6"}>
                    <SelectInput
                      label={formatMessage({ id: "Industry" })}
                      fieldName={"industry"}
                      placeholder={formatMessage({
                        id: "Select your Industry",
                      })}
                      formik={formik}
                      toolTipText={formatMessage({
                        id: "Select your Industry",
                      })}
                      options={[
                        { name: "Agro", value: "Industry" },
                        { name: "Tech", value: "Tech" },
                      ]}
                    />
                  </div>
                  <div className={"col-span-12 md:col-span-6"}>
                    <TextInput
                      label={formatMessage({ id: "Website URL" })}
                      fieldName={"website"}
                      withoutLabel={true}
                      formik={formik}
                      placeholder="www.example.com"
                      toolTipText={formatMessage({
                        id: "GLOBAL.TOOLTIP.USER.EMAIL",
                      })}
                      isStarRequired={true}
                      fieldType={"text"}
                    />
                  </div>
                  <div className={"col-span-12 md:col-span-6"}>
                    <SelectInput
                      label={formatMessage({ id: "Country" })}
                      fieldName={"country"}
                      placeholder={formatMessage({ id: "Select Your Country" })}
                      formik={formik}
                      toolTipText={formatMessage({
                        id: "GLOBAL.TOOLTIP.USER.COUNTRY",
                      })}
                      options={countryOptions}
                      width={5}
                      margin={"me-6"}
                    />
                  </div>
                  <div className={"col-span-12 md:col-span-6"}>
                    <SelectInput
                      label={formatMessage({ id: "State/Province*" })}
                      fieldName={"state"}
                      placeholder={formatMessage({
                        id: "Select Your State or Province",
                      })}
                      formik={formik}
                      toolTipText={formatMessage({
                        id: "GLOBAL.TOOLTIP.USER.COUNTRY",
                      })}
                      options={countryOptions}
                    />
                  </div>
                  <div
                    className={
                      "col-span-12 bg-[#2E2F45] p-[8px] shadow-[0px_2px_4px_0px_#0000001A] rounded relative mb-[18px] md:mb-[32px]"
                    }
                  >
                    <div
                      className="rounded-full  bg-[#21233A] absolute -top-2 -right-3 p-2 shadow-[0px_2px_4px_0px_#0000001A]"
                      onClick={handleOpen}
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
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <img
                      src={toAbsoluteUrl("/media/avatars/banner-image.png")}
                      className={"w-full h-[110px]"}
                    />
                  </div>
                  <div className={"col-span-12 md:col-span-8"}>
                    <h3
                      className={
                        "text-[16px] leading-[22px] text-[#FFFFFFCC] font-medium mb-[16px]"
                      }
                    >
                      Social Media
                    </h3>
                    <div className={"grid grid-cols-12 flex items-center"}>
                      <div
                        className={
                          "col-span-12 md:col-span-4 lg:col-span-3 flex items-start"
                        }
                      >
                        <label
                          className={
                            "flex items-center gap-[10px] mb-[8px] md:mb-[14px]"
                          }
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_344_14028)">
                              <path
                                d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM9.71 19.667C8.72341 17.5743 8.15187 15.3102 8.027 13H4.062C4.25659 14.5389 4.89392 15.9882 5.89657 17.1717C6.89922 18.3552 8.22401 19.2221 9.71 19.667ZM10.03 13C10.181 15.439 10.878 17.73 12 19.752C13.1523 17.6766 13.8254 15.3695 13.97 13H10.03ZM19.938 13H15.973C15.8481 15.3102 15.2766 17.5743 14.29 19.667C15.776 19.2221 17.1008 18.3552 18.1034 17.1717C19.1061 15.9882 19.7434 14.5389 19.938 13ZM4.062 11H8.027C8.15187 8.68979 8.72341 6.42569 9.71 4.333C8.22401 4.77788 6.89922 5.64475 5.89657 6.8283C4.89392 8.01184 4.25659 9.4611 4.062 11ZM10.031 11H13.969C13.8248 8.6306 13.152 6.32353 12 4.248C10.8477 6.32345 10.1746 8.63052 10.03 11H10.031ZM14.29 4.333C15.2766 6.42569 15.8481 8.68979 15.973 11H19.938C19.7434 9.4611 19.1061 8.01184 18.1034 6.8283C17.1008 5.64475 15.776 4.77788 14.29 4.333Z"
                                fill="#C2D24B"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_344_14028">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          Website
                        </label>
                      </div>
                      <div className={"col-span-12 md:col-span-9"}>
                        <TextInput
                          fieldName={"website"}
                          withoutLabel={true}
                          formik={formik}
                          placeholder="Enter website URL here"
                          toolTipText={formatMessage({
                            id: "GLOBAL.TOOLTIP.USER.EMAIL",
                          })}
                          isStarRequired={true}
                          fieldType={"text"}
                        />
                      </div>
                    </div>
                    <div className={"grid grid-cols-12 flex items-center"}>
                      <div
                        className={
                          "col-span-12 md:col-span-4 lg:col-span-3 flex items-start"
                        }
                      >
                        <label
                          className={
                            "flex items-center gap-[10px] mb-[8px] md:mb-[14px]"
                          }
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_344_14037)">
                              <path
                                d="M12 2C6.477 2 2 6.477 2 12C2 16.991 5.657 21.128 10.438 21.879V14.89H7.898V12H10.438V9.797C10.438 7.291 11.93 5.907 14.215 5.907C15.309 5.907 16.453 6.102 16.453 6.102V8.562H15.193C13.95 8.562 13.563 9.333 13.563 10.124V12H16.336L15.893 14.89H13.563V21.879C18.343 21.129 22 16.99 22 12C22 6.477 17.523 2 12 2Z"
                                fill="#C2D24B"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_344_14037">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          Facebook
                        </label>
                      </div>
                      <div className={"col-span-12 md:col-span-9"}>
                        <TextInput
                          fieldName={"facebook"}
                          withoutLabel={true}
                          formik={formik}
                          placeholder="Enter website URL here"
                          toolTipText={formatMessage({
                            id: "GLOBAL.TOOLTIP.USER.EMAIL",
                          })}
                          isStarRequired={true}
                          fieldType={"text"}
                        />
                      </div>
                    </div>
                    <div className={"grid grid-cols-12 flex items-center"}>
                      <div
                        className={
                          "col-span-12 md:col-span-4 lg:col-span-3 flex items-start"
                        }
                      >
                        <label
                          className={
                            "flex items-center gap-[10px] mb-[8px] md:mb-[14px]"
                          }
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_344_14046)">
                              <path
                                d="M8.28978 20.2541C15.8373 20.2541 19.9648 14.0013 19.9648 8.57913C19.9648 8.40155 19.9612 8.22478 19.9532 8.04874C20.7562 7.46766 21.4493 6.74815 22 5.92393C21.2648 6.25078 20.4736 6.47077 19.6437 6.56997C20.4908 6.06192 21.1412 5.25837 21.448 4.3004C20.6425 4.77826 19.7613 5.11511 18.8424 5.29643C18.0936 4.49885 17.0277 4 15.8472 4C13.5812 4 11.7436 5.83763 11.7436 8.10276C11.7436 8.42477 11.7797 8.73799 11.8501 9.03839C8.43971 8.86678 5.41566 7.23398 3.39179 4.7512C3.02728 5.37735 2.83554 6.08906 2.83616 6.81359C2.83616 8.23719 3.56058 9.49395 4.66218 10.2292C4.01058 10.2093 3.37327 10.0333 2.80381 9.71596C2.80321 9.73321 2.80321 9.74999 2.80321 9.76838C2.80321 11.7556 4.21762 13.4148 6.09518 13.7907C5.74254 13.8868 5.37867 13.9354 5.01318 13.9352C4.75435 13.935 4.49612 13.9102 4.24198 13.8611C4.76439 15.4915 6.2792 16.6779 8.07515 16.7111C6.67074 17.8119 4.90157 18.4675 2.97878 18.4675C2.64798 18.4675 2.3212 18.4487 2 18.4107C3.81602 19.5748 5.97236 20.2539 8.28998 20.2539"
                                fill="#C2D24B"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_344_14046">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          Twitter
                        </label>
                      </div>
                      <div className={"col-span-12 md:col-span-9"}>
                        <TextInput
                          fieldName={"twitter"}
                          withoutLabel={true}
                          formik={formik}
                          placeholder="Enter website URL here"
                          toolTipText={formatMessage({
                            id: "GLOBAL.TOOLTIP.USER.EMAIL",
                          })}
                          isStarRequired={true}
                          fieldType={"text"}
                        />
                      </div>
                    </div>
                    <div className={"grid grid-cols-12 flex items-center"}>
                      <div
                        className={
                          "col-span-12 md:col-span-4 lg:col-span-3 flex items-start"
                        }
                      >
                        <label
                          className={
                            "flex items-center gap-[10px] mb-[8px] md:mb-[14px]"
                          }
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_344_14046)">
                              <path
                                d="M8.28978 20.2541C15.8373 20.2541 19.9648 14.0013 19.9648 8.57913C19.9648 8.40155 19.9612 8.22478 19.9532 8.04874C20.7562 7.46766 21.4493 6.74815 22 5.92393C21.2648 6.25078 20.4736 6.47077 19.6437 6.56997C20.4908 6.06192 21.1412 5.25837 21.448 4.3004C20.6425 4.77826 19.7613 5.11511 18.8424 5.29643C18.0936 4.49885 17.0277 4 15.8472 4C13.5812 4 11.7436 5.83763 11.7436 8.10276C11.7436 8.42477 11.7797 8.73799 11.8501 9.03839C8.43971 8.86678 5.41566 7.23398 3.39179 4.7512C3.02728 5.37735 2.83554 6.08906 2.83616 6.81359C2.83616 8.23719 3.56058 9.49395 4.66218 10.2292C4.01058 10.2093 3.37327 10.0333 2.80381 9.71596C2.80321 9.73321 2.80321 9.74999 2.80321 9.76838C2.80321 11.7556 4.21762 13.4148 6.09518 13.7907C5.74254 13.8868 5.37867 13.9354 5.01318 13.9352C4.75435 13.935 4.49612 13.9102 4.24198 13.8611C4.76439 15.4915 6.2792 16.6779 8.07515 16.7111C6.67074 17.8119 4.90157 18.4675 2.97878 18.4675C2.64798 18.4675 2.3212 18.4487 2 18.4107C3.81602 19.5748 5.97236 20.2539 8.28998 20.2539"
                                fill="#C2D24B"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_344_14046">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          LinkedIn
                        </label>
                      </div>
                      <div className={"col-span-12 md:col-span-9"}>
                        <TextInput
                          fieldName={"linkedIn"}
                          withoutLabel={true}
                          formik={formik}
                          placeholder="Enter website URL here"
                          toolTipText={formatMessage({
                            id: "GLOBAL.TOOLTIP.USER.EMAIL",
                          })}
                          isStarRequired={true}
                          fieldType={"text"}
                        />
                      </div>
                    </div>
                    <div className={"grid grid-cols-12 flex items-center"}>
                      <div
                        className={
                          "col-span-12 md:col-span-4 lg:col-span-3 flex items-start"
                        }
                      >
                        <label
                          className={
                            "flex items-center gap-[10px] mb-[8px] md:mb-[14px]"
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
                              d="M12.0033 2C7.82836 2 6.60736 2.00431 6.37002 2.024C5.51325 2.09524 4.98012 2.23017 4.39931 2.51943C3.9517 2.74176 3.59869 2.99947 3.25029 3.36073C2.6158 4.01956 2.23126 4.83009 2.09205 5.79356C2.02437 6.26129 2.00468 6.35668 2.00068 8.74581C1.99915 9.54219 2.00068 10.5903 2.00068 11.9961C2.00068 16.1688 2.0053 17.3889 2.02529 17.6258C2.09451 18.4597 2.22526 18.9844 2.50213 19.5583C3.03126 20.6568 4.04184 21.4815 5.23238 21.7892C5.64461 21.8954 6.09991 21.9539 6.68442 21.9816C6.93206 21.9923 9.4562 22 11.9819 22C14.5076 22 17.0332 21.997 17.2747 21.9846C17.9515 21.9528 18.3445 21.9 18.7791 21.7877C19.3694 21.6363 19.9195 21.3578 20.3911 20.9716C20.8627 20.5855 21.2443 20.1011 21.5093 19.5521C21.7808 18.9921 21.9185 18.4474 21.9808 17.657C21.9943 17.4847 22 14.7373 22 11.9935C22 9.24924 21.9938 6.50685 21.9803 6.33453C21.9172 5.53138 21.7796 4.99134 21.4993 4.42052C21.2694 3.95325 21.014 3.60429 20.6433 3.24749C19.9819 2.61544 19.1728 2.23079 18.2086 2.0917C17.7414 2.02416 17.6484 2.00415 15.258 2H12.0033Z"
                              fill="url(#paint0_radial_344_14064)"
                            />
                            <path
                              d="M12.0033 2C7.82836 2 6.60736 2.00431 6.37002 2.024C5.51325 2.09524 4.98012 2.23017 4.39931 2.51943C3.9517 2.74176 3.59869 2.99947 3.25029 3.36073C2.6158 4.01956 2.23126 4.83009 2.09205 5.79356C2.02437 6.26129 2.00468 6.35668 2.00068 8.74581C1.99915 9.54219 2.00068 10.5903 2.00068 11.9961C2.00068 16.1688 2.0053 17.3889 2.02529 17.6258C2.09451 18.4597 2.22526 18.9844 2.50213 19.5583C3.03126 20.6568 4.04184 21.4815 5.23238 21.7892C5.64461 21.8954 6.09991 21.9539 6.68442 21.9816C6.93206 21.9923 9.4562 22 11.9819 22C14.5076 22 17.0332 21.997 17.2747 21.9846C17.9515 21.9528 18.3445 21.9 18.7791 21.7877C19.3694 21.6363 19.9195 21.3578 20.3911 20.9716C20.8627 20.5855 21.2443 20.1011 21.5093 19.5521C21.7808 18.9921 21.9185 18.4474 21.9808 17.657C21.9943 17.4847 22 14.7373 22 11.9935C22 9.24924 21.9938 6.50685 21.9803 6.33453C21.9172 5.53138 21.7796 4.99134 21.4993 4.42052C21.2694 3.95325 21.014 3.60429 20.6433 3.24749C19.9819 2.61544 19.1728 2.23079 18.2086 2.0917C17.7414 2.02416 17.6484 2.00415 15.258 2H12.0033Z"
                              fill="#C2D24B"
                            />
                            <path
                              d="M11.9989 4.61523C9.99376 4.61523 9.74212 4.624 8.95457 4.65985C8.16857 4.69586 7.63205 4.82033 7.1626 5.00296C6.677 5.19159 6.26508 5.44392 5.85469 5.85457C5.444 6.26506 5.19174 6.6771 5.00255 7.16268C4.8195 7.63241 4.69491 8.16922 4.65953 8.95514C4.62446 9.74289 4.61523 9.99476 4.61523 12.0005C4.61523 14.0062 4.62416 14.2571 4.65984 15.0449C4.69599 15.8311 4.82043 16.3678 5.00285 16.8373C5.19159 17.3231 5.44385 17.7351 5.85439 18.1456C6.26462 18.5564 6.67654 18.8093 7.16183 18.998C7.63159 19.1806 8.16826 19.3051 8.95411 19.3411C9.74165 19.3769 9.99314 19.3857 11.9982 19.3857C14.0035 19.3857 14.2543 19.3769 15.0419 19.3411C15.8279 19.3051 16.365 19.1806 16.8348 18.998C17.3202 18.8093 17.7315 18.5564 18.1418 18.1456C18.5525 17.7351 18.8047 17.3231 18.9939 16.8375C19.1754 16.3678 19.3 15.8309 19.3369 15.045C19.3723 14.2573 19.3815 14.0062 19.3815 12.0005C19.3815 9.99476 19.3723 9.74305 19.3369 8.95529C19.3 8.16907 19.1754 7.63241 18.9939 7.16283C18.8047 6.6771 18.5525 6.26506 18.1418 5.85457C17.7311 5.44377 17.3204 5.19144 16.8343 5.00296C16.3636 4.82033 15.8268 4.69586 15.0408 4.65985C14.2533 4.624 14.0025 4.61523 11.9968 4.61523H11.9989ZM11.3366 5.94611C11.5332 5.94581 11.7525 5.94611 11.9989 5.94611C13.9702 5.94611 14.2039 5.95319 14.9824 5.98858C15.7022 6.02151 16.0929 6.14182 16.3532 6.24291C16.6977 6.37677 16.9434 6.53678 17.2016 6.79526C17.46 7.05375 17.62 7.29992 17.7541 7.64456C17.8552 7.90459 17.9756 8.29539 18.0084 9.01545C18.0438 9.79397 18.0515 10.0278 18.0515 11.9988C18.0515 13.9697 18.0438 14.2036 18.0084 14.9821C17.9755 15.7022 17.8552 16.093 17.7541 16.353C17.6203 16.6976 17.46 16.943 17.2016 17.2014C16.9432 17.4598 16.6979 17.6199 16.3532 17.7537C16.0932 17.8553 15.7022 17.9753 14.9824 18.0082C14.204 18.0436 13.9702 18.0513 11.9989 18.0513C10.0274 18.0513 9.7938 18.0436 9.01548 18.0082C8.29562 17.975 7.90492 17.8546 7.64451 17.7536C7.29996 17.6197 7.05385 17.4597 6.79544 17.2012C6.53703 16.9427 6.37706 16.6972 6.24293 16.3524C6.14187 16.0923 6.02143 15.7015 5.98867 14.9815C5.95329 14.203 5.94621 13.9691 5.94621 11.9969C5.94621 10.0248 5.95329 9.79213 5.98867 9.0136C6.02159 8.29354 6.14187 7.90274 6.24293 7.64241C6.37675 7.29777 6.53703 7.05159 6.79544 6.79311C7.05385 6.53463 7.29996 6.37461 7.64451 6.24045C7.90477 6.1389 8.29562 6.01889 9.01548 5.98581C9.69659 5.95504 9.96054 5.94581 11.3366 5.94427V5.94611ZM15.94 7.17237C15.7648 7.17237 15.5935 7.22436 15.4478 7.32175C15.3021 7.41914 15.1885 7.55757 15.1215 7.71953C15.0544 7.88148 15.0369 8.05969 15.0711 8.23161C15.1053 8.40353 15.1897 8.56144 15.3136 8.68537C15.4376 8.8093 15.5955 8.89368 15.7674 8.92784C15.9393 8.962 16.1174 8.9444 16.2793 8.87728C16.4412 8.81016 16.5795 8.69652 16.6768 8.55074C16.7742 8.40496 16.8261 8.23358 16.826 8.05829C16.826 7.56902 16.4292 7.17206 15.94 7.17206V7.17237ZM11.9989 8.20784C9.90501 8.20784 8.20733 9.90598 8.20733 12.0005C8.20733 14.0949 9.90501 15.7923 11.9989 15.7923C14.0928 15.7923 15.7901 14.0949 15.7901 12.0005C15.7901 9.90598 14.0927 8.20784 11.9988 8.20784H11.9989ZM11.9989 9.53872C13.358 9.53872 14.46 10.6408 14.46 12.0005C14.46 13.36 13.358 14.4622 11.9989 14.4622C10.6396 14.4622 9.53785 13.36 9.53785 12.0005C9.53785 10.6408 10.6396 9.53872 11.9989 9.53872Z"
                              fill="#1E1E2D"
                            />
                            <defs>
                              <radialGradient
                                id="paint0_radial_344_14064"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(7.31253 23.5405) rotate(-90) scale(19.8215 18.4355)"
                              >
                                <stop stopColor="#FFDD55" />
                                <stop offset="0.1" stopColor="#FFDD55" />
                                <stop offset="0.5" stop-color="#FF543E" />
                                <stop offset="1" stopColor="#C837AB" />
                              </radialGradient>
                            </defs>
                          </svg>
                          Instagram
                        </label>
                      </div>
                      <div className={"col-span-12 md:col-span-9"}>
                        <TextInput
                          fieldName={"webpage"}
                          withoutLabel={true}
                          formik={formik}
                          placeholder="Enter website URL here"
                          toolTipText={formatMessage({
                            id: "GLOBAL.TOOLTIP.USER.EMAIL",
                          })}
                          isStarRequired={true}
                          fieldType={"text"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <FileUpload
                  fileSize={2097152}
                  maxFileNumber={1}
                  allowType={["image/*", ".jpg", ".jpeg", ".png"]}
                  metaData={{ module: "profileimg", isProtected: true }}
                  modalStatus={modelStatus}
                  handleClose={handleClose}
                  handleSuccess={(id: number, name: string) => {
                    setImgName(name);
                    formik.setFieldValue("profileImageId", id);
                  }}
                />
                <div
                  className={
                    "flex flex-col md:flex-row justify-end mt-5 gap-y-[14px] md:gap-x-[20px]"
                  }
                >
                  <BasicButton
                    buttonText={formatMessage({ id: "Change password" })}
                    onClick={getForgotedPassword}
                    disabled={changePasswordLoading}
                    loading={changePasswordLoading}
                    height="44px"
                    border="1px solid #C2D24B"
                    customClass={"!bg-[#171825]"}
                    textColor={"#C2D24B"}
                    padding="12px 24px"
                  />
                  <CustomButton
                    isSubmitting={formik.isSubmitting}
                    isValid={formik.isValid}
                    buttonText={formatMessage({ id: "Save Changes" })}
                    loading={loading}
                    height={44}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <ChangePasswordModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        setShowModal={setShowModal}
      />
    </>
  );
}
