import { useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { forgotPassword } from "../core/_requests";
import TextInput from "../../widgets/components/Input/TextInput";
import { useIntl } from "react-intl";
import { CustomButton } from "../../widgets/components/UI/CustomButton";
import { FormikProps } from "../core/_models";
import { Link } from "react-router-dom";
import { CustomToast } from "../../widgets/components/UI/CustomToast";

const initialValues = {
  email: "",
};

export function ForgotPassword() {
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(false);
  const [errorsArray, setErrorsArray] = useState<string[]>();

  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email(formatMessage({ id: "Invalid email format" }))
      .max(50, formatMessage({ id: "Maximum 50 characters" }))
      .required(formatMessage({ id: "Email is required" })),
  });

  const onSubmit = async (
    values: any,
    { setStatus, setSubmitting }: FormikProps
  ) => {
    setLoading(true);

    try {
      const {
        data: { success, errors },
      } = await forgotPassword(values.email);
      if (success) {
        setStatus(
          formatMessage({
            id: "Password reset link has been emailed to you. Please check your inbox including you spam folder",
          })
        );
        setErrorsArray([]);
        setLoading(false);
      } else {
        setStatus("");
        setErrorsArray(errors);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={forgotPasswordSchema}
      onSubmit={onSubmit}
      validateOnMount
    >
      {(formik) => (
        <Form
          className="form max-w-[480px] fv-plugins-bootstrap5 fv-plugins-framework"
          id="kt_login_password_reset_form"
        >
          <div className="text-center d-md-flex justify-content-md-start align-items-md-center mb-8 fs-5 "></div>
          <div className="text-center mb-10">
            {/* begin::Title */}
            <h1 className="text-[#FFFFFFCC] text-[22px] leading-[32px] font-semibold mb-[8px]">
              {formatMessage({ id: "Forgot Password" })}
            </h1>
            {/* end::Title */}

            {/* begin::Link */}
            <div className="text-[#FFFFFFA6] font-medium text-[13px] leading-5">
              {formatMessage({
                id: "Enter the email that you used when register to recover your password. You will receive a password reset link.",
              })}
            </div>
            {/* end::Link */}
          </div>
          {/* begin::Title */}
          {errorsArray?.map((error: string) => (
            <CustomToast status={error} />
          ))}
          {formik.status && <CustomToast status={formik.status} />}
          <TextInput
            fieldType={"email"}
            fieldName={"email"}
            formik={formik}
            placeholder={""}
            label={formatMessage({ id: "Email" })}
            toolTipText={formatMessage({
              id: "GLOBAL.TOOLTIP.FORGOT_PASSWORD.EMAIL",
            })}
            isStarRequired={true}
          />
          {/* begin::Form group */}
          <CustomButton
            isSubmitting={formik.isSubmitting}
            isValid={formik.isValid}
            buttonText={formatMessage({ id: "Send Reset Link" })}
            loading={loading}
            customClass={"w-full mb-5"}
          />{" "}
          <div className={"text-center "}>
            <Link
              to="/auth/login"
              className="text-[14px] leading-5  text-[#C2D24B] font-semibold"
            >
              <span className="ms-2">
                {formatMessage({ id: "Go Back to Sign in" })}
              </span>
            </Link>
          </div>
          {/* end::Form group */}
        </Form>
      )}
    </Formik>
  );
}
