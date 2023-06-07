import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import threeDots from "../../../../_metronic/assets/images/svg/investor/threeDots.svg";
import {
  getSingleInvestor,
  AllInvestorUser,
  getActiveRound,
  getAddToCRMData,
  getAllInvestments,
  AddToFavorite,
} from "../core/_requests";
import { toast } from "react-toastify";
import { DisplayImage } from "../../widgets/components/General/DisplayImage";
import { useInvestorDatabase } from "../core/InvestorContext";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../auth";
import { Toaster } from "../../widgets/components/General/Toaster";
import { useDateFormat } from "../../../hooks/useDateFormat";
import { DateTime } from "luxon";
import { AddInvestorInvestmentsModal } from "../components/AddInvestorInvestmentsModal";
import { AddInvestorUserModal } from "./AddInvestorUserModal";
import { OverviewModal } from "../components/OverviewModal";
import { GeneralDetailsModal } from "../components/GeneralDetailsModal";
import { ErrorReportModal } from "./ErrorReportModal";
import TwitterHandleModal from "../components/TwitterHandleModal";
import InvestmentThesisModal from "../components/InvestmentThesisModal";
import { useShortScale } from "../../../hooks/useShortScale";
import { Spinner } from "../../widgets/components/General/Spinner";

export const IndividualInvestorDetails = () => {
  const { formatMessage } = useIntl();
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [sortByUser, setSortByUser] = useState("");
  const [sortOrderUser, setSortOrderUser] = useState("");
  const [isAnnouncedDateSorted, setIsAnnouncedDateSorted] = useState(false);
  const [isOrganisationNameSorted, setIsOrganisationNameSorted] =
    useState(false);
  const [isLeadInvestorsSorted, setIsLeadInvestorsSorted] = useState(false);
  const [isFundingRoundSorted, setIsFundingRoundSorted] = useState(false);
  const [isMoneyRaisedSorted, setIsMoneyRaisedSorted] = useState(false);
  const [isDesignation, setIsDesignation] = useState(false);
  const [individualInvestor, setIndividualInvestor] = useState<any>([]);
  const [searchInvestorUser, setSearchInvestorUser] = useState("");
  const [showAllUser, setShowAllUser] = useState(false);
  const [investorUserData, setInvestorUserData] = useState<any>([]);
  const [showAllInvestments, setShowAllInvestments] = useState(false);
  const [investorInvestmentData, setInvestorInvestmentsData] = useState<any>(
    []
  );
  const { setCompanyName, storeInvestorId } = useInvestorDatabase();
  const [investments, setInvestments] = useState<any>([]);
  const [allInvestorUser, setAllInvestorUser] = useState<any>([]);
  const [roundId, setRoundId] = useState<number>();
  const [, setColumnId] = useState<number>();
  const { companyId } = useAuth();
  const [, setColumnsLength] = useState();
  const { getDateValue } = useDateFormat();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingAddToCRM, setLoadingAddToCRM] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [userModalShow, setUserModalShow] = React.useState(false);
  const [overviewModalShow, setOverviewModalShow] = React.useState(false);
  const [generalDetailsModalShow, setGeneralDetailsModalShow] =
    React.useState(false);

  const [showInvestorKebabMenu, setShowInvestorKebabMenu] = useState(false);
  const [showInvestorUserKebabMenu, setShowInvestorUserKebabMenu] =
    useState(false);
  const [reportErrorModalShow, setReportErrorModalShow] = useState(false);
  const [investorUserId, setInvestorUserId] = useState<number>();
  const [twitterHandleModalShow, setTwitterHandleModalShow] = useState(false);
  const [investmentThesisModalShow, setInvestmentThesisModalShow] =
    useState(false);
  const { convertValueToShortScale } = useShortScale();

  const [refreshKey, setRefreshKey] = useState(0);

  const singleInvestor = async () => {
    try {
      const {
        data: { success, data, errors },
      } = await getSingleInvestor(Number(id));
      if (success) {
        setIndividualInvestor(data);
        setCompanyName(data.name);
        storeInvestorId(id);
        setColumnId(data?.columns[0]?.columnId);
        setColumnsLength(data?.columns.length);
        setRefreshKey((prevKey) => prevKey + 1);
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
    singleInvestor();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const getAllInvestorUser = async () => {
    try {
      const {
        data: { data, success, errors },
      } = await AllInvestorUser(
        Number(id),
        searchInvestorUser,
        sortOrderUser,
        sortByUser
      );
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
    getAllInvestorUser();
  }, [searchInvestorUser, sortByUser, sortOrderUser]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (roundId && individualInvestor?.investorId) {
      const isPresent = individualInvestor.columns?.find(
        (column: any) => column.roundId === roundId
      );
      setIsAdded(!!isPresent);
      setLoading(false);
    }
  }, [roundId, individualInvestor]);

  useEffect(() => {
    const activeRound = async () => {
      try {
        const {
          data: { data, success, errors },
        } = await getActiveRound(Number(companyId));
        if (success) {
          setRoundId(data?.roundId);
        } else {
          errors.forEach((error: string) => {
            toast.error(formatMessage({ id: error }));
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    activeRound();
  }, [companyId]); // eslint-disable-line react-hooks/exhaustive-deps

  const addToCRM = async () => {
    try {
      setLoadingAddToCRM(true);
      const {
        data: { success, errors },
      } = await getAddToCRMData({
        roundId: roundId,
        investorId: Number(id),
        isFavourite: false,
      });
      if (success) {
        await singleInvestor();
        toast.success(
          formatMessage({ id: "Investor added to CRM in current round" })
        );
      } else {
        errors.forEach((error: string) => {
          toast.error(formatMessage({ id: error }));
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingAddToCRM(false);
    }
  };

  // const addToFavorite = async () => {
  //   try {
  //     setLoading(true)
  //     const {
  //       data: {success, errors},
  //     } = await AddInvestorToFavorite({
  //       investorId: Number(id),
  //       columnId: columnId,
  //       isFavourite: true,
  //       roundId: roundId,
  //     })
  //     if (success) {
  //       setLoading(false)
  //       toast.success(formatMessage({id: 'Investor added to Favorite'}))
  //     } else {
  //       errors.forEach((error: string) => {
  //         toast.error(formatMessage({id: error}))
  //       })
  //       setLoading(false)
  //     }
  //   } catch (err) {
  //     setLoading(false)
  //     console.log(err)
  //   }
  // }

  const addToFavorite_InvestorUser = async (
    investorUserId: number,
    isFavourite: boolean
  ) => {
    try {
      const {
        data: { success, errors },
      } = await AddToFavorite({
        investorUserId: Number(investorUserId),
        isFavourite: isFavourite,
        roundId: roundId,
      });
      if (success) {
        getAllInvestorUser();
      } else {
        errors.forEach((error: string) => {
          toast.error(formatMessage({ id: error }));
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getInvestments = async () => {
    try {
      const {
        data: { data, success, errors },
      } = await getAllInvestments(Number(id), sortOrder, sortBy);
      if (success) {
        setInvestments(data);
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
    getInvestments();
  }, [id, sortOrder, sortBy]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (allInvestorUser) {
      const displayInvestorUserData = showAllUser
        ? allInvestorUser
        : allInvestorUser.slice(0, 4);
      setInvestorUserData(displayInvestorUserData);
    }
  }, [showAllUser, allInvestorUser]);

  useEffect(() => {
    if (investments) {
      const displayInvestorInvestmentsData = showAllInvestments
        ? investments
        : investments.slice(0, 4);
      setInvestorInvestmentsData(displayInvestorInvestmentsData);
    }
  }, [investments, showAllInvestments]);

  return (
    <>
      {loading ? <Spinner /> : null}
      <Toaster />
      <div className="profile-container py-5 px-5 w-100">
        <div className="card w-100 p-5 p-md-7 d-flex flex-md-row flex-column justify-content-between">
          <div className="col-md-8 col-12 ">
            <div className="d-flex gap-4">
              <DisplayImage
                imgName={individualInvestor?.file?.name}
                width="60px"
                height={60}
                alt="investor logo"
                fit="contain"
              />
              <div className="w-100">
                <div className="d-flex gap-3">
                  <h2>
                    {individualInvestor?.name ? individualInvestor?.name : "NA"}
                  </h2>
                  <span className="badge badge-light-primary button-radius">
                    Popular
                  </span>
                </div>
                <div className="pe-4 pt-2">
                  <p>
                    {individualInvestor?.description
                      ? individualInvestor?.description
                      : "NA"}
                  </p>
                </div>
              </div>
            </div>
            <div className="d-flex flex-md-row flex-column">
              <div
                className={`d-flex gap-2 pt-2 col-3 mt-md-0 mt-5 ${
                  !individualInvestor.linkedin_url &&
                  !individualInvestor?.twitter_url &&
                  !individualInvestor?.facebook_url &&
                  !individualInvestor?.insta_url &&
                  "d-none"
                }`}
              >
                {individualInvestor?.linkedin_url && (
                  <a
                    href={individualInvestor.linkedin_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={toAbsoluteUrl("/media/icons/investor/LinkedIn.svg")}
                      height={20}
                      alt="LinkedIn"
                    />
                  </a>
                )}
                {individualInvestor?.twitter_url && (
                  <a
                    href={individualInvestor.twitter_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={toAbsoluteUrl("/media/icons/investor/Twitter.svg")}
                      height={20}
                      alt="Twitter"
                    />
                  </a>
                )}
                {individualInvestor?.facebook_url && (
                  <a
                    href={individualInvestor.facebook_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={toAbsoluteUrl("/media/icons/investor/Facebook.svg")}
                      height={20}
                      alt="Facebook"
                    />
                  </a>
                )}
                {individualInvestor?.insta_url && (
                  <a
                    href={individualInvestor.insta_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={toAbsoluteUrl("/media/icons/investor/Instagram.svg")}
                      height={20}
                      alt="Instagram"
                    />
                  </a>
                )}
              </div>
              <div className="d-flex gap-md-15 gap-5 mt-md-0 mt-5">
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={toAbsoluteUrl("/media/icons/investor/websiteLogo.svg")}
                    alt=""
                  />
                  <div>
                    {individualInvestor?.website
                      ? individualInvestor?.website
                      : "NA"}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={toAbsoluteUrl("/media/icons/investor/Location.svg")}
                    alt="location"
                  />
                  <div>
                    {individualInvestor?.country?.country_name
                      ? individualInvestor?.country?.country_name
                      : "NA"}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={toAbsoluteUrl("/media/icons/investor/people.svg")}
                    alt=""
                  />
                  <div>{allInvestorUser?.length}</div>
                </div>
              </div>
            </div>
          </div>
          {roundId && individualInvestor?.investorId && !loading && (
            <div className="d-flex gap-3 h-25 mt-md-0 mt-5">
              {isAdded ? (
                <button
                  className="btn btn-bg-primary text-white font-weight-400 font-size-13 height-36 d-flex align-items-center"
                  disabled={true}
                >
                  {formatMessage({ id: "Added" })}
                </button>
              ) : (
                <button
                  className="btn btn-bg-primary text-white font-weight-400 font-size-13 height-36 d-flex align-items-center "
                  disabled={loadingAddToCRM}
                  onClick={addToCRM}
                >
                  {loadingAddToCRM ? (
                    <span className="indicator-label font-size-13 p-0">
                      {formatMessage({ id: "Please wait..." })}
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  ) : (
                    formatMessage({ id: "Add to CRM" })
                  )}
                </button>
              )}

              {/* {columnsLength!>0 && 
              <button
              className='btn btn-bg-light font-weight-400 font-size-13 height-36 d-flex align-items-center'
              onClick={addToFavorite}
            >
              {!loading && (
                <span className='indicator-label font-size-13 p-0'>
                  {formatMessage({id: 'Add to favorite'})}
                </span>
              )}
              {loading && (
                <span className='indicator-label font-size-13 p-0'>
                  {formatMessage({id: 'Please wait...'})}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
            } */}
              <button
                className="btn btn-light py-0"
                onClick={() => setGeneralDetailsModalShow(true)}
              >
                {formatMessage({ id: "Edit" })}
              </button>

              <button
                className="btn btn-light height-36 width-36 p-0"
                onClick={() => {
                  setInvestorUserId(undefined);
                  setShowInvestorKebabMenu(!showInvestorKebabMenu);
                }}
              >
                <img src={threeDots} alt="" />
              </button>

              {showInvestorKebabMenu && (
                <div
                  className="card w-150px shadow-sm rounded kebab-menu-dropdown-container cursor-pointer z-index-1"
                  onMouseLeave={() => setShowInvestorKebabMenu(false)}
                >
                  <div
                    className="border-bottom border-gray-300 border-bottom-2 px-4 py-3 dropdown-items text-center"
                    onClick={() => {
                      setReportErrorModalShow(true);
                    }}
                  >
                    <button
                      type="button"
                      className="m-0 border-0 bg-transparent text-dark"
                    >
                      {formatMessage({ id: "Report error" })}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <GeneralDetailsModal
          setGeneralDetailsModalShow={setGeneralDetailsModalShow}
          generalDetailsModalShow={generalDetailsModalShow}
          individualInvestor={individualInvestor}
          singleInvestor={singleInvestor}
        />
        {/* Overview */}
        <div className="card w-100 p-5 p-md-7 mt-6">
          <div className="d-flex justify-content-between">
            <div className="w-100 d-flex justify-content-between align-items-center align-self-center">
              <p className="fs-4 fw-bold m-0 ">
                {formatMessage({ id: "Overview" })}
              </p>
              <button
                className="btn btn-light py-2"
                onClick={() => setOverviewModalShow(true)}
              >
                {formatMessage({ id: "Edit" })}
              </button>
            </div>
          </div>
          <div className="mt-5 mb-7 d-flex col-md-12 col-12 w-md-75 w-100 flex-wrap">
            <div className="">
              <div className="font-size-12 text-muted">
                {formatMessage({ id: "Value Add from investor" })}
              </div>
              <div className="font-size-13">
                {individualInvestor?.value_add
                  ? individualInvestor?.value_add
                  : "-"}
              </div>
            </div>
          </div>
          <div className="d-flex col-md-12 col-12 w-md-85 w-100 flex-wrap">
            <div className="col-md-3 col-6 d-flex flex-column align-items-start mb-7">
              <div className="col-8">
                <div className="font-size-12 text-muted">
                  {formatMessage({ id: "Investor Type" })}
                </div>
                <div className="font-size-13">
                  {individualInvestor?.fund_type
                    ? JSON.parse(individualInvestor.fund_type).join(", ")
                    : "-"}
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6 d-flex flex-column align-items-md-center align-items-start mb-7">
              <div className="col-8 ">
                <div className="font-size-12 text-muted ">
                  {formatMessage({ id: "Fund Size/AUM" })}
                </div>
                <div className="font-size-13">
                  {individualInvestor?.fund_size
                    ? `$${convertValueToShortScale(
                        Math.ceil(individualInvestor.fund_size)
                      )}`
                    : "-"}
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6 d-flex flex-column align-items-md-center align-items-start mb-7">
              <div className="col-md-8">
                <div className="font-size-12 text-muted">
                  {formatMessage({ id: "Investments" })}
                </div>
                <div className="font-size-13">
                  {individualInvestor.investment_count
                    ? individualInvestor.investment_count
                    : "-"}
                </div>
              </div>
            </div>
          </div>
          <div className="mb-2 d-flex col-md-12 col-12 w-md-85 w-100 flex-wrap">
            <div className="col-md-3 col-6 d-flex flex-column align-items-start">
              <div className="col-md-8">
                <div className="font-size-12 text-muted">
                  {formatMessage({ id: "Founder(s)" })}
                </div>
                <div className="font-size-13">
                  {individualInvestor?.founders
                    ? individualInvestor?.founders
                    : "-"}
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6 d-flex flex-column align-items-md-center align-items-start">
              <div className="col-md-8">
                <div className="font-size-12 text-muted">
                  {formatMessage({ id: "Investment Team Size" })}
                </div>
                <div className="font-size-13">
                  {individualInvestor?.investorTeamSize}
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6 d-flex flex-column align-items-md-center align-items-start mt-3 mt-md-0">
              <div className="col-md-8">
                <div className="font-size-12 text-muted">
                  {formatMessage({ id: "Exits" })}
                </div>
                <div className="font-size-13">
                  {individualInvestor?.exits ? individualInvestor.exits : "-"}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 mb-2 d-flex col-md-12 col-12 w-md-75 w-100 flex-wrap">
            <div className="w-100 ">
              <div className="font-size-12 text-muted">
                {formatMessage({ id: "Locations(s)" })}
              </div>
              <div className="d-flex flex-wrap gap-3">
                {individualInvestor?.investorLocations &&
                  individualInvestor?.investorLocations.map((location: any) => (
                    <span className="font-size-13">{location?.name},</span>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <OverviewModal
          setOverviewModalShow={setOverviewModalShow}
          overviewModalShow={overviewModalShow}
          individualInvestor={individualInvestor}
          singleInvestor={singleInvestor}
        />
        {/* Investment Thesis */}
        <div className="card w-100 p-5 p-md-7 mt-6">
          <div className="d-flex justify-content-between">
            <div className="w-100 d-flex  justify-content-between align-self-center align-items-center">
              <p className="fs-4 fw-bold m-0">
                {formatMessage({ id: "Investment Thesis" })}
              </p>
              <button
                className="btn btn-light py-2"
                onClick={() => setInvestmentThesisModalShow(true)}
              >
                {formatMessage({ id: "Edit" })}
              </button>
            </div>
          </div>
          <div className="mt-5 mb-7 d-flex col-md-12 col-12 w-md-75 w-100 flex-wrap">
            <div>
              <div className="font-size-12 text-muted">
                {formatMessage({ id: "Funding Requirements" })}
              </div>
              <div className="font-size-13">
                {individualInvestor?.funding_requirement
                  ? individualInvestor?.funding_requirement
                  : "-"}
              </div>
            </div>
          </div>
          <div className="d-flex col-md-12 col-12 w-md-85 w-100 flex-wrap">
            <div className="col-md-3 col-6 d-flex flex-column align-items-start mb-7">
              <div className="col-8">
                <div className="font-size-12 text-muted">
                  {formatMessage({ id: "Stage Focus" })}
                </div>
                <div className="d-flex gap-1 flex-wrap lh-1">
                  {individualInvestor?.stageFocuses &&
                    individualInvestor?.stageFocuses.map((stageFocus: any) => (
                      <span className="font-size-13">{stageFocus.name},</span>
                    ))}
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6 d-flex flex-column align-items-md-center align-items-start mb-7">
              <div className="col-8 ">
                <div className="font-size-12 text-muted ">
                  {formatMessage({ id: "Investment Range" })}
                </div>
                <div className="font-size-13">
                  {individualInvestor?.investment_range
                    ? `$${convertValueToShortScale(
                        individualInvestor?.investment_range.split("-")[0]
                      )} - $${convertValueToShortScale(
                        individualInvestor?.investment_range.split("-")[1]
                      )}`
                    : "-"}
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6 d-flex flex-column align-items-md-center align-items-start mb-7">
              <div className="col-md-8">
                <div className="font-size-12 text-muted">
                  {formatMessage({ id: "Sweet Spot" })}
                </div>
                <div className="font-size-13">
                  {individualInvestor?.sweet_spot
                    ? `$${convertValueToShortScale(
                        JSON.parse(individualInvestor?.sweet_spot)[0]
                      )}- $${convertValueToShortScale(
                        JSON.parse(individualInvestor?.sweet_spot)[1]
                      )}`
                    : "-"}
                </div>
              </div>
            </div>
          </div>
          <div className="mb-10 d-flex col-md-12 col-12 w-md-75 w-100 flex-wrap industry-focus-container">
            <div className="">
              <div className="font-size-12 text-muted">
                {formatMessage({ id: "Target Sector(s)" })}
              </div>
              <div className="d-flex w-100 mt-3 flex-wrap gap-3">
                {individualInvestor?.investorFocusAreas &&
                  individualInvestor.investorFocusAreas.map(
                    (focusArea: any) => (
                      <div className="card-container border  px-7 py-3  rounded-pill mb-md-0 mb-5 font-size-13 font-weight-500">
                        <div className="">{focusArea.name}</div>
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
          <div className="mb-2 d-flex col-md-12 col-12 w-md-75 w-100 flex-wrap industry-focus-container">
            <div className="">
              <div className="font-size-12 text-muted">
                {formatMessage({ id: "Target Geography" })}
              </div>
              <div className="d-flex w-100 mt-3 flex-wrap gap-3">
                {individualInvestor?.investorGeographies &&
                  individualInvestor.investorGeographies.map(
                    (geographies: any) => (
                      <div className="card-container border  px-7 py-3  rounded-pill mb-md-2 mb-5 font-size-13 font-weight-500">
                        <div className="">{geographies.name}</div>
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
        </div>
        <InvestmentThesisModal
          setInvestmentThesisModalShow={setInvestmentThesisModalShow}
          investmentThesisModalShow={investmentThesisModalShow}
          individualInvestor={individualInvestor}
          singleInvestor={singleInvestor}
        />
        {/*People */}
        <div className="card p-7 mt-6">
          <div className="d-flex justify-content-between">
            <div className="d-flex align-self-center">
              <p className="fs-4 fw-bold m-0 ">
                {formatMessage({ id: "People" })}
              </p>
            </div>
            <div className="d-flex gap-3">
              <button
                className="btn btn-light py-3"
                onClick={() => setUserModalShow(true)}
              >
                {formatMessage({ id: "Add Contact" })}
              </button>
              {allInvestorUser && allInvestorUser?.length > 4 && !showAllUser && (
                <button
                  className="btn btn-primary font-size-13 font-weight-400"
                  onClick={() => setShowAllUser(true)}
                >
                  {formatMessage({ id: "View All" })}
                </button>
              )}
            </div>
          </div>
          <div className="fw-bold text-muted   col-12 d-flex font-size-13 w-100 pb-3 border-bottom mt-3 cursor-pointer">
            <div
              className="card bg-clrf5f8 d-flex flex-row justify-content-between col-md-3 col-10 h-40px align-items-center border border-gray-300 rounded-0 rounded-start bg-clrF5 tabs-investordb "
              onClick={() => {
                setIsDesignation(!isDesignation);
                setSortByUser("designation");
                isDesignation
                  ? setSortOrderUser("ASC")
                  : setSortOrderUser("DESC");
              }}
            >
              <div className="font-size-13 fw-semibold ms-7">
                {formatMessage({ id: "Designation" })}
              </div>
              <div className="me-3">
                {isDesignation ? (
                  <img
                    src={toAbsoluteUrl("/media/icons/investor/UpArrow.svg")}
                    alt="up arrow"
                  />
                ) : (
                  <img
                    src={toAbsoluteUrl("/media/icons/investor/DownArrow.svg")}
                    alt="Down arrow"
                  />
                )}
              </div>
            </div>
            <div className="position-relative w-100 search-container ">
              <div className="search-icon">
                <img
                  src={toAbsoluteUrl("/media/icons/investor/search.svg")}
                  alt="search icon"
                />
              </div>
              <input
                type="search"
                className="w-100 h-40px  border border-gray-300 rounded-end  ps-12 d-md-block d-none font-size-13 tabs-investordb text_clr56"
                id="placeholder_text_color"
                placeholder="Search Investors "
                onChange={(e) => setSearchInvestorUser(e.target.value)}
              />
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-row-bordered align-middle gs-1 gy-3 mt-0">
              <tbody>
                {investorUserData &&
                  investorUserData?.map((user: any) => (
                    <tr key={user.investorUserId}>
                      <td>
                        <div className="text-dark  font-size-13 w-100px w-md-50">
                          <span
                            onClick={() => {
                              navigate(
                                `/investor-database/profile/${user.investorUserId}`,
                                {
                                  state: id,
                                }
                              );
                            }}
                            className="cursor-pointer"
                          >
                            {user.name ? user.name : "-"}
                          </span>
                          {user?.linkedin_url && (
                            <span className="ms-2">
                              <a
                                href={user?.linkedin_url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src={toAbsoluteUrl(
                                    "/media/icons/duotune/social/linkedin.svg"
                                  )}
                                  width="16px"
                                  height="16px"
                                  alt="linkedin icon"
                                />
                              </a>
                            </span>
                          )}
                          {isAdded ? (
                            user?.rounds.length > 0 ? (
                              <img
                                src={toAbsoluteUrl(
                                  "/media/icons/investor/isFavourite.svg"
                                )}
                                width="16px"
                                height="16px"
                                alt="favourite icon"
                                className="ms-2 cursor-pointer"
                                onClick={() => {
                                  addToFavorite_InvestorUser(
                                    user?.investorUserId,
                                    false
                                  );
                                }}
                              />
                            ) : (
                              <img
                                src={toAbsoluteUrl(
                                  "/media/icons/investor/notIsFavourite.svg"
                                )}
                                width="16px"
                                height="16px"
                                alt="favourite icon"
                                className="ms-2 cursor-pointer"
                                onClick={() => {
                                  addToFavorite_InvestorUser(
                                    user?.investorUserId,
                                    true
                                  );
                                }}
                              />
                            )
                          ) : (
                            ""
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="text-dark w-100px  font-size-13">
                          {user.designation ? user.designation : "-"}
                        </div>
                      </td>
                      <td>
                        <div className="text-dark font-size-13">
                          {user.email ? (
                            <a
                              href={`mailto:${user.email}`}
                              className="text-primary"
                            >
                              {user.email}
                            </a>
                          ) : (
                            "-"
                          )}
                        </div>
                      </td>
                      <td className="text-left text-end position-relative ">
                        <button
                          className="btn btn-light height-36 width-36 p-0"
                          onClick={() => {
                            setInvestorUserId(user.investorUserId);
                            setShowInvestorUserKebabMenu(
                              !showInvestorUserKebabMenu
                            );
                          }}
                        >
                          <img
                            src={toAbsoluteUrl(
                              "/media/icons/investor/threeDots.svg"
                            )}
                            alt=""
                          />
                        </button>
                        {showInvestorUserKebabMenu &&
                          investorUserId === user.investorUserId && (
                            <div
                              className="card w-150px shadow-sm rounded kebab-menu-dropdown-container cursor-pointer text-center"
                              onMouseLeave={() =>
                                setShowInvestorUserKebabMenu(false)
                              }
                            >
                              <div
                                className="border-bottom border-gray-300 border-bottom-2 px-4 py-3 dropdown-items"
                                onClick={() => {
                                  setReportErrorModalShow(true);
                                }}
                              >
                                <button
                                  type="button"
                                  className="m-0 border-0 bg-transparent text-dark"
                                >
                                  {formatMessage({ id: "Report error" })}
                                </button>
                              </div>
                            </div>
                          )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <AddInvestorUserModal
          userModalShow={userModalShow}
          setUserModalShow={setUserModalShow}
          id={id}
          getAllInvestorUser={getAllInvestorUser}
        />
        {/* Investments/Portfolio */}
        <div className="card p-7 mt-6">
          <div className="d-flex flex-md-row flex-column justify-content-between">
            <div className="d-flex align-self-md-center mb-md-0 mb-2">
              <p className="fs-4 fw-bold m-0">
                {formatMessage({ id: "Investments/Portfolio" })}
              </p>
            </div>
            <div className="d-flex gap-3">
              <button
                className="btn btn-light py-3"
                onClick={() => setModalShow(true)}
              >
                {formatMessage({ id: "Add Investment" })}
              </button>
              {investments && investments?.length > 4 && !showAllInvestments && (
                <button
                  className="btn btn-primary font-size-13 font-weight-400"
                  onClick={() => setShowAllInvestments(true)}
                >
                  {formatMessage({ id: "View All" })}
                </button>
              )}
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-row-bordered align-middle gs-1 gy-3 mt-0">
              <thead className="font-size-13">
                <tr className="fw-bold text-muted border-bottom-0 ">
                  <th className="min-w-200px table-header ">
                    <div
                      className="border border-gray-300  p-3 rounded-1 d-flex justify-content-between cursor-pointer"
                      onClick={() => {
                        setIsAnnouncedDateSorted(!isAnnouncedDateSorted);
                        setSortBy("createdAt");
                        isAnnouncedDateSorted
                          ? setSortOrder("ASC")
                          : setSortOrder("DESC");
                      }}
                    >
                      <span className="font-size-13 fw-semibold text_clr56">
                        <img
                          src={toAbsoluteUrl(
                            "/media/icons/investor/FilterSymbol.svg"
                          )}
                          alt=""
                        />
                        {formatMessage({ id: "Announced Date" })}
                      </span>
                      <span>
                        {isAnnouncedDateSorted ? (
                          <img
                            src={toAbsoluteUrl(
                              "/media/icons/investor/UpArrow.svg"
                            )}
                            alt=""
                          />
                        ) : (
                          <img
                            src={toAbsoluteUrl(
                              "/media/icons/investor/DownArrow.svg"
                            )}
                            alt=""
                          />
                        )}
                      </span>
                    </div>
                  </th>
                  <th className="min-w-200px table-header ">
                    <div
                      className="border border-gray-300 p-3  rounded-1 d-flex justify-content-between cursor-pointer"
                      onClick={() => {
                        setIsOrganisationNameSorted(!isOrganisationNameSorted);
                        setSortBy("organization_name");
                        isOrganisationNameSorted
                          ? setSortOrder("ASC")
                          : setSortOrder("DESC");
                      }}
                    >
                      <span className="font-size-13 fw-semibold text_clr56">
                        {formatMessage({ id: "Organisation Name" })}
                      </span>
                      <span>
                        {isOrganisationNameSorted ? (
                          <img
                            src={toAbsoluteUrl(
                              "/media/icons/investor/UpArrow.svg"
                            )}
                            alt=""
                          />
                        ) : (
                          <img
                            src={toAbsoluteUrl(
                              "/media/icons/investor/DownArrow.svg"
                            )}
                            alt=""
                          />
                        )}
                      </span>
                    </div>
                  </th>
                  <th className="min-w-200px table-header ">
                    <div
                      className="border border-gray-300 p-3  rounded-1 d-flex justify-content-between cursor-pointer"
                      onClick={() => {
                        setIsLeadInvestorsSorted(!isLeadInvestorsSorted);
                        setSortBy("lead_investor");
                        isLeadInvestorsSorted
                          ? setSortOrder("ASC")
                          : setSortOrder("DESC");
                      }}
                    >
                      <span className="font-size-13 fw-semibold text_clr56">
                        {formatMessage({ id: "Lead Investors" })}
                      </span>
                      <span>
                        {isLeadInvestorsSorted ? (
                          <img
                            src={toAbsoluteUrl(
                              "/media/icons/investor/UpArrow.svg"
                            )}
                            alt=""
                          />
                        ) : (
                          <img
                            src={toAbsoluteUrl(
                              "/media/icons/investor/DownArrow.svg"
                            )}
                            alt=""
                          />
                        )}
                      </span>
                    </div>
                  </th>
                  <th className="min-w-200px table-header ">
                    <div
                      className="border border-gray-300 p-3  rounded-1 d-flex justify-content-between cursor-pointer"
                      onClick={() => {
                        setIsFundingRoundSorted(!isFundingRoundSorted);
                        setSortBy("funding_round");
                        isFundingRoundSorted
                          ? setSortOrder("ASC")
                          : setSortOrder("DESC");
                      }}
                    >
                      <span className="font-size-13 fw-semibold text_clr56">
                        {formatMessage({ id: "Funding round" })}
                      </span>
                      <span>
                        {isFundingRoundSorted ? (
                          <img
                            src={toAbsoluteUrl(
                              "/media/icons/investor/UpArrow.svg"
                            )}
                            alt=""
                          />
                        ) : (
                          <img
                            src={toAbsoluteUrl(
                              "/media/icons/investor/DownArrow.svg"
                            )}
                            alt=""
                          />
                        )}
                      </span>
                    </div>
                  </th>
                  <th className="min-w-200px table-header ">
                    <div
                      className="border border-gray-300 p-3  rounded-1 d-flex justify-content-between cursor-pointer"
                      onClick={() => {
                        setIsMoneyRaisedSorted(!isMoneyRaisedSorted);
                        setSortBy("money_raised");
                        isMoneyRaisedSorted
                          ? setSortOrder("ASC")
                          : setSortOrder("DESC");
                      }}
                    >
                      <span className="font-size-13 fw-semibold text_clr56">
                        {formatMessage({ id: "Money Raised" })}
                      </span>
                      <span>
                        {isMoneyRaisedSorted ? (
                          <img
                            src={toAbsoluteUrl(
                              "/media/icons/investor/UpArrow.svg"
                            )}
                            alt=""
                          />
                        ) : (
                          <img
                            src={toAbsoluteUrl(
                              "/media/icons/investor/DownArrow.svg"
                            )}
                            alt=""
                          />
                        )}
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {investorInvestmentData &&
                  investorInvestmentData?.map((investment: any) => (
                    <tr className="fw-normal" key={investment.investmentId}>
                      <td className="ps-8">
                        <div className="table-body font-size-12 form-label">
                          {investment?.announced_date
                            ? getDateValue(
                                new Date(investment?.announced_date)
                                  .toISOString()
                                  ?.toString()
                              )
                              ? getDateValue(
                                  new Date(investment?.announced_date)
                                    .toISOString()
                                    ?.toString()
                                )
                              : DateTime.fromISO(
                                  new Date(investment?.announced_date)
                                    .toISOString()
                                    ?.toString()
                                ).toLocaleString(DateTime.DATE_MED)
                            : "-"}
                        </div>
                      </td>
                      <td className="ps-8 form-label">
                        <div className="d-block mb-1 table-body">
                          <span>
                            <DisplayImage
                              imgName={investment?.file?.name}
                              width={16}
                              alt="profile"
                              fit="contain"
                              height={16}
                            />
                          </span>
                          <span className="ps-3 font-size-12 form-label">
                            {investment?.organization_name
                              ? investment.organization_name
                              : "-"}
                          </span>
                        </div>
                      </td>
                      <td className="ps-8">
                        <div className="d-block mb-1 table-body font-size-12 form-label">
                          {investment?.lead_investor
                            ? investment.lead_investor
                            : "-"}
                        </div>
                      </td>
                      <td className="ps-8">
                        <div className="d-block mb-1 table-body">
                          <span>
                            <DisplayImage
                              imgName={investment?.file?.name}
                              width={16}
                              alt="profile"
                              fit="contain"
                              height={16}
                            />
                          </span>
                          <span className="ps-3 font-size-12 form-label">
                            {investment?.funding_round
                              ? investment.funding_round
                              : "-"}
                          </span>
                        </div>
                      </td>
                      <td className="table-body ps-8 font-size-12 form-label">
                        {investment?.money_raised
                          ? `$ ${convertValueToShortScale(
                              investment.money_raised
                            )}`
                          : "-"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <AddInvestorInvestmentsModal
          setModalShow={setModalShow}
          modalShow={modalShow}
          getInvestments={getInvestments}
        />
        {/* Twitter feeds */}
        <div className="card p-7 mt-6">
          <div className="d-md-flex justify-content-md-between">
            <div className="w-100 d-flex justify-content-between align-self-center mb-3 mb-md-0 align-items-center">
              <p className="fs-4 fw-bold m-0 ">
                {formatMessage({ id: "Twitter feed" })}
              </p>
              <button
                className="btn btn-primary font-size-13 font-weight-400"
                onClick={() => setTwitterHandleModalShow(true)}
              >
                {formatMessage({ id: "Update Twitter Handle" })}
              </button>
            </div>
          </div>
          {individualInvestor?.twitter_url && (
            <div className="d-flex flex-column align-items-center overflow-hidden mt-5">
              <div className="w-75 overflow-hidden" key={refreshKey}>
                <TwitterTimelineEmbed
                  sourceType="url"
                  url={individualInvestor?.twitter_url}
                  options={{ height: 400 }}
                />
              </div>
            </div>
          )}
        </div>
        <TwitterHandleModal
          setTwitterHandleModalShow={setTwitterHandleModalShow}
          twitterHandleModalShow={twitterHandleModalShow}
          singleInvestor={singleInvestor}
          individualInvestor={individualInvestor}
        />
      </div>
      <ErrorReportModal
        reportErrorModalShow={reportErrorModalShow}
        setReportErrorModalShow={setReportErrorModalShow}
        investorId={+id!}
        investorUserId={investorUserId}
        setInvestorUserId={setInvestorUserId}
      />
    </>
  );
};
