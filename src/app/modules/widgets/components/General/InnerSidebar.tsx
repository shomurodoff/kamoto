import React, { useState } from "react";
import "../styles/index.scss";
import { sidebarOptionsType } from "../../../../core/_models";
import Tabs, { Tab } from "react-best-tabs";

export const InnerSidebar = ({ sidebarOptions, selectOptionFunction }: any) => {
  const [selectedOption, setSelectedOption] = useState(1);
  return (
    <div className="sidebar-investor-db  col-md-1">
      {sidebarOptions.map(
        ({ id, title }: sidebarOptionsType, index: number) => (
          <div
            key={id}
            className="text-muted text-active-primary  d-md-flex d-none align-items-center cursor-pointer"
          >
            <div
              className={
                `nav-link text-active-primary py-3 ps-3 d-flex align-items-center  ` +
                (selectedOption === index + 1
                  ? "border-top-0 border border-bottom-0 border-right-0 border-left-3 border-primary text-primary "
                  : "")
              }
              onClick={() => {
                setSelectedOption(index + 1);
                selectOptionFunction(index + 1);
              }}
            >
              {title}
            </div>
          </div>
        )
      )}
      <Tabs
        activeTab={1}
        className="d-flex d-md-none justify-content-start"
        ulClassName="text-muted"
        activityClassName="bg-primary"
      >
        <Tab title={sidebarOptions[0].title} className="mr-3 mt-2">
          <div className="mt-3"></div>
        </Tab>
        <Tab title={sidebarOptions[1].title} className="mr-3 mt-2">
          <div className="mt-3"></div>
        </Tab>
        <Tab title={sidebarOptions[2].title} className="mr-3 mt-2">
          <div className="mt-3"></div>
        </Tab>
      </Tabs>
    </div>
  );
};
