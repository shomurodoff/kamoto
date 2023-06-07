import { useIntl } from "react-intl";
import clsx from "clsx";

export const BasicButton = ({
  buttonText,
  height,
  loading,
  inverted,
  onClick,
  disabled,
  color,
  border,
  textColor,
  minWidth,
  padding,
  width,
  id,
  customClass,
  investorCard,
}: {
  buttonText?: string;
  height?: string;
  loading?: boolean;
  inverted?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  color?: string;
  border?: string;
  textColor?: string;
  minWidth?: number;
  padding?: string;
  width?: string;
  id?: string;
  customClass?: string;
  investorCard?: boolean;
}) => {
  const { formatMessage } = useIntl();
  return (
    <button
      id={id ? id : ""}
      type="button"
      className={clsx("rounded", loading ? "opacity-50" : "", customClass)}
      style={{
        backgroundColor: color,
        border,
        padding,
        height: height,
      }}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {!loading && (
        <span
          className="text-[14px] font-normal leading-5"
          style={{
            color: textColor,
          }}
        >
          {buttonText}
        </span>
      )}
      {loading && (
        <span
          className={`indicator-label font-size-13 p-0 opacity-50`}
          style={{
            color: textColor,
          }}
        >
          {formatMessage({ id: "Please wait..." })}
          <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
        </span>
      )}
    </button>
  );
};
