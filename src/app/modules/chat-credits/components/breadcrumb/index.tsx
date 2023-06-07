import React from "react";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";

const Index = () => {
  const { formatMessage } = useIntl();
  return (
    <div className={"px-[20px]"}>
      <h4 className="mb-1 leading-7 text-[20px] font-semibold text-[#FFFFFFCC]">
        {formatMessage({ id: "Chat Credits" })}
      </h4>
      <p className="flex items-center text-[12px] leading-[18px] font-normal text-[#FFFFFFA6]">
        <Link to="/" className={"text-[#C2D24B]"}>
          {formatMessage({ id: "Home" })}
        </Link>
        <span className="h-1px bullet mx-2"></span>
        <span className="text-muted font-size-12">
          {" "}
          {formatMessage({ id: "Chat Credits" })}
        </span>
      </p>
    </div>
  );
};

export default Index;
