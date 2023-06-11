import React from "react";
import { toAbsoluteUrl } from "../../../../../_metronic/helpers";
import { GET_FILE_URL } from "../../../onboarding/core/_requests";

export const DisplayImage = ({
  imgName,
  height,
  alt,
  width,
  fit,
  className,
}: {
  imgName: string | undefined;
  height?: string | number;
  alt: string | undefined;
  width?: string | undefined | number;
  className?: string;
  fit?: "fill" | "cover" | "contain";
}) => {
  return (
    <>
      {imgName ? (
        <img
          src={`${imgName}`}
          height={height}
          width={width}
          alt={alt}
          style={{ objectFit: fit }}
          className={className}
        />
      ) : (
        <img
          src={toAbsoluteUrl("/media/avatars/300-1.jpg")}
          width={width}
          height={height}
          alt={alt}
          className={className}
        />
      )}
    </>
  );
};
