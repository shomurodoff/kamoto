import React, { Fragment } from "react";
import Card from "./components/card";
import Tabs, { Tab } from "react-best-tabs";
import Breadcrumb from "./components/breadcrumb";

const Index = () => {
  return (
    <Fragment>
      <Breadcrumb />
      <Tabs
        activeTab={0}
        className="font-size-13 mt-4"
        ulClassName="text-muted  dark-border !justify-start"
        activityClassName="bg-primary !text-primary"
        children={[
          <Tab title="Support">
            <div
              className={
                "mt-[9px] p-[16px] md:px-[52px] md:py-[30px] md:min-h-[50vh] bg-[#171825] shadow-default rounded"
              }
            >
              <div
                className={"grid grid-cols-12  gap-y-[16px] md:gap-x-[16px]"}
              >
                <div className={"col-span-12 md:col-span-6 xl:col-span-3"}>
                  <Card
                    title={"Help Center"}
                    canAccess={false}
                    description={
                      "One-stop solution for frequently asked questions and troubleshooting guides"
                    }
                    icon={
                      <svg
                        width="64"
                        height="64"
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.2163 9.01516C11.3791 7.85243 12.956 7.19922 14.6004 7.19922H51.8004C53.4447 7.19922 55.0217 7.85243 56.1844 9.01516C57.3472 10.1779 58.0004 11.7549 58.0004 13.3992V50.5992C58.0004 52.2436 57.3472 53.8206 56.1844 54.9833C55.0217 56.146 53.4447 56.7992 51.8004 56.7992H14.6004C12.956 56.7992 11.3791 56.146 10.2163 54.9833C9.0536 53.8206 8.40039 52.2436 8.40039 50.5992V13.3992C8.40039 11.7549 9.0536 10.1779 10.2163 9.01516ZM14.6004 12.1592C14.2715 12.1592 13.9561 12.2899 13.7236 12.5224C13.491 12.755 13.3604 13.0704 13.3604 13.3992V50.5992C13.3604 50.9281 13.491 51.2435 13.7236 51.476C13.9561 51.7086 14.2715 51.8392 14.6004 51.8392H51.8004C52.1293 51.8392 52.4446 51.7086 52.6772 51.476C52.9097 51.2435 53.0404 50.9281 53.0404 50.5992V13.3992C53.0404 13.0704 52.9097 12.755 52.6772 12.5224C52.4447 12.2899 52.1293 12.1592 51.8004 12.1592H14.6004Z"
                          fill="#C2D24B"
                          fillOpacity="0.65"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M27.5268 15.9543C29.281 15.2035 31.2112 15.0071 33.0735 15.3898C34.9357 15.7726 36.6462 16.7174 37.9888 18.1047C39.3314 19.4921 40.2457 21.2596 40.6161 23.1839C40.9865 25.1082 40.7964 27.1028 40.0698 28.9154C39.3432 30.7281 38.1128 32.2774 36.5341 33.3674C35.6322 33.9901 34.6398 34.447 33.6006 34.7242V37.5192C33.6006 38.8889 32.5261 39.9992 31.2006 39.9992C29.8751 39.9992 28.8006 38.8889 28.8006 37.5192V32.5592C28.8006 31.1896 29.8751 30.0792 31.2006 30.0792C32.1499 30.0792 33.078 29.7883 33.8673 29.2433C34.6567 28.6983 35.2719 27.9237 35.6352 27.0173C35.9985 26.111 36.0936 25.1137 35.9084 24.1516C35.7231 23.1894 35.266 22.3056 34.5947 21.612C33.9234 20.9183 33.0681 20.4459 32.137 20.2545C31.2059 20.0631 30.2408 20.1614 29.3637 20.5368C28.4866 20.9122 27.737 21.5479 27.2095 22.3636C26.6821 23.1793 26.4006 24.1382 26.4006 25.1192C26.4006 26.4889 25.3261 27.5992 24.0006 27.5992C22.6751 27.5992 21.6006 26.4889 21.6006 25.1192C21.6006 23.1572 22.1636 21.2393 23.2185 19.608C24.2733 17.9766 25.7727 16.7052 27.5268 15.9543Z"
                          fill="#C2D24B"
                          fillOpacity="0.65"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M31.2 48.7984C32.0487 48.7984 32.8626 48.4613 33.4627 47.8612C34.0629 47.2611 34.4 46.4471 34.4 45.5984C34.4 44.7497 34.0629 43.9358 33.4627 43.3357C32.8626 42.7356 32.0487 42.3984 31.2 42.3984C30.3513 42.3984 29.5374 42.7356 28.9373 43.3357C28.3371 43.9358 28 44.7497 28 45.5984C28 46.4471 28.3371 47.2611 28.9373 47.8612C29.5374 48.4613 30.3513 48.7984 31.2 48.7984Z"
                          fill="#C2D24B"
                          fillOpacity="0.65"
                        />
                      </svg>
                    }
                  />
                </div>
                <div className={"col-span-12 md:col-span-6 xl:col-span-3"}>
                  <Card
                    title={"Email Support"}
                    canAccess={true}
                    description={
                      "Convenient, detailed assistance for your queries right in your inbox"
                    }
                    icon={
                      <svg
                        width="64"
                        height="64"
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M56.0004 17C56.0004 14.25 53.7684 12 51.0404 12H11.3604C8.63239 12 6.40039 14.25 6.40039 17V47C6.40039 49.75 8.63239 52 11.3604 52H51.0404C53.7684 52 56.0004 49.75 56.0004 47V17ZM51.0404 17L31.2004 29.5L11.3604 17H51.0404ZM51.0404 47H11.3604V22L31.2004 34.5L51.0404 22V47Z"
                          fill="#C2D24B"
                          fillOpacity="0.65"
                        />
                      </svg>
                    }
                  />
                </div>
                <div className={"col-span-12 md:col-span-6 xl:col-span-3"}>
                  <Card
                    title={"Call Support"}
                    canAccess={true}
                    description={
                      "Immediate, real-time help from our dedicated customer service representatives"
                    }
                    icon={
                      <svg
                        width="64"
                        height="64"
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.8557 21.0322C14.0917 16.0002 17.6397 11.4802 23.0597 9.82423C24.0215 9.53016 25.0593 9.61387 25.9615 10.0583C26.8638 10.5027 27.5626 11.2745 27.9157 12.2162L29.6557 16.8562C29.9358 17.6027 29.9864 18.4158 29.8011 19.1913C29.6158 19.9667 29.203 20.6691 28.6157 21.2082L23.4397 25.9482C23.1845 26.1824 22.9944 26.4786 22.8879 26.8081C22.7813 27.1376 22.762 27.489 22.8317 27.8282L22.8797 28.0362L23.0037 28.5562C23.6474 31.0828 24.6282 33.5113 25.9197 35.7762C27.3265 38.183 29.0724 40.3748 31.1037 42.2842L31.2637 42.4282C31.5221 42.6576 31.8355 42.8161 32.1734 42.8883C32.5113 42.9605 32.8621 42.9439 33.1917 42.8402L39.8837 40.7322C40.6442 40.4934 41.4587 40.4873 42.2227 40.7147C42.9868 40.942 43.6654 41.3925 44.1717 42.0082L47.3397 45.8522C48.6597 47.4522 48.4997 49.8042 46.9837 51.2162C42.8357 55.0842 37.1317 55.8762 33.1637 52.6882C28.2998 48.7649 24.1995 43.9798 21.0677 38.5722C17.9104 33.1688 15.8055 27.218 14.8557 21.0322ZM27.0277 28.0922L31.3157 24.1562C32.491 23.0784 33.3174 21.6738 33.6887 20.1229C34.0601 18.572 33.9594 16.9455 33.3997 15.4522L31.6637 10.8122C30.953 8.91722 29.5466 7.36447 27.7309 6.47039C25.9153 5.5763 23.827 5.40816 21.8917 6.00023C15.1597 8.06023 9.75567 14.0962 10.8997 21.6362C11.6997 26.9002 13.5437 33.5962 17.6117 40.5882C20.9905 46.419 25.4135 51.5783 30.6597 55.8082C36.6117 60.5882 44.5557 58.9562 49.7157 54.1482C51.1921 52.7735 52.0883 50.8872 52.2214 48.8742C52.3544 46.8612 51.7143 44.8733 50.4317 43.3162L47.2637 39.4682C46.2502 38.2382 44.8925 37.3388 43.3645 36.8856C41.8365 36.4323 40.2079 36.4458 38.6877 36.9242L33.1317 38.6722C31.6972 37.1932 30.4406 35.5513 29.3877 33.7802C28.3706 31.9897 27.5779 30.0806 27.0277 28.0962V28.0922Z"
                          fill="#C2D24B"
                          fillOpacity="0.65"
                        />
                      </svg>
                    }
                  />
                </div>
              </div>
            </div>
          </Tab>,
        ]}
      />
    </Fragment>
  );
};

export default Index;
