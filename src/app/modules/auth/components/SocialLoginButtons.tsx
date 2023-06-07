import React, { useState } from "react";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../core/Auth";
import { useIntl } from "react-intl";
import "../../../assets/index.css";
const SocialLoginButtons = ({
  localStorageReferral,
}: {
  localStorageReferral?: string;
}) => {
  const navigate = useNavigate();
  const { saveAuth, setUserToken, setNewCompany } = useAuth();
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [, setErrorsArray] = useState<string[]>();

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      setLoading1(true);

      const {
        data: { data: googleData, errors, success },
      } = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/auth/social-signin`,
        {
          type: "GOOGLE",
          token: response.access_token,
          referral: localStorageReferral,
        }
      );

      if (success) {
        setLoading(false);
        await saveAuth(googleData);
        setUserToken(googleData.token);
        if (!googleData.companyPresent) {
          setNewCompany(false);
        }
        navigate("/");
      } else {
        setLoading(false);
        setErrorsArray(errors);
        await saveAuth(undefined);
      }
    },
  });

  const { linkedInLogin } = useLinkedIn({
    clientId: process.env.REACT_APP_LINKEDIN_CLIENT_ID as string,
    redirectUri: `${window.location.origin}/auth/linkedin`,
    onSuccess: async (code) => {
      setLoading(true);
      const {
        data: { data: linkedinData, errors, success },
      } = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/auth/social-signin`,
        {
          type: "LINKEDIN",
          token: code,
          referral: localStorageReferral,
        }
      );
      if (success) {
        setLoading(false);
        await saveAuth(linkedinData);
        setUserToken(linkedinData.token);
        if (!linkedinData.companyPresent) {
          setNewCompany(false);
        }
        navigate("/");
      } else {
        setLoading(false);
        setErrorsArray(errors);
        await saveAuth(undefined);
      }
    },
    scope: "r_emailaddress r_liteprofile",
    onError: (error) => {
      console.log(error.errorMessage);
    },
  });
  return (
    <div className={"flex flex-col gap-[14px]"}>
      <button
        onClick={() => googleLogin()}
        className="bg-[#1A73E8] w-full flex items-center justify-center rounded py-4"
      >
        <img
          alt="Logo"
          src={toAbsoluteUrl("/media/svg/brand-logos/google-icon.svg")}
          className="h-15px google-signin-button me-3"
        />
        {!loading1 && (
          <span className="text-[14px] text-[#FFFFFF] font-semibold leading-[20px]">
            {formatMessage({ id: "Continue with Google" })}
          </span>
        )}
        {loading1 && (
          <span className="indicator-progress" style={{ display: "block" }}>
            {formatMessage({ id: "Please wait..." })}
            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
          </span>
        )}
      </button>
      <button
        onClick={linkedInLogin}
        className="bg-[#0077B5] w-full flex items-center justify-center rounded py-4"
      >
        <img
          alt="Logo"
          src={toAbsoluteUrl("/media/svg/brand-logos/linkedin-2.svg")}
          className="theme-light-show h-20px me-3"
        />
        <img
          alt="Logo"
          src={toAbsoluteUrl("/media/svg/brand-logos/linkedin-2.svg")}
          className="theme-dark-show h-15px me-3"
        />
        {!loading && (
          <span className="text-[14px] text-[#FFFFFF] font-semibold leading-[20px]">
            {formatMessage({ id: "Continue with LinkedIn" })}
          </span>
        )}
        {loading && (
          <span className="indicator-progress" style={{ display: "block" }}>
            {formatMessage({ id: "Please wait..." })}
            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
          </span>
        )}
      </button>
    </div>
  );
};

export default SocialLoginButtons;
