import React from "react";

const Index: React.FC<any> = ({
  image,
  likes,
  followers,
  name,
  isVerified,
  occupation,
}) => {
  return (
    <div
      className={
        "border border-[#2E2F45] rounded-md shadow-default p-[8px] pb-[12px]"
      }
    >
      <img src={image} className={"w-full rounded-t-md mb-[8px]"} />
      <h3
        className={
          "text-[14px] leading-5 text-[#FFFFFFCC] font-semibold mb-[4px] flex items-center gap-x-[4px]"
        }
      >
        {name}
        {isVerified && (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 0L12.3794 2.67687L15.8779 1.90983L16.2294 5.47405L19.5106 6.90983L17.7 10L19.5106 13.0902L16.2294 14.5259L15.8779 18.0902L12.3794 17.3231L10 20L7.62057 17.3231L4.12215 18.0902L3.77057 14.5259L0.489435 13.0902L2.3 10L0.489435 6.90983L3.77057 5.47405L4.12215 1.90983L7.62057 2.67687L10 0Z"
              fill="#4776E6"
            />
            <path
              d="M6.92285 9.9991L8.97855 12.3068L14.2305 7.69141"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </h3>
      <p className={"text-[12px] leading-[18px] text-[#FFFFFFA6] mb-[8px]"}>
        {occupation}
      </p>
      <div
        className={"flex gap-x-10 text-[12px] leading-[18px] text-[#FFFFFFA6]"}
      >
        <div className={"flex  items-center gap-x-1"}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_344_30822)">
              <path
                d="M1.75 12.25V11.0833C1.75 10.4645 1.99583 9.871 2.43342 9.43342C2.871 8.99583 3.46449 8.75 4.08333 8.75H6.41667C7.0355 8.75 7.629 8.99583 8.06658 9.43342C8.50417 9.871 8.75 10.4645 8.75 11.0833V12.25M9.33333 1.82583C9.83524 1.95434 10.2801 2.24624 10.5978 2.65551C10.9155 3.06479 11.0879 3.56815 11.0879 4.08625C11.0879 4.60435 10.9155 5.10771 10.5978 5.51699C10.2801 5.92626 9.83524 6.21816 9.33333 6.34667M12.25 12.25V11.0833C12.247 10.5683 12.0738 10.0688 11.7572 9.66257C11.4407 9.25634 10.9986 8.96624 10.5 8.8375M2.91667 4.08333C2.91667 4.70217 3.1625 5.29566 3.60008 5.73325C4.03767 6.17083 4.63116 6.41667 5.25 6.41667C5.86884 6.41667 6.46233 6.17083 6.89992 5.73325C7.3375 5.29566 7.58333 4.70217 7.58333 4.08333C7.58333 3.46449 7.3375 2.871 6.89992 2.43342C6.46233 1.99583 5.86884 1.75 5.25 1.75C4.63116 1.75 4.03767 1.99583 3.60008 2.43342C3.1625 2.871 2.91667 3.46449 2.91667 4.08333Z"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_344_30822">
                <rect width="14" height="14" fill="white" />
              </clipPath>
            </defs>
          </svg>
          {followers}
        </div>
        <div className={"flex  items-center gap-x-1"}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_344_30828)">
              <path
                d="M11.3748 7.33316L6.99977 11.6662L2.62477 7.33316C2.3362 7.05235 2.10889 6.71483 1.95717 6.34186C1.80545 5.96889 1.7326 5.56855 1.7432 5.16604C1.7538 4.76353 1.84763 4.36757 2.01878 4.00311C2.18992 3.63864 2.43468 3.31356 2.73764 3.04833C3.04059 2.7831 3.39518 2.58348 3.77907 2.46202C4.16297 2.34057 4.56785 2.29992 4.96823 2.34263C5.36861 2.38534 5.75581 2.51048 6.10544 2.71019C6.45508 2.90989 6.75958 3.17983 6.99977 3.50299C7.241 3.18217 7.54585 2.9146 7.89524 2.71701C8.24464 2.51943 8.63106 2.39609 9.03031 2.35471C9.42957 2.31334 9.83306 2.35482 10.2156 2.47655C10.598 2.59829 10.9513 2.79767 11.2532 3.0622C11.5551 3.32674 11.7991 3.65074 11.97 4.01393C12.1409 4.37712 12.235 4.77167 12.2464 5.17291C12.2579 5.57414 12.1863 5.97341 12.0363 6.34572C11.8864 6.71804 11.6611 7.05539 11.3748 7.33666"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_344_30828">
                <rect width="14" height="14" fill="white" />
              </clipPath>
            </defs>
          </svg>
          {likes}
        </div>
      </div>
    </div>
  );
};

export default Index;
