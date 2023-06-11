import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { acceptInvite, register } from "../core/_requests";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../core/Auth";
import SocialLoginButtons from "../components/SocialLoginButtons";
import TextInput from "../../widgets/components/Input/TextInput";
import { useIntl } from "react-intl";
import { CustomToast } from "../../widgets/components/UI/CustomToast";
import { CustomButton } from "../../widgets/components/UI/CustomButton";
import { useNavigate } from "react-router-dom";
import { FormikProps } from "../core/_models";
import { getLocation } from "../../onboarding/core/_requests";
import { Toaster } from "../../widgets/components/General/Toaster";

export function Registration() {
  const {formatMessage} = useIntl()
  const [loading, setLoading] = useState(false)
  const {saveAuth, setUserToken, setNewPersonality} = useAuth()
  const [errorsArray, setErrorsArray] = useState<string[]>()
  const [isInvited, setIsInvited] = useState<boolean>(false)
  const navigate = useNavigate()

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    acceptTerms: false,
  };

  const registrationSchema = Yup.object().shape({
    // firstname: Yup.string()
    //   .min(3, formatMessage({ id: "Minimum 3 characters" }))
    //   .max(50, formatMessage({ id: "Maximum 50 characters" }))
    //   .required(formatMessage({ id: "First name is required" })),
    email: Yup.string()
      .email(formatMessage({ id: "Invalid email format" }))
      .max(50, formatMessage({ id: "Maximum 50 characters" }))
      .required(formatMessage({ id: "Email is required" })),
    // lastname: Yup.string()
    //   .max(50, formatMessage({ id: "Maximum 50 characters" }))
    //   .required(formatMessage({ id: "Last name is required" })),
    password: Yup.string()
      .min(6, formatMessage({ id: "Minimum 6 characters" }))
      .max(50, formatMessage({ id: "Maximum 50 characters" }))
      .required(formatMessage({ id: "Password is required" })),
    acceptTerms: Yup.bool(),
  });

  const utmSource =
    new URL(window.location.href).searchParams.get("utm_source") || null;
  const utmMedium =
    new URL(window.location.href).searchParams.get("utm_medium") || null;
  const utmCampaign =
    new URL(window.location.href).searchParams.get("utm_campaign") || null;
  const referral = new URL(window.location.href).searchParams.get("r") || null;

  const lsUtmSource = localStorage.getItem("utm_source");
  const lsUtmMedium = localStorage.getItem("utm_medium");
  const lsUtmCampaign = localStorage.getItem("utm_campaign");
  const lsReferral = localStorage.getItem("referral");

  if (!lsUtmSource) {
    localStorage.setItem(
      "utm_source",
      JSON.stringify({ firstTouch: utmSource })
    );
  } else {
    localStorage.setItem(
      "utm_source",
      JSON.stringify({ ...JSON.parse(lsUtmSource), lastTouch: utmSource })
    );
  }
  if (!lsUtmMedium) {
    localStorage.setItem(
      "utm_medium",
      JSON.stringify({ firstTouch: utmMedium })
    );
  } else {
    localStorage.setItem(
      "utm_medium",
      JSON.stringify({ ...JSON.parse(lsUtmMedium), lastTouch: utmMedium })
    );
  }
  if (!lsUtmCampaign) {
    localStorage.setItem(
      "utm_campaign",
      JSON.stringify({ firstTouch: utmCampaign })
    );
  } else {
    localStorage.setItem(
      "utm_campaign",
      JSON.stringify({ ...JSON.parse(lsUtmCampaign), lastTouch: utmCampaign })
    );
  }
  if (!lsReferral?.length) {
    localStorage.setItem("referral", referral || "");
  }

  const localStorageUtmSource = localStorage.getItem("utm_source") || "";
  const localStorageUtmMedium = localStorage.getItem("utm_medium") || "";
  const localStorageUtmCampaign = localStorage.getItem("utm_campaign") || "";
  const localStorageReferral = localStorage.getItem("referral") || "";

  const onSubmit = async (values: any, { setSubmitting }: FormikProps) => {
    const plan = localStorage.getItem("plan") || " ";
    setLoading(true);
    try {
      const {
        data: { data: token, success, errors, data },
      } = await register(
        values.email,
        values.firstname,
        values.lastname,
        values.password,
        localStorageUtmSource,
        localStorageUtmMedium,
        localStorageUtmCampaign,
        localStorageReferral,
        plan
      );

      if (success) {
        navigate('/')
        await saveAuth(token)
        setUserToken(data.token)
        setNewPersonality(false)
        navigate('/onboarding/')
      } else {
        setErrorsArray(errors);
        await saveAuth(undefined);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  const { state, search } = useLocation() as any;

  useEffect(() => {
    const setPlanData = async () => {
      try {
        const {
          data: {
            currency: { code },
          },
        } = await getLocation();
        const params = new URLSearchParams(search);
        const planName = params.get("plan");
        const allPlans = [
          "Basic-USD-Monthly",
          "Silver-USD-Monthly",
          "Gold-USD-Monthly",
          "Basic-INR-Monthly",
          "Silver-INR-Monthly",
          "Gold-INR-Monthly",
          "Basic-USD-Yearly",
          "Silver-USD-Yearly",
          "Gold-USD-Yearly",
          "Basic-INR-Yearly",
          "Silver-INR-Yearly",
          "Gold-INR-Yearly",
        ];
        if (planName && allPlans.includes(planName)) {
          localStorage.setItem("plan", planName);
        } else {
          if (code === "INR") {
            localStorage.setItem("plan", "Basic-INR-Monthly");
          } else {
            localStorage.setItem("plan", "Basic-USD-Monthly");
          }
        }
      } catch (err) {
        const params = new URLSearchParams(search);
        const planName = params.get("plan");
        const allPlans = [
          "Basic-USD-Monthly",
          "Silver-USD-Monthly",
          "Gold-USD-Monthly",
          "Basic-INR-Monthly",
          "Silver-INR-Monthly",
          "Gold-INR-Monthly",
          "Basic-USD-Yearly",
          "Silver-USD-Yearly",
          "Gold-USD-Yearly",
          "Basic-INR-Yearly",
          "Silver-INR-Yearly",
          "Gold-INR-Yearly",
        ];
        if (planName && allPlans.includes(planName)) {
          localStorage.setItem("plan", planName);
        } else {
          localStorage.setItem("plan", "Basic-USD-Monthly");
        }
      }
    };
    setPlanData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAcceptInvite = async (
    values: any,
    { setSubmitting }: FormikProps
  ) => {
    setLoading(true);

    try {
      const {
        data: { data: token, success, errors, data },
      } = await acceptInvite(state.inviteToken, values.password);

      if (success) {
        navigate("/");
        await saveAuth(token);
        setUserToken(data.token);
        navigate("/");
      } else {
        setErrorsArray(errors);
        await saveAuth(undefined);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <>
      {" "}
      <Toaster />
      <Formik
        initialValues={initialValues}
        validationSchema={registrationSchema}
        onSubmit={isInvited ? handleAcceptInvite : onSubmit}
        validateOnMount
      >
        {(formik) => {
          if (state) {
            initialValues.firstname = state.firstName;
            initialValues.lastname = state.lastName;
            initialValues.email = state.email;
            setIsInvited(true);
          }
          return (
            <Form
              className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework px-3 pe-0"
              id="kt_login_signup_form"
            >
              {/* begin::Heading */}
              <div className="text-center mb-11">
                <h1 className="text-[22px] text-[#FFFFFFCC] leading-[32px] font-semibold pb-[8px]">
                  {formatMessage({ id: "Sign In to KamotoAI" })}
                </h1>
                <div className="text-gray-500 text-center fw-bold fs-4">
                  {formatMessage({ id: "Already have an account?" })}{" "}
                  <Link to="/auth/login/" className="link-primary fw-bold fs-4">
                    {formatMessage({ id: "Sign In" })}
                  </Link>
                </div>
              </div>
              {/* begin::Heading */}

              <div className=" mb-9">
                <SocialLoginButtons
                  localStorageReferral={localStorageReferral}
                />
                {/* begin::Separator */}
                <div className="separator separator-content my-14">
                  <span className="  fw-semibold fs-6 text-uppercase">
                    {formatMessage({ id: "Or" })}
                  </span>
                </div>
                {/* end::Separator */}
              </div>

              {errorsArray?.map((error: string) => (
                <CustomToast status={error} />
              ))}

              {/* <div className="md:flex gap-[16px]">
                <div className={"w-full md:w-1/2"}>
                  <TextInput
                    fieldType={"text"}
                    label={formatMessage({ id: "First Name" })}
                    fieldName={"firstname"}
                    formik={formik}
                    placeholder=""
                    toolTipText={formatMessage({
                      id: "GLOBAL.TOOLTIP.REGISTRATION.FIRST_NAME",
                    })}
                    isWidthNotRequired={true}
                    margin={"me-0"}
                    isDisabled={isInvited}
                    isStarRequired={true}
                  />
                </div>
                <div className={"w-full md:w-1/2"}>
                  <TextInput
                    fieldType={"text"}
                    label={formatMessage({ id: "Last Name" })}
                    fieldName={"lastname"}
                    formik={formik}
                    placeholder=""
                    toolTipText={formatMessage({
                      id: "GLOBAL.TOOLTIP.REGISTRATION.LAST_NAME",
                    })}
                    isWidthNotRequired={true}
                    margin={"me-0"}
                    isDisabled={isInvited}
                    isStarRequired={true}
                  />
                </div>
              </div> */}

              {/* begin::Form group */}
              <TextInput
                fieldType={"email"}
                fieldName={"email"}
                formik={formik}
                placeholder={""}
                label={formatMessage({ id: "Email" })}
                toolTipText={formatMessage({
                  id: "GLOBAL.TOOLTIP.REGISTRATION.EMAIL",
                })}
                isDisabled={isInvited}
                isStarRequired={true}
              />
              {/* end::Form group */}

              {/* begin::Form group */}
              <TextInput
                fieldType={"text"}
                fieldName={"password"}
                isPassword={true}
                formik={formik}
                placeholder={""}
                label={formatMessage({ id: "Password" })}
                toolTipText={formatMessage({
                  id: "GLOBAL.TOOLTIP.REGISTRATION.PASSWORD",
                })}
                isStarRequired={true}
              />
              {/* end::Form group */}

              <TextInput
                fieldName={"acceptTerms"}
                formik={formik}
                linkText1={formatMessage({ id: "Terms of use" })}
                linkText2={formatMessage({ id: "Privacy Policy" })}
                slug1={process.env.REACT_APP_TERMS_POLICY_LINK}
                slug2={process.env.REACT_APP_TERMS_POLICY_LINK}
                customText={formatMessage({ id: "I Agree" })}
                placeholder=""
                fieldType={"checkbox"}
                isCheckbox={true}
                isStarRequired={true}
              />

              {/* begin::Form group */}
              {/* begin::Action */}
              <CustomButton
                isSubmitting={formik.isSubmitting}
                isValid={formik.isValid}
                isAcceptTerms={formik.values.acceptTerms}
                buttonText={formatMessage({ id: "Submit" })}
                loading={loading}
                customClass={"w-full"}
                isAcceptTermsPresent={true}
              />
              {/* end::Action */}
              {/* end::Form group */}
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
