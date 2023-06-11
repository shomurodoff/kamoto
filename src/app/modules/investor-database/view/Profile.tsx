import React, { useEffect, useState } from "react";
import { DisplayImage } from "../../widgets/components/General/DisplayImage";
import threeDots from "../../../../_metronic/assets/images/svg/investor/threeDots.svg";
import { useIntl } from "react-intl";
import {
  getActiveRound,
  getAddToCRMData,
  // AddToFavorite,
  getSingleInvestorUser,
  getSingleInvestor,
} from "../core/_requests";
import { toast } from "react-toastify";
import { Toaster } from "../../widgets/components/General/Toaster";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { InvestorUser } from "../core/_models";
import { useLocation, useParams } from "react-router-dom";
import { useInvestorDatabase } from "../core/InvestorContext";
import { useAuth } from "../../auth";
const Profile = () => {
  const [imgName, setImgName] = useState<string | undefined>()
  const [, setModelStatus] = useState<boolean>(false)
  const {formatMessage} = useIntl()
  const [investorUser, setInvestorUser] = useState<InvestorUser>()
  const [industry, setIndustry] = useState<any>([])
  const [roundId, setRoundId] = useState<number>()
  const [, setColumnId] = useState<number>()
  const {personalityId} = useAuth()
  const {setinvestorUser} = useInvestorDatabase()
  const {id} = useParams()
  const {state: investorId} = useLocation()
  const handleOpen = () => {
    setModelStatus(true);
  };
  const SingleInvestorUser = async () => {
    try {
      const {
        data: { data, success, errors },
      } = await getSingleInvestorUser(Number(id));
      if (success) {
        setInvestorUser(data);
        setinvestorUser(data.name);
        setIndustry(data.investor.allIndustries);
        setImgName(data.file.name);
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
    SingleInvestorUser();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const singleInvestor = async () => {
    try {
      const {
        data: { success, data, errors },
      } = await getSingleInvestor(Number(investorId));
      if (success) {
        setColumnId(data?.columns[0]?.columnId);
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
    if (investorId) {
      singleInvestor();
    }
  }, [investorId]); // eslint-disable-line react-hooks/exhaustive-deps
  const activeRound = async () => {
    try {
      const {
        data: {data, success, errors},
      } = await getActiveRound(personalityId)
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
  useEffect(() => {
    activeRound()
  }, [personalityId]) // eslint-disable-line react-hooks/exhaustive-deps

  // const addToFavorite = async () => {
  //   try {
  //     const {
  //       data: {success, errors},
  //     } = await AddToFavorite({
  //       roundId: roundId,
  //       isFavourite: false,
  //       investorUserId: Number(id),
  //       columnId: columnId,
  //     })
  //     if (success) {
  //       toast.success(formatMessage({id: 'Investor added to Favorite'}))
  //     } else {
  //       errors.forEach((error: string) => {
  //         toast.error(formatMessage({id: error}))
  //       })
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  const addToCRM = async () => {
    try {
      const {
        data: { success, errors },
      } = await getAddToCRMData({
        roundId: roundId,
        investorId: Number(investorId),
        isFavourite: false,
      });
      if (success) {
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
    }
  };
  return (
    <>
      <Toaster />
      <div className="d-flex flex-column gap-5">
        <div className="card p-9 d-flex flex-column gap-5">
          <div className="d-flex justify-content-between profile-top">
            <div className="d-flex flex-column gap-5">
              <div className="d-flex gap-5">
                <div>
                  <div
                    className={`position-relative d-flex justify-content-center ${
                      imgName ? "card-name" : "img-card"
                    }`}
                    onClick={handleOpen}
                  >
                    <DisplayImage
                      imgName={imgName}
                      height="100px"
                      width="100px"
                      alt="profile"
                    />
                  </div>
                </div>
                <div>
                  <h2>{investorUser?.name && investorUser?.name}</h2>
                  <p className="font-size-13">
                    {investorUser?.designation && investorUser?.designation}
                  </p>
                  {/* <div className='d-flex gap-3 align-item-center'>
                  <div>
                    <img src={Location} alt='' />
                  </div>
                  <p className='font-size-13 fw-semibold'>California,USA</p>
                </div> */}
                </div>
              </div>
              <div className="d-flex gap-2  pt-2 col-3">
                {investorUser?.investor.linkedin_url && (
                  <a
                    href={investorUser?.investor.linkedin_url}
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
                {investorUser?.investor.twitter_url && (
                  <a
                    href={investorUser?.investor.twitter_url}
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
                {investorUser?.investor.facebook_url && (
                  <a
                    href={investorUser?.investor.facebook_url}
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
                {investorUser?.investor.insta_url && (
                  <a
                    href={investorUser?.investor.insta_url}
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
            </div>
            <div className="d-flex gap-3 h-25">
              <button
                className="btn btn-bg-primary text-white font-size-13 height-36 d-flex align-items-center"
                onClick={addToCRM}
              >
                {formatMessage({ id: "Add to CRM" })}
              </button>
              {/* <button
                className='btn btn-bg-light font-size-13 height-36 d-flex align-items-center'
                onClick={addToFavorite}
              >
                {formatMessage({id: 'Add to Favorite'})}
              </button> */}
              <button className="btn btn-light height-36 d-flex align-items-center">
                <img src={threeDots} alt="" />
              </button>
            </div>
          </div>
        </div>
        <div className="card p-9">
          <h4>{formatMessage({ id: "Highlights" })}</h4>
          <div className="highlights mt-4">
            <div>
              <p className="font-size-12">
                {formatMessage({ id: "Investor Type" })}
              </p>
              <p>
                {investorUser?.investor?.fund_type
                  ? JSON.parse(investorUser?.investor?.fund_type).join(", ")
                  : "-"}
              </p>
            </div>
            <div>
              <p className="font-size-12">
                {formatMessage({ id: "Fund Size/AUM" })}
              </p>
              <p>
                {investorUser?.investor?.fund_size
                  ? investorUser?.investor?.fund_size
                  : "-"}
              </p>
            </div>
            <div>
              <p className="font-size-12">
                {formatMessage({ id: "Sweet Spot" })}
              </p>
              <p>
                {investorUser?.investor?.sweet_spot
                  ? investorUser?.investor?.sweet_spot
                  : "-"}
              </p>
            </div>
            <div>
              <p className="font-size-12">
                {formatMessage({ id: "Investments" })}
              </p>
              <p>
                {" "}
                {investorUser?.investor?.investments
                  ? investorUser?.investor?.investments.length
                  : "-"}
              </p>
            </div>
            <div>
              <p className="font-size-12">
                {formatMessage({ id: "Stage Focus" })}
              </p>
              <p>
                {investorUser?.investor?.stage_focus
                  ? investorUser?.investor?.stage_focus
                  : "-"}
              </p>
            </div>
            <div>
              <p className="font-size-12">
                {formatMessage({ id: "Investment Range" })}
              </p>
              <p>
                {investorUser?.investor?.investment_range
                  ? investorUser?.investor?.investment_range
                  : "-"}
              </p>
            </div>
            <div>
              <p className="font-size-12">{formatMessage({ id: "Exits" })}</p>
              <p>
                {" "}
                {investorUser?.investor?.exits
                  ? investorUser.investor.exits
                  : "-"}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-9 industry-focus-container">
          <h4>{formatMessage({ id: "Industry Focus" })}</h4>
          <div className="mt-4 d-flex gap-4 industry-focus">
            {industry &&
              industry.map((industry: any) => (
                <div
                  className="card-container border  px-7 py-3  rounded-pill me-5 mb-md-0 mb-5"
                  key={industry.industryId}
                >
                  <div className="font-size-13">
                    {industry?.industryName && industry.industryName}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
