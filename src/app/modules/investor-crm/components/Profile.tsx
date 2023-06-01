import React, {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {TwitterTimelineEmbed} from 'react-twitter-embed'
import {useNavigate} from 'react-router-dom'
import {InvestorModel} from '../../investor-database/core/_models'
import {AllInvestorUser, getAllInvestments} from '../../investor-database/core/_requests'
import {toast} from 'react-toastify'

import {DisplayImage} from '../../widgets/components/General/DisplayImage'
import {useDateFormat} from '../../../hooks/useDateFormat'
import {DateTime} from 'luxon'
import {useShortScale} from '../../../hooks/useShortScale'

export const Profile = ({individualInvestor}: {individualInvestor: InvestorModel}) => {
  const {formatMessage} = useIntl()
  const [sortBy, setSortBy] = useState('')
  const [sortOrder, setSortOrder] = useState('')
  const [sortByUser, setSortByUser] = useState('')
  const [sortOrderUser, setSortOrderUser] = useState('')
  const [isAnnouncedDateSorted, setIsAnnouncedDateSorted] = useState(false)
  const [isOrganisationNameSorted, setIsOrganisationNameSorted] = useState(false)
  const [isLeadInvestorsSorted, setIsLeadInvestorsSorted] = useState(false)
  const [isFundingRoundSorted, setIsFundingRoundSorted] = useState(false)
  const [isMoneyRaisedSorted, setIsMoneyRaisedSorted] = useState(false)
  const [isDesignation, setIsDesignation] = useState(false)
  const [searchInvestorUser, setSearchInvestorUser] = useState('')
  const [showAllUser, setShowAllUser] = useState(false)
  const [investorUserData, setInvestorUserData] = useState<any>([])
  const [showAllInvestments, setShowAllInvestments] = useState(false)
  const [investorInvestmentData, setInvestorInvestmentsData] = useState<any>([])
  const [investments, setInvestments] = useState<any>([])
  const [allInvestorUser, setAllInvestorUser] = useState<any>([])
  const {getDateValue} = useDateFormat()
  const navigate = useNavigate()
  const {convertValueToShortScale} = useShortScale()

  const getAllInvestorUser = async () => {
    try {
      if (individualInvestor?.investorId) {
        const {
          data: {data, success, errors},
        } = await AllInvestorUser(
          individualInvestor?.investorId,
          searchInvestorUser,
          sortOrderUser,
          sortByUser
        )
        if (success) {
          setAllInvestorUser(data)
        } else {
          errors.forEach((error: string) => {
            toast.error(formatMessage({id: error}))
          })
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllInvestorUser()
  }, [searchInvestorUser, individualInvestor?.investorId, sortByUser, sortOrderUser]) // eslint-disable-line react-hooks/exhaustive-deps

  const getInvestments = async () => {
    try {
      const {
        data: {data, success, errors},
      } = await getAllInvestments(individualInvestor?.investorId, sortOrder, sortBy)
      if (success) {
        setInvestments(data)
      } else {
        errors.forEach((error: string) => {
          toast.error(formatMessage({id: error}))
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (individualInvestor?.investorId) {
      getInvestments()
    }
  }, [individualInvestor?.investorId, sortOrder, sortBy]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (allInvestorUser) {
      const displayInvestorUserData = showAllUser ? allInvestorUser : allInvestorUser.slice(0, 4)
      setInvestorUserData(displayInvestorUserData)
    }
  }, [showAllUser, individualInvestor?.investorUsers, allInvestorUser])

  useEffect(() => {
    if (investments) {
      const displayInvestorInvestmentsData = showAllInvestments
        ? investments
        : investments.slice(0, 4)
      setInvestorInvestmentsData(displayInvestorInvestmentsData)
    }
  }, [showAllInvestments, investments, investorInvestmentData]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className='profile-container py-5 w-100'>
        {/* Overview */}
        <div className='card w-100 p-5 p-md-7 mt-6'>
          <div className='d-flex justify-content-between'>
            <div className='w-100 d-flex justify-content-between align-items-center align-self-center'>
              <p className='fs-4 fw-bold m-0 '>{formatMessage({id: 'Overview'})}</p>
            </div>
          </div>
          <div className='mt-5 mb-7 d-flex col-md-12 col-12 w-md-75 w-100 flex-wrap'>
            <div className=''>
              <div className='font-size-12 text-muted'>
                {formatMessage({id: 'Value Add from investor'})}
              </div>
              <div className='font-size-13'>
                {individualInvestor?.value_add ? individualInvestor?.value_add : '-'}
              </div>
            </div>
          </div>
          <div className='d-flex col-md-12 col-12 w-md-85 w-100 flex-wrap'>
            <div className='col-md-3 col-6 d-flex flex-column align-items-start mb-7'>
              <div className='col-8'>
                <div className='font-size-12 text-muted'>
                  {formatMessage({id: 'Investor Type'})}
                </div>
                <div className='font-size-13'>
                  {individualInvestor?.fund_type
                    ? JSON.parse(individualInvestor?.fund_type).join(', ')
                    : '-'}
                </div>
              </div>
            </div>
            <div className='col-md-3 col-6 d-flex flex-column align-items-md-center align-items-start mb-7'>
              <div className='col-8 '>
                <div className='font-size-12 text-muted '>
                  {formatMessage({id: 'Fund Size/AUM'})}
                </div>
                <div className='font-size-13'>
                  {individualInvestor?.fund_size
                    ? `$${convertValueToShortScale(Math.ceil(individualInvestor?.fund_size))}`
                    : '-'}
                </div>
              </div>
            </div>
            <div className='col-md-3 col-6 d-flex flex-column align-items-md-center align-items-start mb-7'>
              <div className='col-md-8'>
                <div className='font-size-12 text-muted'>{formatMessage({id: 'Investments'})}</div>
                <div className='font-size-13'>
                  {individualInvestor?.investment_count
                    ? individualInvestor?.investment_count
                    : '-'}
                </div>
              </div>
            </div>
          </div>
          <div className='mb-2 d-flex col-md-12 col-12 w-md-85 w-100 flex-wrap'>
            <div className='col-md-3 col-6 d-flex flex-column align-items-start'>
              <div className='col-md-8'>
                <div className='font-size-12 text-muted'>{formatMessage({id: 'Founder(s)'})}</div>
                <div className='font-size-13'>
                  {individualInvestor?.founders ? individualInvestor?.founders : '-'}
                </div>
              </div>
            </div>
            <div className='col-md-3 col-6 d-flex flex-column align-items-md-center align-items-start'>
              <div className='col-md-8'>
                <div className='font-size-12 text-muted'>
                  {formatMessage({id: 'Investment Team Size'})}
                </div>
                <div className='font-size-13'>{individualInvestor?.investorTeamSize}</div>
              </div>
            </div>
            <div className='col-md-3 col-6 d-flex flex-column align-items-md-center align-items-start mt-3 mt-md-0'>
              <div className='col-md-8'>
                <div className='font-size-12 text-muted'>{formatMessage({id: 'Exits'})}</div>
                <div className='font-size-13'>
                  {individualInvestor?.exits ? individualInvestor.exits : '-'}
                </div>
              </div>
            </div>
          </div>
          <div className='mt-5 mb-2 d-flex col-md-12 col-12 w-md-75 w-100 flex-wrap'>
            <div className='w-100 '>
              <div className='font-size-12 text-muted'>{formatMessage({id: 'Locations(s)'})}</div>
              <div className='d-flex flex-wrap gap-3'>
                {individualInvestor?.investorLocations &&
                  individualInvestor?.investorLocations.map((location: any) => (
                    <span className='font-size-13'>{location?.name},</span>
                  ))}
              </div>
            </div>
          </div>
        </div>
        {/*Investment Thesis  */}
        <div className='card w-100 p-5 p-md-7 mt-6'>
          <div className='d-flex justify-content-between'>
            <div className='w-100 d-flex  justify-content-between align-self-center align-items-center'>
              <p className='fs-4 fw-bold m-0'>{formatMessage({id: 'Investment Thesis'})}</p>
            </div>
          </div>
          <div className='mt-5 mb-7 d-flex col-md-12 col-12 w-md-75 w-100 flex-wrap'>
            <div>
              <div className='font-size-12 text-muted'>
                {formatMessage({id: 'Funding Requirements'})}
              </div>
              <div className='font-size-13'>
                {individualInvestor?.funding_requirement
                  ? individualInvestor?.funding_requirement
                  : '-'}
              </div>
            </div>
          </div>
          <div className='d-flex col-md-12 col-12 w-md-85 w-100 flex-wrap'>
            <div className='col-md-3 col-6 d-flex flex-column align-items-start mb-7'>
              <div className='col-8'>
                <div className='font-size-12 text-muted'>{formatMessage({id: 'Stage Focus'})}</div>
                <div className='d-flex gap-1 flex-wrap lh-1'>
                  {individualInvestor?.stageFocuses &&
                    individualInvestor?.stageFocuses.map((stageFocus: any) => (
                      <span className='font-size-13'>{stageFocus.name},</span>
                    ))}
                </div>
              </div>
            </div>
            <div className='col-md-3 col-6 d-flex flex-column align-items-md-center align-items-start mb-7'>
              <div className='col-8 '>
                <div className='font-size-12 text-muted '>
                  {formatMessage({id: 'Investment Range'})}
                </div>
                <div className='font-size-13'>
                  {individualInvestor?.investment_range
                    ? `$${convertValueToShortScale(
                        individualInvestor?.investment_range.split('-')[0]
                      )} - $${convertValueToShortScale(
                        individualInvestor?.investment_range.split('-')[1]
                      )}`
                    : '-'}
                </div>
              </div>
            </div>
            <div className='col-md-3 col-6 d-flex flex-column align-items-md-center align-items-start mb-7'>
              <div className='col-md-8'>
                <div className='font-size-12 text-muted'>{formatMessage({id: 'Sweet Spot'})}</div>
                <div className='font-size-13'>
                  {individualInvestor?.sweet_spot
                    ? `$${convertValueToShortScale(
                        JSON.parse(individualInvestor?.sweet_spot)[0]
                      )}- $${convertValueToShortScale(
                        JSON.parse(individualInvestor?.sweet_spot)[1]
                      )}`
                    : '-'}
                </div>
              </div>
            </div>
          </div>
          <div className='mb-10 d-flex col-md-12 col-12 w-md-75 w-100 flex-wrap industry-focus-container'>
            <div className=''>
              <div className='font-size-12 text-muted'>
                {formatMessage({id: 'Target Sector(s)'})}
              </div>
              <div className='d-flex w-100 mt-3 flex-wrap gap-3'>
                {individualInvestor?.investorFocusAreas &&
                  individualInvestor.investorFocusAreas.map((focusArea: any) => (
                    <div className='card-container border  px-7 py-3  rounded-pill mb-md-0 mb-5 font-size-13 font-weight-500'>
                      <div className=''>{focusArea.name}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className='mb-2 d-flex col-md-12 col-12 w-md-75 w-100 flex-wrap industry-focus-container'>
            <div className=''>
              <div className='font-size-12 text-muted'>
                {formatMessage({id: 'Target Geography'})}
              </div>
              <div className='d-flex w-100 mt-3 flex-wrap gap-3'>
                {individualInvestor?.investorGeographies &&
                  individualInvestor.investorGeographies.map((geographies: any) => (
                    <div className='card-container border  px-7 py-3  rounded-pill mb-md-2 mb-5 font-size-13 font-weight-500'>
                      <div className=''>{geographies.name}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className='card p-7 mt-6'>
          <div className='d-flex justify-content-between'>
            <div className='d-flex align-self-center'>
              <p className='fs-4 fw-bold m-0 '>{formatMessage({id: 'People'})}</p>
            </div>
            {individualInvestor && allInvestorUser?.length > 4 && !showAllUser && (
              <button
                className='btn btn-primary font-size-13 font-weight-400'
                onClick={() => setShowAllUser(true)}
              >
                {formatMessage({id: 'View All'})}
              </button>
            )}
          </div>
          <div className='fw-bold text-muted   col-12 d-flex font-size-13 w-100 pb-3 border-bottom mt-3 cursor-pointer'>
            <div
              className='card bg-clrf5f8 d-flex flex-row justify-content-between col-md-3 col-10 h-40px align-items-center border border-gray-300 rounded-0 rounded-start bg-clrF5 tabs-investordb'
              onClick={() => {
                setIsDesignation(!isDesignation)
                setSortByUser('designation')
                isDesignation ? setSortOrderUser('ASC') : setSortOrderUser('DESC')
              }}
            >
              <div className='font-size-13 fw-semibold ms-7'>
                {formatMessage({id: 'Designation'})}
              </div>
              <div className='me-3'>
                {isDesignation ? (
                  <img src={toAbsoluteUrl('/media/icons/investor/UpArrow.svg')} alt='up arrow' />
                ) : (
                  <img
                    src={toAbsoluteUrl('/media/icons/investor/DownArrow.svg')}
                    alt='Down arrow'
                  />
                )}
              </div>
            </div>
            <div className='position-relative w-100 search-container'>
              <div className='search-icon'>
                <img src={toAbsoluteUrl('/media/icons/investor/search.svg')} alt='search icon' />
              </div>
              <input
                type='search'
                className='w-100 h-40px  border border-gray-300 rounded-end  ps-12 d-md-block d-none font-size-13 tabs-investordb form-label'
                id='placeholder_text_color'
                placeholder='Search Investors '
                onChange={(e) => setSearchInvestorUser(e.target.value)}
              />
            </div>
          </div>
          <div className='table-responsive'>
            <table className='table table-row-bordered align-middle gs-1 gy-3 mt-0'>
              <tbody>
                {investorUserData &&
                  investorUserData.map((user: any) => (
                    <tr>
                      <td>
                        <div className='text-dark  font-size-13 w-100px w-md-50'>
                          <span
                            onClick={() => {
                              navigate(`/investor-database/profile/${user.investorUserId}`)
                            }}
                            className='cursor-pointer'
                          >
                            {user.name ? user.name : '-'}
                          </span>
                          <span className='ms-2'>
                            <img
                              src={toAbsoluteUrl('/media/icons/duotune/social/linkedin.svg')}
                              width='12px'
                              height='12px'
                              alt='linkedin icon'
                            />
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className='text-dark w-100px w-md-50  font-size-13'>
                          {user.designation ? user.designation : '-'}
                        </div>
                      </td>
                      <td>
                        <div className='text-dark w-100px w-md-50  font-size-13'>
                          {user.email ? <a href={`mailto:${user.email}`}>{user.email} </a> : '-'}
                        </div>
                      </td>
                      {/* <td>
                        <div className='d-flex justify-content-end'>
                          <button className='btn btn-light d-flex'></button>
                            <img
                              src={toAbsoluteUrl('/media/icons/investor/threeDots.svg')}
                              alt='kebab menu'
                            />
                          </button>
                        </div>
                      </td> */}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='card p-7 mt-6'>
          <div className='d-flex justify-content-between'>
            <div className='d-flex align-self-center'>
              <p className='fs-4 fw-bold m-0 '>{formatMessage({id: 'Investments'})}</p>
            </div>
            {investments && investments?.length > 4 && !showAllInvestments && (
              <button
                className='btn btn-primary font-size-13 font-weight-400'
                onClick={() => setShowAllInvestments(true)}
              >
                {formatMessage({id: 'View All'})}
              </button>
            )}
          </div>
          <div className='table-responsive'>
            <table className='table table-row-bordered align-middle gs-1 gy-3 mt-0'>
              <thead className='font-size-13'>
                <tr className='fw-bold text-muted border-bottom-0 '>
                  <th className='min-w-200px table-header '>
                    <div
                      className='border border-gray-300  p-3 rounded-1 d-flex justify-content-between cursor-pointer'
                      onClick={() => {
                        setIsAnnouncedDateSorted(!isAnnouncedDateSorted)
                        setSortBy('createdAt')
                        isAnnouncedDateSorted ? setSortOrder('ASC') : setSortOrder('DESC')
                      }}
                    >
                      <span className='font-size-13 fw-semibold'>
                        <img src={toAbsoluteUrl('/media/icons/investor/FilterSymbol.svg')} alt='' />
                        {formatMessage({id: 'Announced Date'})}
                      </span>
                      <span>
                        {isAnnouncedDateSorted ? (
                          <img src={toAbsoluteUrl('/media/icons/investor/UpArrow.svg')} alt='' />
                        ) : (
                          <img src={toAbsoluteUrl('/media/icons/investor/DownArrow.svg')} alt='' />
                        )}
                      </span>
                    </div>
                  </th>
                  <th className='min-w-200px table-header '>
                    <div
                      className='border border-gray-300 p-3  rounded-1 d-flex justify-content-between cursor-pointer'
                      onClick={() => {
                        setIsOrganisationNameSorted(!isOrganisationNameSorted)
                        setSortBy('organization_name')
                        isOrganisationNameSorted ? setSortOrder('ASC') : setSortOrder('DESC')
                      }}
                    >
                      <span className='font-size-13 fw-semibold'>
                        {formatMessage({id: 'Organisation Name'})}
                      </span>
                      <span>
                        {isOrganisationNameSorted ? (
                          <img src={toAbsoluteUrl('/media/icons/investor/UpArrow.svg')} alt='' />
                        ) : (
                          <img src={toAbsoluteUrl('/media/icons/investor/DownArrow.svg')} alt='' />
                        )}
                      </span>
                    </div>
                  </th>
                  <th className='min-w-200px table-header '>
                    <div
                      className='border border-gray-300 p-3  rounded-1 d-flex justify-content-between cursor-pointer'
                      onClick={() => {
                        setIsLeadInvestorsSorted(!isLeadInvestorsSorted)
                        setSortBy('lead_investor')
                        isLeadInvestorsSorted ? setSortOrder('ASC') : setSortOrder('DESC')
                      }}
                    >
                      <span className='font-size-13 fw-semibold'>
                        {formatMessage({id: 'Lead Investors'})}
                      </span>
                      <span>
                        {isLeadInvestorsSorted ? (
                          <img src={toAbsoluteUrl('/media/icons/investor/UpArrow.svg')} alt='' />
                        ) : (
                          <img src={toAbsoluteUrl('/media/icons/investor/DownArrow.svg')} alt='' />
                        )}
                      </span>
                    </div>
                  </th>
                  <th className='min-w-200px table-header '>
                    <div
                      className='border border-gray-300 p-3  rounded-1 d-flex justify-content-between cursor-pointer'
                      onClick={() => {
                        setIsFundingRoundSorted(!isFundingRoundSorted)
                        setSortBy('funding_round')
                        isFundingRoundSorted ? setSortOrder('ASC') : setSortOrder('DESC')
                      }}
                    >
                      <span className='font-size-13 fw-semibold'>
                        {formatMessage({id: 'Funding round'})}
                      </span>
                      <span>
                        {isFundingRoundSorted ? (
                          <img src={toAbsoluteUrl('/media/icons/investor/UpArrow.svg')} alt='' />
                        ) : (
                          <img src={toAbsoluteUrl('/media/icons/investor/DownArrow.svg')} alt='' />
                        )}
                      </span>
                    </div>
                  </th>
                  <th className='min-w-200px table-header '>
                    <div
                      className='border border-gray-300 p-3  rounded-1 d-flex justify-content-between cursor-pointer'
                      onClick={() => {
                        setIsMoneyRaisedSorted(!isMoneyRaisedSorted)
                        setSortBy('money_raised')
                        isMoneyRaisedSorted ? setSortOrder('ASC') : setSortOrder('DESC')
                      }}
                    >
                      <span className='font-size-13 fw-semibold'>
                        {formatMessage({id: 'Money Raised'})}
                      </span>
                      <span>
                        {isMoneyRaisedSorted ? (
                          <img src={toAbsoluteUrl('/media/icons/investor/UpArrow.svg')} alt='' />
                        ) : (
                          <img src={toAbsoluteUrl('/media/icons/investor/DownArrow.svg')} alt='' />
                        )}
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {investorInvestmentData &&
                  investorInvestmentData?.map((investment: any) => (
                    <tr className='fw-normal'>
                      <td className='ps-8'>
                        <div className='table-body font-size-12'>
                          {getDateValue(investment?.createdAt?.toString())
                            ? getDateValue(investment?.createdAt?.toString())
                            : DateTime.fromISO(investment?.createdAt?.toString()).toLocaleString(
                                DateTime.DATE_MED
                              )}
                        </div>
                      </td>
                      <td className='ps-8'>
                        <div className='d-block mb-1 table-body'>
                          <span>
                            <DisplayImage
                              imgName={investment?.file?.name}
                              width={16}
                              alt='profile'
                              fit='contain'
                              height={16}
                            />
                          </span>
                          <span className='ps-3 font-size-12'>
                            {investment?.organization_name ? investment.organization_name : '-'}
                          </span>
                        </div>
                      </td>
                      <td className='ps-8'>
                        <div className='d-block mb-1 table-body font-size-12'>
                          {investment?.lead_investor ? investment.lead_investor : '-'}
                        </div>
                      </td>
                      <td className='ps-8'>
                        <div className='d-block mb-1 table-body'>
                          <span>
                            <DisplayImage
                              imgName={investment?.file?.name}
                              width={16}
                              alt='profile'
                              fit='contain'
                              height={16}
                            />
                          </span>
                          <span className='ps-3 font-size-12'>
                            {investment?.funding_round ? investment.funding_round : '-'}
                          </span>
                        </div>
                      </td>
                      <td className='table-body ps-8 font-size-12'>
                        {investment?.money_raised ? `$ ${convertValueToShortScale(investment.money_raised)}` : '-'}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='card mt-6'>
          {individualInvestor?.twitter_url && (
            <div className='card p-7'>
              <div className='d-md-flex justify-content-md-between'>
                <div className='d-flex align-self-center mb-3 mb-md-0'>
                  <p className='fs-4 fw-bold m-0 '>{formatMessage({id: 'Twitter feed'})}</p>
                </div>
              </div>
              <div className='d-flex flex-column align-items-center overflow-hidden mt-5'>
                <div className='w-75 overflow-hidden'>
                  <TwitterTimelineEmbed
                    sourceType='url'
                    url={individualInvestor?.twitter_url}
                    options={{height: 400}}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
