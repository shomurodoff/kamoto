import React, { Dispatch, SetStateAction } from "react";
import "../styles/Investor.scss";
export type sidebarOptionsType = { id: number; slug: string; title: string };

const InvestorSidebar = ({
  sidebarOptions,
  setSelectedOption,
  selectedOption,
}: {
  sidebarOptions: any;
  setSelectedOption: Dispatch<SetStateAction<number>>;
  selectedOption: number;
}) => {
  return (
    <div className="sidebar-investor-db col-md-1">
      {sidebarOptions.map((sidebar: any, index: number) => (
        <div
          key={sidebar.id}
          className="text-muted text-active-primary d-md-flex d-none align-items-center cursor-pointer "
        >
          <div
            className={
              `nav-link text-active-primary py-3 ps-3 d-flex align-items-center` +
              (selectedOption === index + 1
                ? "  border-top-0 border border-bottom-0 border-right-0 border-left-3 border-primary text-primary border-5"
                : "")
            }
            onClick={() => setSelectedOption(index + 1)}
          >
            {sidebar.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export { InvestorSidebar };
