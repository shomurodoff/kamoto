import { useIntl } from "react-intl";
import Tabs, { Tab } from "react-best-tabs";
import "react-best-tabs/dist/index.css";
import { Activites } from "./Activites";
import { Contacts } from "./Contacts";
import { Update } from "./Update";
import { Profile } from "./Profile";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { useEffect, useState } from "react";
import { InvestorModel } from "../../investor-database/core/_models";
import { AddNewActivityModal } from "../views/AddNewActivityModal";
import { Filter } from "../../widgets/components/General/Filter";
import { AddInvestorUserModal } from "../../investor-database/view/AddInvestorUserModal";
import { activityModel } from "../core/_models";
import { useAuth } from "../../auth";
import { getAllActivities } from "../core/_requests";
import { AllInvestorUser } from "../../investor-database/core/_requests";
import { toast } from "react-toastify";

export const InvestorNavBar = ({
  investor,
  getInvestor,
}: {
  investor: InvestorModel;
  getInvestor: () => void;
}) => {
  const {formatMessage} = useIntl()
  const {personalityId} = useAuth()
  const [selectedSideBar, setSelectedSideBar] = useState(1)
  const [activityModalShow, setActivityModalShow] = useState(false)
  const [key, setKey] = useState(1)
  const [allActivities, setAllActivities] = useState<[activityModel]>()
  const [activitySearch, setActivitySearch] = useState<string>('')
  const [modalShow, setModalShow] = useState(false)
  const [isActivityFilter, setIsActivityFilter] = useState<boolean>(false)
  const [sort_by_activity, set_sort_by_activity] = useState<string | undefined>(undefined)
  const [sort_order_activty, set_sort_order_activty] = useState<string | undefined>(undefined)
  const [allInvestorUser, setAllInvestorUser] = useState<any>([])

  const onhandleChange = (event: any) => {
    setActivitySearch(event.target.value);
  };
  const [filterActivity, setFilterActivity] = useState<string | undefined>(
    undefined
  );

  const getActivity = async () => {
    let type: string = "all";
    if (selectedSideBar === 2) {
      type = "upcoming";
    }
    if (selectedSideBar === 3) {
      type = "past";
    }
    if (personalityId && investor?.investorId) {
      const {
        data: { data: values, success },
      } = await getAllActivities(
        personalityId,
        investor?.investorId,
        type,
        activitySearch,
        filterActivity,
        sort_by_activity,
        sort_order_activty
      );
      if (success) {
        setAllActivities(values);
      }
    }
  };

  useEffect(() => {
    getActivity(); // eslint-disable-next-line
  }, [
    personalityId,
    investor?.investorId,
    selectedSideBar,
    activitySearch,
    filterActivity,
    sort_by_activity,
    sort_order_activty,
  ]);

  const getAllInvestorUser = async () => {
    try {
      const {
        data: { data, success, errors },
      } = await AllInvestorUser(Number(investor?.investorId));
      if (success) {
        setAllInvestorUser(data);
      } else {
        errors.forEach((error: string) => {
          toast.error(formatMessage({ id: error }));
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (investor?.investorId) {
      getAllInvestorUser();
    }
  }, [investor?.investorId, getInvestor]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <Filter
        isActivityFilter={isActivityFilter}
        set_sort_by_activity={set_sort_by_activity}
        set_sort_order_activty={set_sort_order_activty}
        setFilterActivity={setFilterActivity}
        setIsActivityFilter={setIsActivityFilter}
      />
      <div className="positon-relative mt-3 ">
        <div className="d-flex  align-items-center gap-md-4 mb-3 mt-md-0 mt-5 tabs-right-container z-index-1">
          <div className="d-flex align-items-center  gap-3">
            {key === 1 ? (
              <button
                onClick={() => setIsActivityFilter(true)}
                className="btn btn-sm btn-flex fw-bold bg-body btn-color-gray-700 btn-active-color-primary h-75 cursor-pointer"
                id="fc-toogle"
                title="Sort and Filter"
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                data-bs-dismiss="click"
                data-bs-trigger="hover"
              >
                <span className="svg-icon svg-icon-6 svg-icon-muted me-1">
                  <img
                    src={toAbsoluteUrl("/media/icons/investor/filterIcon.svg")}
                    alt="filter icon"
                  />
                </span>
                <p className="d-md-block d-none m-0">Filter</p>
              </button>
            ) : (
              ""
            )}

            {key === 1 && (
              <div className="d-flex  align-items-center position-md-relative h-30px ">
                <span className="svg-icon svg-icon-3 position-md-absolute ms-md-2 p-md-0 p-3">
                  <img
                    src={toAbsoluteUrl("/media/icons/investor/search.svg")}
                    alt="search icon"
                  />
                </span>

                <input
                  type="text"
                  className="d-md-block d-none form-control form-control-white form-control-sm w-200px ps-10"
                  placeholder="Search activity"
                  onChange={onhandleChange}
                />
              </div>
            )}
            <button className="btn btn-sm btn-flex fw-bold bg-body btn-color-white btn-active-color-primary h-50 p-md-2 px-3 py-1 me-md-0 me-3">
              <img
                src={toAbsoluteUrl("/media/icons/investor/cloudIcon.svg")}
                alt="Cloud icon"
              />
            </button>
          </div>

          <div className="d-md-flex gap-3">
            {key === 2 ? (
              <button
                className={`btn btn-sm btn-primary w-md-150px  ms-md-0 ms-10 me-3 me-md-0`}
                onClick={() => setModalShow(true)}
              >
                {formatMessage({ id: "Add Contact" })}
              </button>
            ) : key === 4 ? (
              <button
                className={`btn btn-sm btn-primary w-md-150px  ms-md-0
               ms-5 me-3 me-md-0`}
              >
                <>
                  <span>
                    <img
                      src={toAbsoluteUrl("/media/icons/investor/lock.svg")}
                      className="w-md-20px h-md-20px w-15px h-15px"
                      alt="lock icon"
                    />
                  </span>{" "}
                  <span>{formatMessage({ id: "Add Activity" })}</span>
                </>
              </button>
            ) : (
              <button
                className={`btn btn-sm btn-primary w-md-150px  ms-md-0 ms-11 me-3 me-md-0`}
                onClick={() => setActivityModalShow(!activityModalShow)}
              >
                {formatMessage({ id: "Add Activity" })}
              </button>
            )}

            {/* <button className='btn btn-sm btn-icon btn-bg-white btn-active-color-primary'>
              <i className='bi bi-three-dots-vertical fs-3'></i>
            </button> */}
          </div>
        </div>
        <Tabs
          activeTab={1}
          className=""
          ulClassName="text-muted dark-border setting-tabs"
          activityClassName="bg-primary"
          onClick={(event, tab) => setKey(tab)}
        >
          <Tab title={formatMessage({ id: "Activity" })} className="mr-3 mt-2">
            <div className="mt-3">
              <Activites
                setSelectedSideBar={setSelectedSideBar}
                allActivities={allActivities}
                getActivity={getActivity}
                investorId={investor?.investorId}
              />
            </div>
          </Tab>
          <Tab title={formatMessage({ id: "Contact" })} className="mr-3 mt-2">
            <div className="mt-3">
              <Contacts
                investorUsers={allInvestorUser}
                investorId={investor?.investorId}
                getInvestor={getInvestor}
                getActivity={getActivity}
              />
            </div>
          </Tab>
          <Tab title={formatMessage({ id: "Update" })} className="mr-3 mt-2">
            <div className="mt-3">
              <Update />
            </div>
          </Tab>
          <Tab title={formatMessage({ id: "Profile" })} className="mr-3 mt-2">
            <div className="mt-3">
              <Profile individualInvestor={investor} />
            </div>
          </Tab>
        </Tabs>
        <AddNewActivityModal
          modalShow={activityModalShow}
          setModalShow={setActivityModalShow}
          investorId={investor?.investorId}
          getActivity={getActivity}
        />
        <AddInvestorUserModal
          userModalShow={modalShow}
          setUserModalShow={setModalShow}
          id={investor?.investorId?.toString()}
          getInvestor={getInvestor}
        />
      </div>
    </>
  );
};
