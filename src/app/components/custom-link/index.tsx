import React from "react";
import { Link } from "react-router-dom";

const Index: React.FC<any> = ({ title = "Learn More", link = "/" }) => {
  return (
    <Link
      to={link}
      className={
        "flex items-center gap-x-[8px] text-[#C2D24B] text-[12px] font-medium leading-[18px]"
      }
    >
      {title}
      <svg
        width="18"
        height="16"
        viewBox="0 0 18 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.3"
          d="M5.08826 7.33268C4.7062 7.33268 4.39648 7.63116 4.39648 7.99935C4.39648 8.36754 4.7062 8.66602 5.08826 8.66602H13.3895C13.7716 8.66602 14.0813 8.36754 14.0813 7.99935C14.0813 7.63116 13.7716 7.33268 13.3895 7.33268H5.08826Z"
          fill="#C2D24B"
        />
        <path
          d="M8.74851 11.5279C8.47836 11.7883 8.47836 12.2104 8.74851 12.4708C9.01866 12.7311 9.45667 12.7311 9.72682 12.4708L13.8775 8.47075C14.1394 8.21837 14.1485 7.81198 13.8982 7.54887L10.0935 3.54887C9.83533 3.27746 9.39774 3.25912 9.11611 3.50791C8.83447 3.75671 8.81545 4.17842 9.07361 4.44983L12.4308 7.9793L8.74851 11.5279Z"
          fill="#C2D24B"
        />
      </svg>
    </Link>
  );
};

export default Index;
