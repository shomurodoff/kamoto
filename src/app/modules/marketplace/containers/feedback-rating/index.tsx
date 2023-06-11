import React, { useState } from "react";
import Breadcrumb from "../../components/settings/breadcrumb";
import Tabs, { Tab } from "react-best-tabs";
import { useIntl } from "react-intl";

import Feedback from "../../components/feedback-rating/feedback";
import EmptyFeedback from "../../components/feedback-rating/empty-feedback";
import { InfoCard } from "../../../widgets/components/UI/InfoCard";
const Index = () => {
  const { formatMessage } = useIntl();

  return (
    <div className="overflow-scroll px-5 py-3">
      <Breadcrumb />
      <Tabs
        activeTab={1}
        className="font-size-13 mt-[16px]"
        ulClassName="text-muted  dark-border !justify-start mb-12"
        activityClassName="bg-primary !text-primary"
        children={[
          <Tab className={""} title={"All"}>
            <div className={""}>
              <div
                className={"grid grid-cols-12 md:gap-y-[20px] md:gap-x-[40px] "}
              >
                <div className={"col-span-12 md:col-span-7"}>
                  <Feedback />
                </div>
                <div className={"col-span-12 md:col-span-5"}>
                  <InfoCard
                    title={formatMessage({
                      id: "Understanding Feedbacks & Ratings",
                    })}
                    desc={formatMessage({
                      id:
                        "KamotoAI empowers AI personality owners and managers to create engaging social media-like posts. These posts serve as broadcasted messages from the AI personality, similar to tweets or Facebook posts. They are visible on the AI Personality's Public page within the Marketplace. \n" +
                        "<br/>" +
                        "<br/>" +
                        "The purpose of these posts is to increase user engagement, fostering connections and interactions between the AI personality and KamotoAI's user base. By creating compelling content, AI personality owners can effectively grow their audience, enhance user engagement, and ultimately boost their revenue potential within the platform. \n" +
                        "<br/>" +
                        "<br/>" +
                        "<br/>",
                    })}
                    slug={"#"}
                  />
                </div>
              </div>
            </div>
          </Tab>,
          <Tab title={"Read"}>
            <div
              className={"grid grid-cols-12 md:gap-y-[20px] md:gap-x-[40px] "}
            >
              <div className={"col-span-12 md:col-span-7 "}>
                <div
                  className={
                    "flex items-center justify-center h-full md:my-auto my-[150px]"
                  }
                >
                  <EmptyFeedback />
                </div>
              </div>
              <div className={"col-span-12 md:col-span-5"}>
                <InfoCard
                  title={formatMessage({
                    id: "Understanding Feedbacks & Ratings",
                  })}
                  desc={formatMessage({
                    id:
                      "KamotoAI empowers AI personality owners and managers to create engaging social media-like posts. These posts serve as broadcasted messages from the AI personality, similar to tweets or Facebook posts. They are visible on the AI Personality's Public page within the Marketplace. \n" +
                      "<br/>" +
                      "<br/>" +
                      "The purpose of these posts is to increase user engagement, fostering connections and interactions between the AI personality and KamotoAI's user base. By creating compelling content, AI personality owners can effectively grow their audience, enhance user engagement, and ultimately boost their revenue potential within the platform. \n" +
                      "<br/>" +
                      "<br/>" +
                      "<br/>",
                  })}
                  slug={"#"}
                />
              </div>
            </div>
          </Tab>,
          <Tab title={"Unread"}>
            <div
              className={"grid grid-cols-12 md:gap-y-[20px] md:gap-x-[40px] "}
            >
              <div
                className={"col-span-12 md:col-span-7 md:my-auto my-[150px]"}
              >
                <div className={"flex items-center justify-center h-full"}>
                  <EmptyFeedback />
                </div>
              </div>
              <div className={"col-span-12 md:col-span-5"}>
                <InfoCard
                  title={formatMessage({
                    id: "Understanding Feedbacks & Ratings",
                  })}
                  desc={formatMessage({
                    id:
                      "KamotoAI empowers AI personality owners and managers to create engaging social media-like posts. These posts serve as broadcasted messages from the AI personality, similar to tweets or Facebook posts. They are visible on the AI Personality's Public page within the Marketplace. \n" +
                      "<br/>" +
                      "<br/>" +
                      "The purpose of these posts is to increase user engagement, fostering connections and interactions between the AI personality and KamotoAI's user base. By creating compelling content, AI personality owners can effectively grow their audience, enhance user engagement, and ultimately boost their revenue potential within the platform. \n" +
                      "<br/>" +
                      "<br/>" +
                      "<br/>",
                  })}
                  slug={"#"}
                />
              </div>
            </div>
          </Tab>,
        ]}
      />
    </div>
  );
};

export default Index;
