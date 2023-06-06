import { FieldArray, Formik, Form } from "formik";
import React, { useState } from "react";
import { SelectInput } from "../../widgets/components/Input/SelectInput";
import TextInput from "../../widgets/components/Input/TextInput";
import { CustomButton } from "../../widgets/components/UI/CustomButton";
import { InfoCard } from "../../widgets/components/UI/InfoCard";
import * as Yup from "yup";
import { useIntl } from "react-intl";
import { inviteUser } from "../core/_requests";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth";
import { designationOptions } from "../../../core/_constants";
import { Loader } from "../../widgets/components/General/Loader";
import { toast } from "react-toastify";
import { Toaster } from "../../widgets/components/General/Toaster";

const teamMembersFields = {
  firstName: "",
  lastName: "",
  email: "",
  designation: "",
};

const initialValues = {
  teamMembers: [teamMembersFields],
};

export const TeamMembers = () => {
  const { formatMessage } = useIntl();
  const [loading] = useState(false);
  const [skipLoading, setSkipLoading] = useState(false);
  const [inviteLoading, setInviteLoading] = useState(false);

  const navigate = useNavigate();
  const { setNewCompany, companyId } = useAuth();
  const teamMembersSchema = Yup.object().shape({
    teamMembers: Yup.array()
      .of(
        Yup.object().shape({
          firstName: Yup.string()
            .min(3, formatMessage({ id: "Minimum 3 characters" }))
            .max(50, formatMessage({ id: "Maximum 50 characters" }))
            .required(formatMessage({ id: "First name is required" })),
          email: Yup.string()
            .email(formatMessage({ id: "Invalid email format" }))
            .max(50, formatMessage({ id: "Maximum 50 characters" }))
            .required(formatMessage({ id: "Email is required" })),
          lastName: Yup.string()
            .max(50, formatMessage({ id: "Maximum 50 characters" }))
            .required(formatMessage({ id: "Last name is required" })),
          designation: Yup.string().required(
            formatMessage({ id: "Designation is required" })
          ), // these constraints take precedence
        })
      )
      .required(formatMessage({ id: "Must have team members" })) // these constraints are shown if and only if inner constraints are satisfied
      .min(1, formatMessage({ id: "Minimum of 1 team member" })),
  });
  const onSkip = async () => {
    setSkipLoading(true);
    setNewCompany(undefined);
    setSkipLoading(false);
    navigate("/dashboard");
  };

  const onSubmit = async (values: any) => {
    setNewCompany(undefined);
    setInviteLoading(false);
    navigate("/dashboard");
    // try {
    //   setInviteLoading(true)
    //   if (!companyId) {
    //     setInviteLoading(false)
    //     throw new Error(formatMessage({id: 'Company ID is required.'}))
    //   }
    //   const {
    //     data: {success, errors},
    //   } = await inviteUser(companyId.toString(), values.teamMembers)
    //   if (success) {
    //     setNewCompany(undefined)
    //     setInviteLoading(false)
    //     navigate('/dashboard')
    //   } else {
    //     setInviteLoading(false)
    //     setNewCompany(undefined)
    //     errors.forEach((error: string) => {
    //       toast.error(formatMessage({id: error}))
    //     })
    //   }
    // } catch (error) {
    //   setInviteLoading(false)
    //   setNewCompany(undefined)
    //   console.error(error)
    // }
  };

  return (
    <>
      <Toaster />
      {!loading ? (
        <Formik
          // validationSchema={teamMembersSchema}
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form className="text-[#FFFFFFCC] grid grid-cols-12 md:gap-x-[32px] gap-y-[40px]">
                <div className={"col-span-12 md:col-span-6 font-medium"}>
                  <h1
                    className={
                      "text-[14px] md:text-[22px] leading-[20px] md:leading-[32px] mb-2"
                    }
                  >
                    Team Members (Optional)
                  </h1>
                  <p
                    className={
                      "text-[13px] md:text-[16px] leading-5 text-[#A8B3BF] font-medium md:font-semibold"
                    }
                  >
                    Add team members to collaborate better
                  </p>
                </div>
                <div className={"col-span-12 md:col-span-6"}>
                  <InfoCard
                    title={formatMessage({ id: "What is this?" })}
                    desc={formatMessage({
                      id: "You can add your team members here who can help you manage & train this AI personality collaboratively with you.",
                    })}
                    slug={"#"}
                  />
                </div>
                <div className={"col-span-12"}>
                  <FieldArray
                    name="teamMembers"
                    render={(arrayHelpers) => {
                      return (
                        <>
                          {formik.values.teamMembers.map((_, index) => (
                            <div key={index}>
                              {index !== 0 ? (
                                <div className="fw-semibold fs-4">
                                  {`${formatMessage({ id: "Member" })} ${
                                    index + 1
                                  }`}
                                </div>
                              ) : (
                                <div className="fw-semibold fs-4">
                                  {formatMessage({ id: "Add first Member" })}
                                </div>
                              )}
                              <div className="grid grid-cols-12 md:gap-x-[18px]">
                                <div
                                  className={
                                    "col-span-12 md:col-span-6 lg:col-span-3"
                                  }
                                >
                                  <TextInput
                                    fieldType={"text"}
                                    label={formatMessage({ id: "First Name" })}
                                    fieldName={`teamMembers[${index}].firstName`}
                                    placeholder={formatMessage({
                                      id: "Enter First Name",
                                    })}
                                    formik={formik}
                                    isFieldArray={true}
                                    isStarRequired={true}
                                    toolTipText={formatMessage({
                                      id: "GLOBAL.TOOLTIP.TEAM_MEMBERS.FIRST_NAME",
                                    })}
                                  />
                                </div>
                                <div
                                  className={
                                    "col-span-12 md:col-span-6 lg:col-span-3"
                                  }
                                >
                                  <TextInput
                                    fieldType={"text"}
                                    label={formatMessage({ id: "Last Name" })}
                                    fieldName={`teamMembers[${index}].lastName`}
                                    placeholder={formatMessage({
                                      id: "Enter Last Name",
                                    })}
                                    formik={formik}
                                    isStarRequired={true}
                                    isFieldArray={true}
                                    toolTipText={formatMessage({
                                      id: "GLOBAL.TOOLTIP.TEAM_MEMBERS.LAST_NAME",
                                    })}
                                  />
                                </div>
                                <div
                                  className={
                                    "col-span-12 md:col-span-6 lg:col-span-3"
                                  }
                                >
                                  <TextInput
                                    fieldType={"email"}
                                    label={formatMessage({
                                      id: "Email Address",
                                    })}
                                    fieldName={`teamMembers[${index}].email`}
                                    placeholder={formatMessage({
                                      id: "Enter Email Address",
                                    })}
                                    formik={formik}
                                    isFieldArray={true}
                                    isStarRequired={true}
                                    toolTipText={formatMessage({
                                      id: "GLOBAL.TOOLTIP.TEAM_MEMBERS.EMAIL",
                                    })}
                                  />
                                </div>
                                <div
                                  className={
                                    "col-span-12 md:col-span-6 lg:col-span-3"
                                  }
                                >
                                  <SelectInput
                                    label={formatMessage({
                                      id: "Role",
                                    })}
                                    fieldName={`teamMembers[${index}].role`}
                                    placeholder={formatMessage({
                                      id: "Select Role",
                                    })}
                                    isStarRequired={true}
                                    formik={formik}
                                    toolTipText={formatMessage({
                                      id: "GLOBAL.TOOLTIP.TEAM_MEMBERS.ROLE",
                                    })}
                                    options={designationOptions}
                                    isFieldArray={true}
                                  />
                                </div>
                              </div>
                              {index ===
                                formik.values.teamMembers.length - 1 && (
                                <div className="flex flex-col md:flex-row md:justify-end gap-y-[14px] gap-x-[16px]">
                                  {index !== 0 && (
                                    <button
                                      className="btn btn-secondary !bg-[#C2D24B1A] text-primary"
                                      onClick={() => {
                                        arrayHelpers.remove(index);
                                      }}
                                    >
                                      {formatMessage({ id: "Remove member" })}
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    className="btn border border-primary text-primary"
                                    onClick={() =>
                                      arrayHelpers.push({
                                        firstName: "",
                                        lastName: "",
                                        email: "",
                                        designation: "",
                                      })
                                    }
                                  >
                                    {formatMessage({ id: "Add new Members" })}
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                        </>
                      );
                    }}
                  />
                </div>
                <div
                  className={
                    "col-span-12 flex flex-col-reverse md:flex-row justify-end md:mt-[135px] gap-y-[16px] md:gap-x-[16px]"
                  }
                >
                  <CustomButton
                    buttonText={formatMessage({ id: "Skip" })}
                    loading={skipLoading}
                    customClass={
                      "!w-full md:w-auto !bg-[#C2D24B1A] !text-[#C2D24B]"
                    }
                    isSkipButton={true}
                    onSkip={onSkip}
                    height={44}
                  />
                  <CustomButton
                    // isSubmitting={formik.isSubmitting}
                    // isValid={formik.isValid}
                    isSubmitting={false}
                    isValid={true}
                    buttonText={formatMessage({
                      id: "Send invite and continue",
                    })}
                    loading={inviteLoading}
                    customClass={"!w-full md:w-auto"}
                    height={44}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      ) : (
        <Loader isTeamMember={true} />
      )}
    </>
  );
};
