import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { useThemeMode } from "../../../../_metronic/partials";
import { BasicButton } from "../../widgets/components/UI/BasicButton";
import { useIntl } from "react-intl";

const Error404: FC = () => {
  const { mode } = useThemeMode();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  return (
    <div className={" flex flex-col items-center justify-center text-center"}>
      {mode === "dark" ? (
        <img
          src={toAbsoluteUrl(
            "/media/illustrations/error/illustration404Dark.svg"
          )}
          alt=""
        />
      ) : (
        <img
          src={toAbsoluteUrl("/media/illustrations/error/illustration404.svg")}
          alt=""
        />
      )}
      <div
        className={`my-5 text-[22px] text-[#FFFFFFCC] font-semibold ${
          mode === "dark" ? "errorHeadingDark" : "errorHeading"
        }`}
      >
        404 Error - Page Not Found
      </div>
      <div
        className={`my-5 text-[#FFFFFFA6] max-w-4xl ${
          mode === "dark" ? "errorDetailsDark" : "errorDetails"
        }`}
      >
        The page you are looking for could not be found. Please check the URL or
        try searching for the page using the search bar. We apologize for any
        inconvenience this may have caused.
      </div>
      <div className="flex justify-center w-full">
        <BasicButton
          buttonText={formatMessage({ id: "Go to Dashboard" })}
          height="52px"
          width="404px"
          border="none"
          color="#C2D24B"
          textColor="#FFFFFF"
          padding="16px 24px"
          customClass="w-auto md:min-w-[300px]"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
    </div>
  );
};

export { Error404 };
