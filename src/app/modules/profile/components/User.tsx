import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import SearchInput from "./SearchInput";

export function User({
  key,
  // setImgName,
  // imgName,
  getApiLoading,
  countryOptions,
  phoneCodes
}: {
  key: number;
  // setImgName: Dispatch<SetStateAction<string | undefined>>;
  // imgName: string | undefined;
  getApiLoading: boolean;
  countryOptions: any;
  phoneCodes: any;
}) {
  const { formatMessage } = useIntl();

  const [modelStatus, setModelStatus] = useState<boolean>(false);
  const [modalStatusBanner, setModalStatusBanner] = useState<boolean>(false);
  const [imgName, setImgName] = useState<string | undefined>();
  const [bannerUrl, setBannerUrl] = useState<string | undefined>(toAbsoluteUrl("/media/avatars/banner-image.png"));
  const { personalityId, currentUser, setCurrentUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [, setHasErrors] = useState<boolean | undefined>();
  const [stateOptions, setStateOptions] = useState<Array<any>>([])

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
      .nullable()
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
            const communicationData = data.communication;
            userInitialValues.firstName = data.firstName;
            userInitialValues.lastName = data.lastName;
            userInitialValues.email = data.email;
            userInitialValues.contact = data.contact!;
            userInitialValues.country = data.countryId!;
            userInitialValues.designation = data.designation;
            userInitialValues.photo = data.photo!;
            userInitialValues.banner = data.banner!;
            userInitialValues.website = data.website;
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

  useEffect(() => {
    setImgName(userInitialValues.photo)
    if(userInitialValues.banner){
      setBannerUrl(userInitialValues.banner)
    }
  },[])

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

  const handleBannerClose = () => {
    setModalStatusBanner(false)
  }

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
                <div className={"grid grid-cols-12 md:gap-x-[24px]"}>
                  <div className={"col-span-12 md:col-span-6"}>
                    <TextInput
                      fieldType={"text"}
                      label={formatMessage({ id: "First Name" })}
                      fieldName={"firstName"}
                      formik={formik}
                      placeholder=""
                      toolTipText={formatMessage({
                        id: "GLOBAL.TOOLTIP.USER.FIRST_NAME",
                      })}
                    />
                  </div>
                  <div className={"col-span-12 md:col-span-6"}>
                    <TextInput
                      fieldType={"text"}
                      label={formatMessage({ id: "Last Name" })}
                      fieldName={"lastName"}
                      formik={formik}
                      placeholder=""
                      toolTipText={formatMessage({
                        id: "GLOBAL.TOOLTIP.USER.LAST_NAME",
                      })}
                    />
                  </div>
                  <div className={"col-span-12 md:col-span-6"}>
                    <TextInput
                      fieldType={"text"}
                      label={formatMessage({ id: "Username" })}
                      fieldName={"lastName"}
                      formik={formik}
                      placeholder=""
                      toolTipText={formatMessage({
                        id: "GLOBAL.TOOLTIP.USER.LAST_NAME",
                      })}
                    />
                  </div>
                  <div className={"col-span-12 md:col-span-6"}>
                    <SelectInput
                      label={formatMessage({ id: "Position" })}
                      fieldName={"designation"}
                      isStarRequired={false}
                      placeholder={formatMessage({
                        id: "Select your Position",
                      })}
                      formik={formik}
                      toolTipText={formatMessage({
                        id: "GLOBAL.TOOLTIP.USER.POSITION",
                      })}
                      options={designationOptions}
                    />
                  </div>
                  <div className={"col-span-12 md:col-span-6"}>
                    <TextInput
                      fieldType={"email"}
                      label={formatMessage({ id: "Email Address" })}
                      fieldName={"email"}
                      formik={formik}
                      placeholder=""
                      toolTipText={formatMessage({
                        id: "GLOBAL.TOOLTIP.USER.EMAIL",
                      })}
                    />
                  </div>
                  <div className={"col-span-12 md:col-span-6"}>
                    <label
                      className={
                        "mb-1  text-[13px] leading-5 text-[#FFFFFFA6] flex"
                      }
                    >
                      Contact Number{" "}
                      <ToolTipUI tooltipText={"Contact Number"} />
                    </label>
                    <div className={"flex gap-[8px]"}>
                      <div className={"w-[100px]"}>
                        <SelectInput
                          fieldName={"country"}
                          placeholder={"+998"}
                          // label={formatMessage({id: 'Contact Number'})}
                          formik={formik}
                          toolTipText={formatMessage({
                            id: "GLOBAL.TOOLTIP.USER.CONTACT_NUMBER",
                          })}
                          options={phoneCodes}
                        />
                      </div>
                      <div className={"flex-grow"}>
                        <TextInput
                          fieldType={"contact"}
                          withoutLabel={true}
                          fieldName={"contact"}
                          formik={formik}
                          placeholder=""
                          toolTipText={formatMessage({
                            id: "GLOBAL.TOOLTIP.USER.CONTACT_NUMBER",
                          })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={"col-span-12 md:col-span-6"}>
                    <SelectInput
                      label={formatMessage({ id: "User’s Country" })}
                      fieldName={"country"}
                      placeholder={formatMessage({ id: "Select the Country" })}
                      formik={formik}
                      toolTipText={formatMessage({
                        id: "GLOBAL.TOOLTIP.USER.COUNTRY",
                      })}
                      options={countryOptions}
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
                      fieldType={"text"}
                    />
                  </div>
                  <div className={"col-span-12 md:col-span-6 "}>
                    <TextArea
                      label={formatMessage({ id: "Description" })}
                      fieldName={"description"}
                      formik={formik}
                      placeholder="Short description"
                      toolTipText={formatMessage({
                        id: "GLOBAL.TOOLTIP.USER.EMAIL",
                      })}
                      className={"!min-h-[80px]"}
                    />
                  </div>
                  <div
                    className={
                      "col-span-12 bg-[#2E2F45] p-[8px] shadow-[0px_2px_4px_0px_#0000001A] rounded relative"
                    }
                  >
                    <div
                      className="rounded-full  bg-[#21233A] absolute -top-2 -right-3 p-2 shadow-[0px_2px_4px_0px_#0000001A]"
                      onClick={(e) => setModalStatusBanner(true)}
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
                      src={bannerUrl}
                      className={"w-full h-[110px]"}
                    />
                  </div>
                </div>
                {/* ToDoAnand change all fileupload with respect to new flow */}
                <FileUpload
                  fileSize={2097152}
                  maxFileNumber={1}
                  allowType={["image/*", ".jpg", ".jpeg", ".png"]}
                  metaData={{ module: "profileimg", isProtected: true }}
                  modalStatus={modelStatus}
                  handleClose={handleClose}
                  handleSuccess={(id: number, name: string) => {
                    setImgName(name);
                    formik.setFieldValue("photo", name);
                  }}
                  resourceType="user-avatar"
                />
                <FileUpload
                  fileSize={2097152}
                  maxFileNumber={1}
                  allowType={["image/*", ".jpg", ".jpeg", ".png"]}
                  metaData={{ module: "profileimg", isProtected: true }}
                  modalStatus={modalStatusBanner}
                  handleClose={handleBannerClose}
                  handleSuccess={(id: number, name: string) => {
                    setBannerUrl(name);
                    formik.setFieldValue("banner", name);
                  }}
                  resourceType="user-banner"
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
                    isValid={formik.isValid && formik.dirty}
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
