/* eslint-disable jsx-a11y/anchor-is-valid */
import { toAbsoluteUrl } from "../../../../_metronic/helpers/AssetHelpers";
import { CustomButton } from "../../widgets/components/UI/CustomButton";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { SelectInput } from "../../widgets/components/Input/SelectInput";
import TextInput from "../../widgets/components/Input/TextInput";
import { useIntl } from "react-intl";
import { CompanyFieldsType, socialMediaType } from "../core/_models";
import { Dispatch, SetStateAction, useState } from "react";
import { industryOptions } from "../../../core/_constants";
import {
  companyInitialValues,
  operatingStatusOptions,
  teamSizeOptions,
} from "../core/_constants";
import TextArea from "../../widgets/components/Input/TextArea";
import { updatePersonalityInfo } from "../core/_requests";
import { socialMediaData } from "../core/_constants";
import { FileUpload } from "../../widgets/components/FileUpload";
import { useAuth } from "../../auth";
import { DisplayImage } from "../../widgets/components/General/DisplayImage";
import "../../onboarding/styles/onboarding.scss";
import { toast } from "react-toastify";

import { verifyToken } from "../../auth/core/_requests";
import { Spinner } from "../../widgets/components/General/Spinner";
import { getPersonalityInfo } from "../../../../app/modules/profile/core/_requests";

export function Company({
  key,
  setCompanyImgName,
  companyImgName,
  getCompanyApiLoading,
  setCountryId,
  countryOptions,
  stateOptions,
}: {
  key: number;
  setCountryId: Dispatch<SetStateAction<string | undefined>>;
  setCompanyImgName: Dispatch<SetStateAction<string | undefined>>;
  companyImgName: string | undefined;
  getCompanyApiLoading: boolean;
  countryOptions: any;
  stateOptions: any;
}) {
  const [loading, setLoading] = useState(false)
  const [modelStatus, setModelStatus] = useState<boolean>(false)
  const {personalityId, currentUser, setCurrentUser} = useAuth()
  const {formatMessage} = useIntl()

  const companySchema = Yup.object().shape({
    companyName: Yup.string()
      .required(formatMessage({ id: "Company name is required" }))
      .min(3, formatMessage({ id: "Minimum 3 characters" }))
      .nullable(),
    tagline: Yup.string()
      .required(formatMessage({ id: "TagLine is required" }))
      .min(3, formatMessage({ id: "Minimum 3 characters" }))
      .nullable(),
    teamSize: Yup.string()
      .required(formatMessage({ id: "Team size is required" }))
      .nullable(),
    legalName: Yup.string()
      .required(formatMessage({ id: "Legal Name is required" }))
      .min(3, formatMessage({ id: "Minimum 3 characters" }))
      .nullable(),
    operatingStatus: Yup.string()
      .required(formatMessage({ id: "Operating status is required" }))
      .nullable(),
    description: Yup.string()
      .required(formatMessage({ id: "Description is required" }))
      .min(3, formatMessage({ id: "Minimum 3 characters" }))
      .nullable(),
    foundedDate: Yup.date()
      .required(formatMessage({ id: "Founded Date is required" }))
      .nullable(),
    industry: Yup.string()
      .required(formatMessage({ id: "Industry is required" }))
      .nullable(),
    country: Yup.string()
      .required(formatMessage({ id: "Country is required" }))
      .nullable(),
    state: Yup.string()
      .required(formatMessage({ id: "State/Province is required" }))
      .nullable(),
    founders: Yup.string()
      .required(formatMessage({ id: "Founders is required" }))
      .nullable(),
    socialMedia: Yup.object().shape({
      website: Yup.string()
        .url(formatMessage({ id: "Please Enter the valid URL" }))
        .nullable(),
      facebook: Yup.string()
        .url(formatMessage({ id: "Please Enter the valid URL" }))
        .nullable(),
      twitter: Yup.string()
        .url(formatMessage({ id: "Please Enter the valid URL" }))
        .nullable(),
      linkedin: Yup.string()
        .url(formatMessage({ id: "Please Enter the valid URL" }))
        .nullable(),
      instagram: Yup.string()
        .url(formatMessage({ id: "Please Enter the valid URL" }))
        .nullable(),
    }),
  });

  const onSubmit = async (values: CompanyFieldsType) => {
    const updateCompanyData = {
      name: values.companyName,
      tagline: values.tagline,
      teamSize: values.teamSize,
      legalName: values.legalName,
      operatingStatus: values.operatingStatus,
      description: values.description,
      foundedDate: values.foundedDate,
      industry: values.industry,
      countryId: values.country,
      stateId: values.state,
      logoId: values.logoId,
      founders: values.founders,
      website: values.socialMedia.website,
      facebook: values.socialMedia.facebook,
      twitter: values.socialMedia.twitter,
      linkedin: values.socialMedia.linkedin,
      instagram: values.socialMedia.instagram,
      personalityId: personalityId,
    }
    try {
      setLoading(true);
      const {
        data: { success, errors, data },
      } = await updatePersonalityInfo(updateCompanyData);
      if (success) {
        if (personalityId) {
          const {
            data: {success, data},
          } = await getPersonalityInfo(personalityId)
          if (success) {
            setCompanyImgName(data.companylogo);
            companyInitialValues.companyName = data.name;
            companyInitialValues.tagline = data.tagline;
            companyInitialValues.teamSize = data.teamSize;
            companyInitialValues.legalName = data.legalName;
            companyInitialValues.operatingStatus = data.operatingStatus;
            companyInitialValues.description = data.description;
            companyInitialValues.foundedDate = data.foundedDate;
            companyInitialValues.industry = data.industry;
            companyInitialValues.country = data.countryId;
            companyInitialValues.state = data.stateId;
            companyInitialValues.founders = data.founders;
            companyInitialValues.logoId = data.logoId;
            companyInitialValues.socialMedia.website = data.website;
            companyInitialValues.socialMedia.facebook = data.facebook;
            companyInitialValues.socialMedia.twitter = data.twitter;
            companyInitialValues.socialMedia.linkedin = data.linkedin;
            companyInitialValues.socialMedia.instagram = data.instagram;
          }
        }
        setLoading(false);
        toast.success(formatMessage({ id: "Company updated successfully" }));
        const {
          data: { success },
        } = await verifyToken(data.token);
        if (success) {
          setCurrentUser(currentUser);
        }
      } else {
        setLoading(false);
        console.log(errors);

        errors.forEach((error: string) => {
          toast.error(formatMessage({ id: error }));
        });
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
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
      {getCompanyApiLoading ? <Spinner /> : null}
      <div className=" g-5 g-xxl-8 company-container p-2">
        <div className="col-xl-12 d-md-flex mt-0">
          <div>
            <div
              className={`cardC position-relative d-flex justify-content-center`}
              onClick={handleOpen}
            >
              <DisplayImage
                imgName={companyImgName}
                width="100%"
                alt="profile"
                fit="contain"
              />

              <div className="pencil-container">
                <img
                  src={toAbsoluteUrl("/media/icons/duotune/general/pencil.svg")}
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="mt-md-8 ms-md-16 w-100 p-5">
            <div className="fs-6 fw-bold mb-1">
              {formatMessage({ id: "General" })}
            </div>
            <Formik
              initialValues={companyInitialValues}
              validationSchema={companySchema}
              onSubmit={onSubmit}
            >
              {(formik) => {
                setCountryId(formik.values.country);
                return (
                  <Form>
                    <div className="d-md-flex col-md-12 flex-wrap">
                      <FileUpload
                        fileSize={2097152}
                        maxFileNumber={1}
                        allowType={["image/*", ".jpg", ".jpeg", ".png"]}
                        metaData={{ module: "logo", isProtected: true }}
                        modalStatus={modelStatus}
                        handleClose={handleClose}
                        handleSuccess={(id: number, name: string) => {
                          setCompanyImgName(name);
                          formik.setFieldValue("logoId", id);
                        }}
                      />
                      <TextInput
                        fieldType={"text"}
                        label={formatMessage({ id: "Company Name" })}
                        fieldName={"companyName"}
                        formik={formik}
                        placeholder={formatMessage({
                          id: "Enter the Company Name",
                        })}
                        margin="me-6"
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.COMPANY.COMPANY_NAME",
                        })}
                        width={5}
                        isStarRequired={true}
                      />
                      <TextInput
                        fieldType={"text"}
                        label={formatMessage({ id: "Tagline" })}
                        fieldName={"tagline"}
                        formik={formik}
                        placeholder={formatMessage({ id: "Enter the Tagline" })}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.COMPANY.TAGLINE",
                        })}
                        width={5}
                        isStarRequired={true}
                      />
                      <SelectInput
                        label={formatMessage({ id: "Team Size" })}
                        fieldName={"teamSize"}
                        formik={formik}
                        placeholder={formatMessage({
                          id: "Select the Team Size",
                        })}
                        margin={"me-6"}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.COMPANY.TEAM_SIZE",
                        })}
                        width={5}
                        options={teamSizeOptions}
                      />
                      <TextInput
                        fieldType={"text"}
                        label={formatMessage({ id: "Legal Name" })}
                        fieldName={"legalName"}
                        formik={formik}
                        placeholder={formatMessage({
                          id: "Enter the Legal Name",
                        })}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.COMPANY.LEGAL_NAME",
                        })}
                        width={5}
                        isStarRequired={true}
                      />
                      <SelectInput
                        label={formatMessage({ id: "Operating Status" })}
                        fieldName={"operatingStatus"}
                        placeholder={formatMessage({
                          id: "Select your Operating Status",
                        })}
                        formik={formik}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.COMPANY.OPERATING_STATUS",
                        })}
                        options={operatingStatusOptions}
                        margin="me-6"
                        width={5}
                      />

                      <TextArea
                        fieldName={"description"}
                        formik={formik}
                        placeholder={formatMessage({
                          id: "Short Description",
                        })}
                        label={formatMessage({ id: "Description" })}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.COMPANY.DESCRIPTION",
                        })}
                        width={5}
                        isStarRequired={true}
                      />
                      <TextInput
                        fieldType={"date"}
                        fieldName={"foundedDate"}
                        formik={formik}
                        placeholder={formatMessage({
                          id: "Select the Founding Date",
                        })}
                        margin="me-6"
                        label={formatMessage({ id: "Founding Date" })}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.COMPANY.FOUNDING_DATE",
                        })}
                        width={5}
                        dateValue={formik.values.foundedDate}
                        isStarRequired={true}
                      />

                      <SelectInput
                        label={formatMessage({ id: "Industry" })}
                        fieldName={"industry"}
                        placeholder={formatMessage({
                          id: "Select Your Industry",
                        })}
                        formik={formik}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.COMPANY.INDUSTRY",
                        })}
                        options={industryOptions}
                        width={5}
                      />
                      <SelectInput
                        label={formatMessage({ id: "Country" })}
                        fieldName={"country"}
                        placeholder={formatMessage({
                          id: "Select Your Country",
                        })}
                        formik={formik}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.COMPANY.COUNTRY",
                        })}
                        options={countryOptions}
                        width={5}
                        margin={"me-6"}
                      />

                      <SelectInput
                        label={formatMessage({ id: "State/Province" })}
                        fieldName={"state"}
                        placeholder={formatMessage({
                          id: "Select Your State or Province",
                        })}
                        formik={formik}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.COMPANY.STATE",
                        })}
                        options={stateOptions}
                        width={5}
                      />
                      <div className="d-md-flex flex-md-column col-md-12">
                        <TextInput
                          fieldType={"text"}
                          fieldName={"founders"}
                          formik={formik}
                          placeholder={formatMessage({
                            id: "Enter the Founders",
                          })}
                          label={formatMessage({ id: "Founders" })}
                          toolTipText={formatMessage({
                            id: "GLOBAL.TOOLTIP.COMPANY.FOUNDERS",
                          })}
                          width={5}
                          isTooltipNotRequired={false}
                          isStarRequired={true}
                        />
                      </div>
                      <div className="mt-md-3 p-md-0 p-5 w-100">
                        <div className="fs-4 fw-bold mb-4">
                          {formatMessage({ id: "Social Media" })}
                        </div>
                        {socialMediaData.map(
                          ({
                            id,
                            icon,
                            iconLable,
                            placeholder,
                            fieldName,
                          }: socialMediaType) => (
                            <div className="d-flex mb-md-4 mb-2 gap-1" key={id}>
                              <div className="d-md-flex align-items-md-center me-md-3">
                                <img
                                  src={toAbsoluteUrl(
                                    `/media/icons/duotune/social/${icon}`
                                  )}
                                  width="20px"
                                  height="20px"
                                  alt={iconLable}
                                />
                              </div>
                              <TextInput
                                fieldType={"url"}
                                fieldName={fieldName}
                                formik={formik}
                                placeholder={formatMessage({ id: placeholder })}
                                label={formatMessage({ id: iconLable })}
                                width={12}
                                isTooltipNotRequired={true}
                                isBeside={true}
                                labelWidth="w-125px"
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div className="d-flex justify-content-end button-margin me-10">
                      <CustomButton
                        isSubmitting={formik.isSubmitting}
                        isValid={formik.isValid}
                        buttonText={formatMessage({ id: "Save Changes" })}
                        loading={loading}
                        widthLoading={2}
                        width={2}
                        margin={"me-3"}
                        height={44}
                      />
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
