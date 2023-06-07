import React, { useState } from "react";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { useIntl } from "react-intl";
import { DisplayImage } from "../../widgets/components/General/DisplayImage";
import { BasicButton } from "../../widgets/components/UI/BasicButton";
import { AddNewActivityModal } from "../views/AddNewActivityModal";
import { AddInvestorUserModal } from "../../investor-database/view/AddInvestorUserModal";

export const Contacts = ({
  investorUsers,
  investorId,
  getInvestor,
  getActivity,
}: {
  investorUsers: [];
  investorId: number;
  getInvestor: () => void;
  getActivity: () => void;
}) => {
  const { formatMessage } = useIntl();
  const [activityModalShow, setActivityModalShow] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <div className="contacts-container flex-wrap gap-3 mb-10">
        <div className="card bg-transparent p-0 card-sm-grow">
          <div className="bg-white p-5 rounded d-flex flex-column align-items-center justify-content-between card-height">
            <div>
              <img
                src={toAbsoluteUrl(
                  "/media/icons/investor/user_icon_with_background.svg"
                )}
                alt="User icon"
              />
            </div>
            <div className="w-100">
              <BasicButton
                onClick={() => setModalShow(true)}
                buttonText={formatMessage({ id: "Add New Contact Person" })}
                border="none"
                color="#4776E6"
                textColor="#FFFFFF"
                padding="8px 36px"
                width="100"
              />
            </div>
          </div>
        </div>
        {investorUsers?.map((contact: any, index) => (
          <div
            className={`'card bg-transparent p-0 card-sm-grow `}
            key={contact.investorUserId}
          >
            <div className="bg-white d-flex flex-column justify-content-between p-5 rounded card-height ">
              <div className="d-flex ">
                <div className="me-4">
                  <DisplayImage
                    imgName={contact?.file?.name}
                    alt="User icon"
                    height="76px"
                    width="76px"
                    fit="contain"
                  />
                </div>
                <div className="d-flex flex-column text-color-dark-mode">
                  <p className="font-size-16 fw-bold mb-1 dark_text_color">
                    {contact.name}
                  </p>
                  <p className="font-size-12 fw-semibold mb-1 dark_text_color">
                    {contact.designation}
                  </p>
                  <p className="font-size-13 text-muted text-break dark_text_color">
                    {contact.email}
                  </p>
                </div>
              </div>
              <div>
                <BasicButton
                  buttonText={formatMessage({ id: "Add Activity" })}
                  border="none"
                  color="#4776E6"
                  textColor="#FFFFFF"
                  padding="8px 67px"
                  width="100"
                  onClick={() => setActivityModalShow(true)}
                />
                {/* <button className='btn btn-primary btn-active-primary button-container fs-6 py-2 fw-normal'>
                {formatMessage({id: 'Add Activity'})}
              </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <AddNewActivityModal
        modalShow={activityModalShow}
        setModalShow={setActivityModalShow}
        investorId={investorId}
        getActivity={getActivity}
      />
      <AddInvestorUserModal
        userModalShow={modalShow}
        setUserModalShow={setModalShow}
        id={investorId?.toString()}
        getInvestor={getInvestor}
      />
    </>
  );
};
