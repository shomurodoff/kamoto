/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import * as Yup from "yup";
import { Link, useLocation } from "react-router-dom";
import { Form, Formik } from "formik";
import { login } from "../core/_requests";
import { useAuth } from "../core/Auth";
import SocialLoginButtons from "../components/SocialLoginButtons";
import TextInput from "../../widgets/components/Input/TextInput";
import { useIntl } from "react-intl";
import { CustomButton } from "../../widgets/components/UI/CustomButton";
import { useNavigate } from "react-router-dom";
import { CustomToast } from "../../widgets/components/UI/CustomToast";
import { FormikProps } from "../core/_models";
import { Toaster } from "../../widgets/components/General/Toaster";

export function Login() {
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(false);
  const [emailDisabled, setEmailDisabled] = useState<boolean>(false);
  const { saveAuth, setUserToken } = useAuth();
  const navigate = useNavigate();
  const [errorsArray, setErrorsArray] = useState<string[]>();

  const initialValues = {
    email: "",
    password: "",
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email(formatMessage({ id: "Invalid email format" }))
      .max(50, formatMessage({ id: "Maximum 50 characters" }))
      .required(formatMessage({ id: "Email is required" })),
    password: Yup.string()
      .min(6, formatMessage({ id: "Minimum 6 characters" }))
      .max(50, formatMessage({ id: "Maximum 50 characters" }))
      .required(formatMessage({ id: "Password is required" })),
  });

  const onSubmit = async (values: any, { setSubmitting }: FormikProps) => {
    setLoading(true);
    try {
      const {
        data: { data, success, errors },
      } = await login(values.email, values.password);
      if (success) {
        await saveAuth(data);
        setUserToken(data.token);

        navigate("/");
      } else {
        setErrorsArray(errors);
        await saveAuth(undefined);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  const { state } = useLocation() as any;

  return (
    <>
      <Toaster />
      <Formik
        validationSchema={loginSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
        validateOnMount
      >
        {(formik) => {
          if (state) {
            initialValues.email = state.email;
            setEmailDisabled(true);
          }
          return (
            <>
              <Form className="form w-100 px-3" id="kt_login_signin_form">
                <div className="text-center mb-10">
                  <h1 className="text-[22px] text-[#FFFFFFCC] leading-[32px] font-semibold pb-[8px]">
                    {formatMessage({ id: "Sign In to KamotoAI" })}
                  </h1>
                  <div className="text-gray-500 text-center fw-bold fs-4">
                    {formatMessage({ id: "New Here?" })}{" "}
                    <Link
                      to="/auth/registration/"
                      className="link-primary fw-bold fs-4"
                    >
                      {formatMessage({ id: "Create an Account" })}
                    </Link>
                  </div>
                </div>
                {errorsArray?.map((error: string) => (
                  <CustomToast status={error} />
                ))}
                <TextInput
                  isDisabled={emailDisabled}
                  fieldName={"email"}
                  formik={formik}
                  fieldType={"text"}
                  placeholder={""}
                  label={formatMessage({ id: "Email" })}
                  toolTipText={formatMessage({
                    id: "GLOBAL.TOOLTIP.LOGIN.EMAIL",
                  })}
                  isStarRequired={true}
                />
                <TextInput
                  fieldName={"password"}
                  formik={formik}
                  fieldType={"text"}
                  isPassword={true}
                  placeholder={""}
                  isForgetPassword={true}
                  label={formatMessage({ id: "Password" })}
                  toolTipText={formatMessage({
                    id: "GLOBAL.TOOLTIP.LOGIN.PASSWORD",
                  })}
                  isStarRequired={true}
                />
                <CustomButton
                  isSubmitting={formik.isSubmitting}
                  isValid={formik.isValid}
                  buttonText={formatMessage({ id: "Continue" })}
                  customClass={"w-full"}
                  loading={loading}
                  height={54}
                />
                <div className=" mb-9">
                  <div className="separator separator-content my-14">
                    <span className="  fw-semibold fs-6 text-uppercase">
                      {formatMessage({ id: "Or" })}
                    </span>
                  </div>
                </div>
              </Form>
              <SocialLoginButtons />
            </>
          );
        }}
      </Formik>
    </>
  );
}
