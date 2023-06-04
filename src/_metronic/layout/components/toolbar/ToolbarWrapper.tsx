import clsx from 'clsx'
import {PageTitle, ToolbarType, useLayout} from '../../core'
import {Toolbar} from './Toolbar'
import {PageTitleWrapper} from './page-title'
import {Link, useLocation} from 'react-router-dom'
import {KTSVG} from '../../../helpers'
// import threeDots from '../../../assets/images/svg/investor/threeDots.svg'
import {useIntl} from 'react-intl'
import Tabs, {Tab} from 'react-best-tabs'
import 'react-best-tabs/dist/index.css'
import {User} from '../../../../app/modules/profile/components/User'
import {Company} from '../../../../app/modules/profile/components/Company'
import {Billing} from '../../../../app/modules/profile/components/Billing'
import {Team} from '../../../../app/modules/profile/components/Team'
import {EmailIntegration} from '../../../../app/modules/profile/components/EmailIntegration'
import {BCCTracking} from '../../../../app/modules/profile/components/BCCTracking'
import {Locale} from '../../../../app/modules/profile/components/Locale'
import {NotificationPreferences} from '../../../../app/modules/profile/components/NotificationPreferences'
import {Referral} from '../../../../app/modules/profile/components/Referral'

import {
  EmailPreferencesOutput,
  companyInitialValues,
  localeInitialValues,
  profileBreadCrumbs,
  userInitialValues,
  postmarkInitialValues,
  initialValues,
  customSmtpInitialValues,
  senderInitialValues,
} from '../../../../app/modules/profile/core/_constants'
import {useEffect, useState} from 'react'
import {useAuth} from '../../../../app/modules/auth'
import {
  companyData,
  getEmailPreferences,
  getLocale,
  getReferralData,
  getTotalReferralEarning,
  profileData,
  getBccTrackingData,
  getUserList,
  getMailInfo,
  getPendingUsers,
} from '../../../../app/modules/profile/core/_requests'
import {toast} from 'react-toastify'
import {CountryModel} from '../../../../app/modules/onboarding'
import {getCountry, state} from '../../../../app/modules/onboarding/core/_requests'
import {getCompanyMetaIdType} from '../../../../app/modules/profile/core/_models'
import {useInvestorDatabase} from '../../../../app/modules/investor-database/core/InvestorContext'
import {Filter} from '../../../../app/modules/widgets/components/General/Filter'
import useGetBillingData from '../../../../app/hooks/useGetBillingData'
import {AiPersonality} from '../../../../app/modules/profile/components/AiPersonality'

const ToolbarWrapper = () => {
  const location = useLocation()
  const {formatMessage} = useIntl()
  const {config, classes} = useLayout()
  const [key, setKey] = useState(1)
  const {
    currentUser,
    setCurrentUser,
    companyId,
    currentState,
    setCurrentState,
    selected,
    setSelected,
    currencyBill,
    setCurrencyBill,
    billingData,
    setBillingData,
  } = useAuth()
  const [getApiLoading, setApiLoading] = useState(false)
  const [imgName, setImgName] = useState<string>()
  const [companyImgName, setCompanyImgName] = useState<string>()
  const [getCompanyApiLoading, setGetCompanyApiLoading] = useState(false)
  const [getLocaleApiLoading, setGetLocaleApiLoading] = useState(false)
  const [getPreferencesApiLoading, setGetPreferencesApiLoading] = useState(false)
  const [countryId, setCountryId] = useState<string | undefined>()
  const [countryOptions, setcountryOptions] = useState<any[]>([])
  const [stateOptions, setstateOptions] = useState<any[]>([])
  const [getPreferences, setGetPreferences] = useState(EmailPreferencesOutput)
  const {storeSearchValue, setInvestorDbFilter} = useInvestorDatabase()
  const [bccEmail, setBccEmail] = useState('')
  const [emailSignature, setEmailSignature] = useState('')

  const [userList, setUserList] = useState<any[]>([])
  const [pendingUsersList, setPendingUsersList] = useState<any[]>([])

  const [referral, setReferral] = useState<string>()
  const [paypalId, setPaypalId] = useState<string>()
  const [totalEarning, setTotalEarning] = useState<string>()
  const [totalReferred, setTotalReferred] = useState<string>()

  const [postmarkRadio, setPostmarkRadio] = useState(false)
  const [sendgridRadio, setSendgridRadio] = useState(false)
  const [foundercrateRadio, setFoundercrate] = useState(false)
  const [customsmtpRadio, setCustomSmtpRadio] = useState(false)

  const {getBillingDetailsAPI} = useGetBillingData(companyId!)

  // api calling starts

  //Billing API Call

  useEffect(() => {
    const plan: any = billingData?.subscription_items[0].item_price_id?.split('-')
    if (plan) {
      setSelected(plan[0])
      setCurrencyBill(plan[1])
      setCurrentState(plan[2])
    }
  }, [billingData]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const getBillingDetails = async () => {
      setBillingData(await getBillingDetailsAPI())
    }
    if (companyId) {
      getBillingDetails()
    }
  }, [companyId]) // eslint-disable-line react-hooks/exhaustive-deps

  //Referral API Calls
  const getReferral = async () => {
    try {
      const {
        data: {success, data, errors},
      } = await getReferralData()
      if (success) {
        setReferral(data.referCode)
        setPaypalId(data.paypalEmail)
      } else {
        errors?.forEach((error: string) => {
          toast.error(formatMessage({id: error}))
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const totalReferralEarning = async () => {
    try {
      const {
        data: {success, data, errors},
      } = await getTotalReferralEarning()
      if (success) {
        setTotalEarning(data.earnings)
        setTotalReferred(data.totalReferred)
      } else {
        errors?.forEach((error: string) => {
          toast.error(formatMessage({id: error}))
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getReferral()
    totalReferralEarning()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const getProfileInfo = async () => {
      try {
        if (companyId) {
          setApiLoading(true)
          const {
            data: {success, data, errors},
          } = await profileData(companyId)
          if (success) {
            setApiLoading(false)
            setImgName(data.profileImage)
            setCurrentUser({
              ...currentUser,
              firstName: data.firstName,
              profileImg: data.profileImage,
            })
            const communicationData = JSON.parse(data.communication)
            userInitialValues.firstName = data.firstName
            userInitialValues.lastName = data.lastName
            userInitialValues.email = data.email
            userInitialValues.contact = data.contact!
            userInitialValues.country = data.countryId!
            userInitialValues.designation = data.designation
            userInitialValues.profileImageId = data.profileImageId!
            userInitialValues.communication.email = communicationData?.email || false
            userInitialValues.communication.phone = communicationData?.phone || false
          } else if (errors) {
            setApiLoading(false)
            errors.forEach((error: string) => {
              toast.error(formatMessage({id: error}))
            })
          }
        }
      } catch (err) {
        setApiLoading(false)
        console.log(err)
      }
    }
    getProfileInfo()
  }, [companyId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const getCompanyData = async () => {
      try {
        setGetCompanyApiLoading(true)
        if (companyId) {
          const {
            data: {success, data, errors},
          } = await companyData(companyId)
          if (success) {
            setGetCompanyApiLoading(false)
            setCompanyImgName(data.companylogo)
            companyInitialValues.companyName = data.name
            companyInitialValues.tagline = data.tagline
            companyInitialValues.teamSize = data.teamSize
            companyInitialValues.legalName = data.legalName
            companyInitialValues.operatingStatus = data.operatingStatus
            companyInitialValues.description = data.description
            companyInitialValues.foundedDate = data.foundedDate
            companyInitialValues.industry = data.industry
            companyInitialValues.country = data.countryId
            companyInitialValues.state = data.stateId
            companyInitialValues.founders = data.founders
            companyInitialValues.logoId = data.logoId
            companyInitialValues.socialMedia.website = data.website
            companyInitialValues.socialMedia.facebook = data.facebook
            companyInitialValues.socialMedia.twitter = data.twitter
            companyInitialValues.socialMedia.linkedin = data.linkedin
            companyInitialValues.socialMedia.instagram = data.instagram
          } else {
            setGetCompanyApiLoading(false)
            errors.forEach((error: string) => {
              toast.error(formatMessage({id: error}))
            })
          }
        }
      } catch (err) {
        setApiLoading(false)
        console.log(err)
      }
    }
    getCompanyData()
  }, [companyId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const fetchCountry = async () => {
      const {
        data: {data: countries},
      } = await getCountry()
      const countriesData = countries.map((country: CountryModel) => {
        return {
          id: country.countryId,
          name: country.country_name,
          value: country.countryId,
        }
      })
      setcountryOptions([...countriesData])
    }
    fetchCountry()
  }, [])

  useEffect(() => {
    const fetchState = async () => {
      try {
        if (!countryId) {
          return
        }
        const {
          data: {data: states, success},
        } = await state(countryId!)
        if (success) {
          const stateData = states.map((state: any) => {
            return {
              id: state.stateId,
              name: state.state_name,
              value: state.stateId,
            }
          })
          setstateOptions([...stateData])
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchState()
  }, [countryId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const getCompanyMeta = async () => {
      try {
        if (companyId) {
          setGetLocaleApiLoading(true)
          const {
            data: {success, data, errors},
          } = await getLocale()
          if (success) {
            setGetLocaleApiLoading(false)
            data.map(({key, value}: getCompanyMetaIdType) => {
              return (localeInitialValues[key] = value)
            })
            return null
          } else {
            setGetLocaleApiLoading(false)
            errors.forEach((error: string) => {
              toast.error(formatMessage({id: error}))
            })
          }
        }
      } catch (err) {
        setGetLocaleApiLoading(false)
        console.log(err)
      }
    }
    getCompanyMeta()
  }, [companyId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const getApiEmailPreferences = async () => {
      try {
        if (companyId) {
          setGetPreferencesApiLoading(true)
          const {
            data: {
              data: {preference},
              success,
              errors,
            },
          } = await getEmailPreferences(companyId)
          if (success) {
            setGetPreferencesApiLoading(false)
            setGetPreferences(JSON.parse(preference))
          } else {
            setGetPreferencesApiLoading(false)
            errors.forEach((error: string) => {
              toast.error(formatMessage({id: error}))
            })
          }
        }
      } catch (err) {
        setGetPreferencesApiLoading(false)
        console.log(err)
      }
    }
    getApiEmailPreferences()
  }, [companyId]) // eslint-disable-line react-hooks/exhaustive-deps

  //for bcctracking
  useEffect(() => {
    const getBcctrackingData = async () => {
      try {
        if (companyId) {
          const {
            data: {success, data, errors},
          } = await getBccTrackingData(companyId)
          if (success) {
            setBccEmail(data.email)
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
    getBcctrackingData()
  }, [companyId]) // eslint-disable-line react-hooks/exhaustive-deps

  // Email Integration API
  const getMailInformation = async () => {
    try {
      const {
        data: {success, data, errors},
      } = await getMailInfo(companyId)
      if (success) {
        senderInitialValues.fromName = data.fromName
        senderInitialValues.fromEmail = data.fromAddress
        senderInitialValues.replyToName = data.replyToName
        senderInitialValues.replyToEmail = data.replyToAddress
        setEmailSignature(data.emailSignature)
        if (data.sendgrid !== null) {
          initialValues.apiKey = data.sendgrid.apiKey
        }
        if (data.smtp !== null) {
          customSmtpInitialValues.username = data.smtp.username
          customSmtpInitialValues.encryption = data.smtp.encryption
          customSmtpInitialValues.password = data.smtp.password
          customSmtpInitialValues.server = data.smtp.server
          customSmtpInitialValues.port = data.smtp.port
        }
        if (data.postmark !== null) {
          postmarkInitialValues.serverToken = data.postmark.serverToken
        }
        if (data.isActive === 'postmark') {
          setPostmarkRadio(true)
          setSendgridRadio(false)
          setCustomSmtpRadio(false)
          setFoundercrate(false)
        } else if (data.isActive === 'sendgrid') {
          setPostmarkRadio(false)
          setSendgridRadio(true)
          setCustomSmtpRadio(false)
          setFoundercrate(false)
        } else if (data.isActive === 'foundercrate') {
          setPostmarkRadio(false)
          setSendgridRadio(false)
          setCustomSmtpRadio(false)
          setFoundercrate(true)
        } else if (data.isActive === 'smtp') {
          setPostmarkRadio(false)
          setSendgridRadio(false)
          setCustomSmtpRadio(true)
          setFoundercrate(false)
        }
      } else {
        console.log(errors)
        errors.forEach((error: string) => {
          toast.error(formatMessage({id: error}))
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getPendingUserList = async () => {
    try {
      if (companyId) {
        const {
          data: {success, data, errors},
        } = await getPendingUsers(companyId)
        if (success) {
          setPendingUsersList(data)
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

  const getUsersList = async () => {
    try {
      if (companyId) {
        const {
          data: {success, data, errors},
        } = await getUserList(companyId)
        if (success) {
          setUserList(data)
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
    getUsersList()
  }, [companyId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (companyId) {
      getMailInformation()
    }
  }, [companyId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (companyId) getPendingUserList()
  }, [companyId]) // eslint-disable-line react-hooks/exhaustive-deps

  // api calling ends

  if (!config.app?.toolbar?.display) {
    return null
  }

  const isPageTitleVisible = showPageTitle(
    config.app?.toolbar?.layout,
    config.app?.pageTitle?.display
  )

  const daterangepickerButtonClass = config.app?.toolbar?.fixed?.desktop
    ? 'btn-light'
    : 'bg-body btn-color-gray-700 btn-active-color-primary'

  return (
    <div id='kt_app_toolbar' className={clsx('app-toolbar pt-4')}>
      <div
        id='kt_app_toolbar_container'
        className={clsx(
          'app-container d-md-flex flex-md-column align-items-start flex-column overflow-hidden',
          classes.toolbarContainer.join(' '),
          config.app?.toolbar?.containerClass,
          config.app?.toolbar?.minimize?.enabled ? 'app-toolbar-minimize' : '',
          {
            'container-fluid': config.app?.toolbar?.container === 'fluid',
            'container-xxl': config.app?.toolbar?.container === 'fixed',
          }
        )}
      >
        <div className='d-md-flex justify-content-md-between w-100'>
          {isPageTitleVisible && <PageTitleWrapper />}
          <Toolbar />
        </div>

        {location.pathname.includes('settings') && (
          <Tabs
            activeTab={1}
            className='font-size-13'
            ulClassName='text-muted dark-border overflow-x-auto whitespace-nowrap'
            activityClassName='bg-primary'
            onClick={(event, tab) => setKey(tab)}
          >
            <Tab title={formatMessage({id: 'User'})} className='mr-3 mt-2'>
              <PageTitle
                breadcrumbs={profileBreadCrumbs}
                description={formatMessage({id: 'Settings'})}
              >
                {formatMessage({id: 'Settings'})}
              </PageTitle>
              <div className='mt-4 '>
                <User
                  key={key}
                  getApiLoading={getApiLoading}
                  setImgName={setImgName}
                  imgName={imgName}
                  countryOptions={countryOptions}
                />
              </div>
            </Tab>
            <Tab title={formatMessage({id: 'AI Personality'})} className='mr-3 mt-2'>
              <PageTitle
                breadcrumbs={profileBreadCrumbs}
                description={formatMessage({id: 'Settings'})}
              >
                {formatMessage({id: 'Settings'})}
              </PageTitle>
              <div className='mt-4 '>
                <AiPersonality
                  key={key}
                  getApiLoading={getApiLoading}
                  setImgName={setImgName}
                  imgName={imgName}
                  countryOptions={countryOptions}
                />
              </div>
            </Tab>
            {/*<Tab title={formatMessage({id: 'Company'})} className='mr-3 mt-2'>*/}
            {/*  <div className='mt-4'>*/}
            {/*    <Company*/}
            {/*      key={key}*/}
            {/*      getCompanyApiLoading={getCompanyApiLoading}*/}
            {/*      setCompanyImgName={setCompanyImgName}*/}
            {/*      companyImgName={companyImgName}*/}
            {/*      setCountryId={setCountryId}*/}
            {/*      countryOptions={countryOptions}*/}
            {/*      stateOptions={stateOptions}*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*</Tab>*/}
            <Tab title={formatMessage({id: 'Billing'})} className='mr-3 mt-2'>
              <div className='mt-4'>
                <Billing
                  key={key}
                  billingData={billingData}
                  getBillingDetails={getBillingDetailsAPI}
                  currencyBill={currencyBill}
                  selected={selected}
                  currentState={currentState}
                  companyId={companyId}
                />
              </div>
            </Tab>
            <Tab title={formatMessage({id: 'Team'})} className='mr-3 mt-2'>
              <div className='mt-4'>
                <Team
                  key={key}
                  userList={userList}
                  pendingUserList={pendingUsersList}
                  getUserList={getUsersList}
                  getPendingUsers={getPendingUserList}
                />
              </div>
            </Tab>
            <Tab title={formatMessage({id: 'Referral'})} className='mr-3 mt-2'>
              <div className='mt-4'>
                <Referral
                  key={key}
                  paypalId={paypalId}
                  referral={referral}
                  totalEarning={totalEarning}
                  totalReferred={totalReferred}
                  setPaypalId={setPaypalId}
                />
              </div>
            </Tab>
            {/*<Tab title={formatMessage({id: 'Email Integration'})} className='mr-3 mt-2'>*/}
            {/*  <div className='mt-4'>*/}
            {/*    <EmailIntegration*/}
            {/*      key={key}*/}
            {/*      companyId={companyId}*/}
            {/*      getMailInformation={getMailInformation}*/}
            {/*      customsmtpRadio={customsmtpRadio}*/}
            {/*      foundercrateRadio={foundercrateRadio}*/}
            {/*      sendgridRadio={sendgridRadio}*/}
            {/*      postmarkRadio={postmarkRadio}*/}
            {/*      emailSignature={emailSignature}*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*</Tab>*/}
            {/*<Tab title={formatMessage({id: 'BCC Tracking'})} className='mr-3 mt-2'>*/}
            {/*  <div className='mt-4'>*/}
            {/*    <BCCTracking key={key} bccEmail={bccEmail} />*/}
            {/*  </div>*/}
            {/*</Tab>*/}
            <Tab title={formatMessage({id: 'Locale'})} className='mr-3 mt-2'>
              <div className='mt-4'>
                <Locale key={key} getLocaleApiLoading={getLocaleApiLoading} />
              </div>
            </Tab>
            <Tab title={formatMessage({id: 'Notification Preferences'})} className='mr-3 mt-2'>
              <div className='mt-4'>
                <NotificationPreferences
                  key={key}
                  getPreferences={getPreferences}
                  setGetPreferences={setGetPreferences}
                  getPreferencesApiLoading={getPreferencesApiLoading}
                />
              </div>
            </Tab>
          </Tabs>
        )}
        {(location.pathname.includes('/prospective-investor') ||
          location.pathname.includes('/existing-investor')) && (
          <div className='d-flex h-55px border-bottom space-between w-100 justify-content-between prospective-investor-tab'>
            <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5  flex-nowrap mobile-tab-both'>
              <li className='nav-item mobile-tab font-size-13'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname.includes('prospective-investor') && 'active')
                  }
                  to='/investor-database/prospective-investor'
                >
                  {formatMessage({id: 'Prospective Investor'})}
                </Link>
              </li>
              <li className='nav-item mobile-tab font-size-13'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname.includes('existing-investor') && 'active')
                  }
                  to='/investor-database/existing-investor'
                >
                  {formatMessage({id: 'Existing Investor'})}
                </Link>
              </li>
            </ul>
            <div className='d-flex gap-md-4 gap-7 align-items-center'>
              <div className='h-75 border bg-white d-flex align-items-center rounded'>
                <button
                  className={clsx(
                    'text-clr88 btn btn-sm btn-flex fw-semibold font-size-12',
                    daterangepickerButtonClass
                  )}
                  id='fc-toogle'
                  title='Sort and Filter'
                  data-bs-toggle='tooltip'
                  data-bs-placement='left'
                  data-bs-dismiss='click'
                  data-bs-trigger='hover'
                  onClick={() => setInvestorDbFilter(true)}
                >
                  <KTSVG
                    path='/media/icons/duotune/general/gen031.svg'
                    className='svg-icon-6 svg-icon-muted me-1'
                  />
                  {formatMessage({id: 'Filter'})}
                </button>
              </div>
              <div className='border d-flex align-content-center bg-white rounded  m-0 p-0 h-75'>
                <KTSVG
                  path='/media/icons/duotune/general/gen021.svg'
                  className='svg-icon-3 position-absolute ms-3 pt-3'
                />
                <input
                  type='text'
                  className='bg-body form-control form-control-flush ps-10 rounded-2 font-size-13 font-weight-400 p-5 '
                  name='search'
                  placeholder={formatMessage({id: 'Search Investor'})}
                  data-kt-search-element='input'
                  onChange={(e) => storeSearchValue(e.target.value)}
                />
              </div>
              <div className='border d-flex align-items-center'>
                {/* <button className='btn btn-white h-50 three-dots company-container'>
                  <img src={threeDots} alt='' className='h-25' />
                </button> */}
              </div>
            </div>
            <Filter />
          </div>
        )}

        {/* {location.pathname.includes('/create-investor') && (
          <div className='d-flex overflow-auto h-55px border-bottom space-between w-100 justify-content-between prospective-investor-tab'>
            <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5  flex-nowrap mobile-tab-both'>
              <li className='nav-item mobile-tab font-size-13'>
                <Link
                  className={
                    `nav-link text-active-primary me-6` +
                    (location.pathname.includes('general') && 'active')
                  }
                  to='/investor-database/create-investor/general'
                >
                  {formatMessage({id: 'General'})}
                </Link>
              </li>
              <li className='nav-item mobile-tab font-size-13'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname.includes('highlight') && 'active')
                  }
                  to='/investor-database/create-investor/highlight'
                >
                  {formatMessage({id: 'Highlights'})}
                </Link>
              </li>
            </ul>
            <div className='d-flex gap-4 align-items-center'>
              <div className='h-75 border bg-white d-flex align-items-center rounded'>
                <button
                  className={clsx('text-clr88 btn btn-sm btn-flex fw-semibold font-size-12', daterangepickerButtonClass)}
                  data-kt-menu-trigger='click'
                  data-kt-menu-placement='bottom-end'
                >
                  <KTSVG
                    path='/media/icons/duotune/general/gen031.svg'
                    className='svg-icon-6 svg-icon-muted me-1'
                  />
                  {formatMessage({id: 'Filter'})}
                </button>
              </div>
              <div className='border d-flex align-content-center bg-white rounded  m-0 p-0 h-75'>
                 <KTSVG
                path='/media/icons/duotune/general/gen021.svg'
                className='svg-icon-3 position-absolute ms-3 pt-3'
              />
                <input
                type='text'
                className='bg-body form-control form-control-flush ps-10 rounded-2 font-size-13'
                name='search'
                placeholder={formatMessage({id:'Search Investor'})}
                data-kt-search-element='input'
                // value={search}
                // onChange={(e) => setSearch(e.target.value)}
              />
              </div>
              <div className='border d-flex align-items-center'>
                <button className='btn btn-white h-50 three-dots'>
                  <img src={threeDots} alt='' className='h-25' />
                </button>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  )
}

const showPageTitle = (appToolbarLayout?: ToolbarType, appPageTitleDisplay?: boolean): boolean => {
  const viewsWithPageTitles = ['classic', 'reports', 'saas']
  if (!appToolbarLayout || !appPageTitleDisplay) {
    return false
  }

  return appPageTitleDisplay && viewsWithPageTitles.some((t) => t === appToolbarLayout)
}

export {ToolbarWrapper}
