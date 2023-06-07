import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import Tabs, { Tab } from "react-best-tabs";
import { getAllUsers } from "../core/_requests";
import { CreateAllActivity } from "../components/CreateAllActivity";
import { useAuth } from "../../auth";
import { getAllInvestor } from "../../investor-database/core/_requests";

export const AddNewActivityModal = ({
  modalShow,
  setModalShow,
  investorId,
  getActivity,
}: {
  modalShow: boolean;
  setModalShow: Dispatch<SetStateAction<boolean>>;
  investorId?: number;
  getActivity?: () => void;
}) => {
  const { formatMessage } = useIntl();
  const [key, setKey] = useState(1);
  const [allInvestors, setAllInvestors] = useState<any>();
  const [allUsers, setAllUsers] = useState<any>();
  const { companyId } = useAuth();

  useEffect(() => {
    const getInvestors = async () => {
      try {
        const {
          data: {
            success,
            data: { data: allApiInvestors },
          },
        } = await getAllInvestor("", "", "", "", companyId);
        if (success) {
          let investors: any = [];
          investors = allApiInvestors?.map((investor: any) => {
            return {
              id: investor.investorId,
              name: investor.name,
              value: investor.investorId,
            };
          });
          if (investors.length > 0) {
            setAllInvestors(investors);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getInvestors();
  }, [companyId]);

  useEffect(() => {
    const getAllUser = async () => {
      if (companyId) {
        const {
          data: { data: values, success },
        } = await getAllUsers(companyId);
        if (success) {
          let users: any = [];
          users = values.map((user: any) => {
            return {
              id: user.userId,
              name: `${user?.firstName} ${user?.lastName}`,
              value: user.userId,
            };
          });
          if (users.length > 0) {
            setAllUsers(users);
          }
        }
      }
    };
    getAllUser();
  }, [companyId]);
  return (
    <Modal
      size="xl"
      show={modalShow}
      onHide={() => setModalShow(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <div className="fs-4 fw-bold">
          <h2>{formatMessage({ id: "Add new activity" })}</h2>
        </div>
      </Modal.Header>
      <Modal.Body className="py-3">
        <div className="pb-4">
          <Tabs
            activeTab={key}
            className=""
            ulClassName="text-muted dark-border"
            activityClassName="bg-primary"
            onClick={(event, tab) => setKey(tab)}
          >
            <Tab title="Email" className="mr-3">
              <CreateAllActivity
                setModalShow={setModalShow}
                allInvestors={allInvestors}
                allUsers={allUsers}
                type="email"
                companyId={companyId!}
                investorId={investorId}
                getActivity={getActivity}
              />
            </Tab>
            <Tab title="Call" className="mr-3">
              <CreateAllActivity
                setModalShow={setModalShow}
                allInvestors={allInvestors}
                allUsers={allUsers}
                type="call"
                companyId={companyId!}
                investorId={investorId}
                getActivity={getActivity}
              />
            </Tab>
            <Tab title="Meeting" className="mr-3">
              <CreateAllActivity
                setModalShow={setModalShow}
                allInvestors={allInvestors}
                allUsers={allUsers}
                type="meeting"
                companyId={companyId!}
                investorId={investorId}
                getActivity={getActivity}
              />
            </Tab>
            <Tab title="Tasks" className="mr-3">
              <CreateAllActivity
                setModalShow={setModalShow}
                allInvestors={allInvestors}
                allUsers={allUsers}
                type="tasks"
                companyId={companyId!}
                investorId={investorId}
                getActivity={getActivity}
              />
            </Tab>
            <Tab title="Notes" className="mr-3">
              <CreateAllActivity
                setModalShow={setModalShow}
                allInvestors={allInvestors}
                allUsers={allUsers}
                type="notes"
                companyId={companyId!}
                investorId={investorId}
                getActivity={getActivity}
              />
            </Tab>
            <Tab title="Documents" className="mr-3">
              <CreateAllActivity
                setModalShow={setModalShow}
                allInvestors={allInvestors}
                allUsers={allUsers}
                type="documents"
                companyId={companyId!}
                investorId={investorId}
                getActivity={getActivity}
              />
            </Tab>
          </Tabs>
        </div>
      </Modal.Body>
    </Modal>
  );
};
