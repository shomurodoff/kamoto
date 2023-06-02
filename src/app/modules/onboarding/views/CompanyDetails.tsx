import React, {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {ToolTipUI} from '../../widgets/components/UI/ToolTipUI'
import '../styles/onboarding.scss'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import TextInput from '../../widgets/components/Input/TextInput'
import * as Yup from 'yup'
import {Formik, Form} from 'formik'
import {InfoCard} from '../../widgets/components/UI/InfoCard'
import {SelectInput} from '../../widgets/components/Input/SelectInput'
import {CustomButton} from '../../widgets/components/UI/CustomButton'
import {useNavigate} from 'react-router-dom'
import {createCompany, getLocation} from '../core/_requests'
import {FileUpload} from '../../widgets/components/FileUpload'

import {useAuth} from '../../auth'
import {industryOptions} from '../../../core/_constants'

import {Country} from '../../widgets/components/General/Country'
import {State} from '../../widgets/components/General/State'
import {verifyToken} from '../../auth/core/_requests'
import {DisplayImage} from '../../widgets/components/General/DisplayImage'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Toaster} from '../../widgets/components/General/Toaster'
import {BasicButton} from '../../widgets/components/UI/BasicButton'
import {BillingModal} from './BillingModal'
import {plans} from '../core/_constants'

const initialValues = {
  companyName: '',
  industry: '',
  country: '',
  state: '',
}

export const CompanyDetails = () => {
  const {formatMessage} = useIntl()
  const [modelStatus, setModelStatus] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [countryId, setCountryId] = useState<string | undefined>()
  const [imgName, setImgName] = useState<string | undefined>()
  const [modalShow, setModalShow] = useState(false)
  const [currentState, setCurrentState] = useState<string>('Monthly')
  const [selected, setSelected] = useState('Basic')
  const [currencyBill, setCurrencyBill] = useState('USD')
  const [price, setPrice] = useState('0')
  const navigate = useNavigate()

  const {storeCompanyId, setCurrentUser} = useAuth()

  const companyDetailsSchema = Yup.object().shape({
    companyName: Yup.string()
      .min(3, formatMessage({id: 'Minimum 3 characters'}))
      .max(50, formatMessage({id: 'Maximum 50 characters'}))
      .required(formatMessage({id: 'Company name is required'})),
    industry: Yup.string().required(formatMessage({id: 'Industry is required'})),
    country: Yup.string().required(formatMessage({id: 'Country is required'})),
    state: Yup.string().required(formatMessage({id: 'State/Province is required'})),
  })
  useEffect(() => {
    const billPlan = localStorage.getItem('plan')
    const plan: any = billPlan?.split('-')
    if (plan) {
      if (plan[0]) {
        setSelected(plan[0])
      }
      if (plan[1]) {
        setCurrencyBill(plan[1])
      }
      if (plan[2]) {
        setCurrentState(plan[2])
      }
      if (plan[0] && plan[1] && plan[2]) {
        const data: any = plans.find((p) => p.title === plan[0])
        if (plan[2] === 'Monthly') {
          plan[1] === 'USD' ? setPrice(data?.priceMonthUSD) : setPrice(data?.priceMonthINR)
        } else {
          plan[1] === 'USD' ? setPrice(data?.priceAnnualUSD) : setPrice(data?.priceAnnualINR)
        }
      }
    } else {
      const getCurrencyCode = async () => {
        try {
          const {
            data: {
              currency: {code},
            },
          } = await getLocation()
          if (code === 'INR') {
            setCurrencyBill(code)
          }
        } catch (err) {
          console.log(err)
        }
      }
      getCurrencyCode()
    }
  }, [])

  const onSubmit = async (values: any) => {
    setLoading(true)
    try {
      const chargebeePlanId = `${selected}-${currencyBill}-${currentState}`

      const {
        data: {data, success, errors},
      } = await createCompany(
        values.companyName,
        values.industry,
        values.country,
        values.state,
        values.logoId,
        chargebeePlanId
      )

      if (success) {
        navigate('/onboarding/initialize-round')
        setLoading(false)

        const {
          data: {success, data: value},
        } = await verifyToken(data.token)
        if (success) {
          setCurrentUser({...value})
          storeCompanyId(data.companyId)
        }
      } else {
        errors.forEach((error: string) => {
          toast.error(formatMessage({id: error}))
        })
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  const handleOpen = () => {
    setModelStatus(true)
  }
  const handleClose = () => {
    setModelStatus(false)
  }

  return (
    <>
      <Toaster />
      <Formik
        validationSchema={companyDetailsSchema}
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={onSubmit}
        validateOnMount
      >
        {(formik) => {
          setCountryId(formik.values.country)
          return (
            <Form className='grid grid-cols-12 md:gap-[44px]'>
              <div className='col-span-12 md:col-span-6'>
                <h1 className='text-[22px] leading-8 text-[#FFFFFFCC] font-semibold mb-[8px]'>
                  {formatMessage({id: 'AI Personality Details'})}
                </h1>
                <div className='text-[16px] leading-5 text-[#FFFFFFCC] font-semibold '>
                  {formatMessage({id: 'Please enter your AI Personality name'})}
                </div>
                <div className='mt-7'>
                  <TextInput
                    fieldType={'text'}
                    label={formatMessage({id: 'AI Personality name*'})}
                    fieldName={'personalName'}
                    placeholder={formatMessage({id: 'Shahrukh Khan'})}
                    formik={formik}
                    margin='me-4'
                    toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.COMPANY_DETAILS.COMPANY_NAME'})}
                  />
                  {/* file upload starts */}

                  <div className={`flex justify-center md:justify-start`} onClick={handleOpen}>
                    <DisplayImage
                      imgName={imgName}
                      className={'w-[125px] h-[125px] rounded shadow'}
                      fit='contain'
                      alt='profile'
                    />
                    {/*<div className='pencil-container'>*/}
                    {/*  <img src={toAbsoluteUrl('/media/icons/duotune/general/pencil.svg')} alt='' />*/}
                    {/*</div>*/}
                  </div>
                  <FileUpload
                    fileSize={2097152}
                    maxFileNumber={1}
                    allowType={['image/*', '.jpg', '.jpeg', '.png']}
                    metaData={{module: 'logo', isProtected: true}}
                    modalStatus={modelStatus}
                    handleClose={handleClose}
                    handleSuccess={(id: number, name: string) => {
                      setImgName(name)
                      formik.setFieldValue('logoId', id)
                    }}
                  />
                  <div className='text-gray-500  font-size-12 mt-3 w-md-250px w-100 text-md-start text-center hidden'>
                    <span>{formatMessage({id: 'Max size 2mb, supported'})} </span>
                    {formatMessage({id: 'format jpg, png'})}
                  </div>
                </div>
                <div className='bg-[#1A1B25] rounded p-2.5 my-6'>
                  <div className='flex items-center justify-between md:justify-start mb-2'>
                    <h2 className='font-size-16 m-0'>{selected}</h2>
                    <p className='btn btn-sm btn-light-success fw-semibold m-0 ms-4 font-size-13 py-1 px-3'>
                      {formatMessage({id: 'Selected Plan'})}
                    </p>
                  </div>
                  <div className='d-md-flex justify-content-md-between align-items-md-baseline flex-wrap'>
                    <div>
                      <span className='d-flex align-items-center gap-2'>
                        <span className='bullet bullet-dot'></span>
                        <p className='m-0 text-muted font-size-13'>
                          {formatMessage({id: '30 Days Free trail'})}
                        </p>
                      </span>
                      <span className='d-flex align-items-center gap-2'>
                        <span className='bullet bullet-dot'></span>
                        <p className='m-0 text-muted font-size-13'>
                          {' '}
                          {formatMessage({id: 'No Credit Card Required'})}
                        </p>
                      </span>
                    </div>
                    <div className='d-flex'>
                      <span className='fw-bolder font-size-14 mt-1'>
                        {currencyBill === 'INR' ? '₹' : '$'}
                      </span>
                      <p className='fw-bolder font-size-20 m-0'>
                        {price}/{currentState}
                      </p>
                    </div>
                    {/*<BasicButton*/}
                    {/*  height='44px'*/}
                    {/*  border='1px solid #F5F8FA'*/}
                    {/*  color='#4776E6'*/}
                    {/*  textColor='#FFFFFF'*/}
                    {/*  padding='8px 20px'*/}
                    {/*  buttonText='Change Plan'*/}
                    {/*  width={'100%'}*/}
                    {/*  minWidth={84}*/}
                    {/*  onClick={() => setModalShow(true)}*/}
                    {/*/>*/}
                    <button
                      className={
                        'w-full md:w-auto min-w-[120px] bg-[#C2D24B] py-3 rounded mt-8 md:mt-0 text-black text-[14px] leading-5'
                      }
                      onClick={() => setModalShow(true)}
                    >
                      Change Plan
                    </button>
                  </div>
                </div>
              </div>
              <div className='col-span-12 md:col-span-6'>
                <div>
                  <InfoCard
                    title={formatMessage({id: 'What is an AI Personality?'})}
                    desc={formatMessage({
                      id: 'AI Personality refers to the personalized AI replicas that users can create and train. These AI personalities can reflect the individual users or other specific personalities such as celebrities or influencers.',
                    })}
                    slug={'#'}
                  />
                  <TextInput
                    fieldType={'text'}
                    label={formatMessage({id: 'Company Name'})}
                    fieldName={'companyName'}
                    placeholder={formatMessage({id: 'Enter Company Name'})}
                    formik={formik}
                    margin='me-4'
                    toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.COMPANY_DETAILS.COMPANY_NAME'})}
                  />
                  <SelectInput
                    label={formatMessage({id: 'Industry'})}
                    fieldName={'industry'}
                    placeholder={formatMessage({id: 'Select Your Industry'})}
                    formik={formik}
                    toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.COMPANY_DETAILS.INDUSTRY'})}
                    options={industryOptions}
                  />
                  <Country
                    initialValues={initialValues}
                    formik={formik}
                    label={formatMessage({id: 'Country'})}
                    setCountryId={setCountryId}
                    tooltipText={formatMessage({id: 'GLOBAL.TOOLTIP.COMPANY_DETAILS.COUNTRY'})}
                    width={12}
                  />
                  <State
                    countryId={countryId}
                    formik={formik}
                    initialValues={initialValues}
                    tooltipText={formatMessage({id: 'GLOBAL.TOOLTIP.COMPANY_DETAILS.STATE'})}
                  />
                </div>
                <div className='mt-md-15 d-flex justify-content-end '>
                  <CustomButton
                    isSubmitting={formik.isSubmitting}
                    isValid={formik.isValid}
                    buttonText={formatMessage({id: 'Next'})}
                    loading={loading}
                    width={2}
                    widthLoading={4}
                    imgName={imgName}
                    height={44}
                    marginButtom='mb-5'
                  />
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
      <BillingModal
        modalShow={modalShow}
        setModalShow={setModalShow}
        currentState={currentState}
        setCurrentState={setCurrentState}
        selected={selected}
        setSelected={setSelected}
        currencyBill={currencyBill}
        setPrice={setPrice}
        plans={plans}
        upgrade={false}
      />
    </>
  )
}
