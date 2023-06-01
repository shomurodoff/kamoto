import React, {useEffect, useState} from 'react'
import '../../profile/styles/index.scss'
import {toAbsoluteUrl} from '../../../../_metronic/helpers/AssetHelpers'
import TextInput from '../../widgets/components/Input/TextInput'
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import {useIntl} from 'react-intl'
import {CustomButton} from '../../widgets/components/UI/CustomButton'
import {FileUpload} from '../../widgets/components/FileUpload'
import {DisplayImage} from '../../widgets/components/General/DisplayImage'
import {Toaster} from '../../widgets/components/General/Toaster'
import {investorsocialMediaData} from '../../profile/core/_constants'
import {socialMediaType} from '../../profile/core/_models'
import {Country} from '../../widgets/components/General/Country'
import {addInvestor, getIndustry, getSingleInvestor} from '../core/_requests'
import {toast} from 'react-toastify'
import {CreateInvestorTabs} from '../components/CreateInvestorTabs'
import {useNavigate, useParams} from 'react-router-dom'
import Select from 'react-select'
import { ToolTipUI } from '../../widgets/components/UI/ToolTipUI'

const initialValues = {
  investorName: '',
  company: '',
  description: '',
  phone: '',
  country: '',
  website: '',
  exits: '',
  socialMedia: {
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
  },
  profileImageId: '',
}

export function General() {
  const {formatMessage} = useIntl()
  const [imgName, setImgName] = useState<string>()
  const [modelStatus, setModelStatus] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [, setCountryId] = useState<string | undefined>()
  const [, setInvestorId] = useState<string>()
  const navigate = useNavigate()
  const [industryData, setIndustryData] = useState<any>([])
  const [industry, setIndustry] = useState<any>([])
  const {id} = useParams()
  const [, setIndividualInvestor] = useState<any>([])
  const [initialIndustry, setInitialIndustry] = useState<any>()
  
  const userSchema = Yup.object().shape({
    investorName: Yup.string()
      .min(1, formatMessage({id: 'Minimum 1 character is required'}))
      .max(50, formatMessage({id: 'Maximum 50 characters'}))
      .required(formatMessage({id: 'Investor name is required'}))
      .nullable(),
    company: Yup.string()
      .min(1, formatMessage({id: 'Minimum 1 character is required'}))
      .max(50, formatMessage({id: 'Maximum 50 characters'}))
      .required(formatMessage({id: 'company is required'}))
      .nullable(),
    description: Yup.string()
      .required(formatMessage({id: 'description is required'}))
      .nullable(),
    phone: Yup.string()
      .required(formatMessage({id: 'phone number is required'}))
      .min(6, formatMessage({id: 'Minimum 6 digits'}))
      .max(10, formatMessage({id: 'Maximum 10 digits'}))
      .nullable(),
    country: Yup.string()
      .required(formatMessage({id: 'Country is required'}))
      .nullable(),
    exits: Yup.number()
      .required(formatMessage({id: 'Exits is required'}))
      .nullable(),
    website: Yup.string()
      .url(formatMessage({id: formatMessage({id: 'Please Enter the valid URL'})}))
      .required(formatMessage({id: 'website is required'}))
      .nullable(),
    socialMedia: Yup.object().shape({
      facebook: Yup.string()
        .url(formatMessage({id: 'Please Enter the valid URL'}))
        .nullable(),
      twitter: Yup.string()
        .url(formatMessage({id: 'Please Enter the valid URL'}))
        .nullable(),
      linkedin: Yup.string()
        .url(formatMessage({id: 'Please Enter the valid URL'}))
        .nullable(),
      instagram: Yup.string()
        .url(formatMessage({id: 'Please Enter the valid URL'}))
        .nullable(),
    }),
  })

  const onSubmit = async (values: any) => {
    let industries = industry.map((e: any) => e.value)
    try {
      setLoading(true)
      const {
        data: {data: investor, success, errors},
      } = await addInvestor({...values,industries})
      if (success) {
        setInvestorId(investor.investorId)
        toast.success(formatMessage({id: 'Investor added successfully'}))
        setLoading(false)
        navigate(`/investor-database/create-investor/highlights/${investor.investorId}`)
      } else {
        setLoading(false)
        errors.forEach((error: string) => {
          toast.error(formatMessage({id: error}))
        })
      }
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  const getAllIndustry = async () => {
    try {
      const {
        data: {data, success, errors},
      } = await getIndustry()
      if (success) {
       let industryData= data.map((e:any)=>{
          return {value:e.industryId,label:e.industryName}
        })
        setIndustryData(industryData)
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
    getAllIndustry()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const singleInvestor = async () => {
    try {
      const {
        data: {success, data, errors},
      } = await getSingleInvestor(Number(id))
      if (success) {
        setIndividualInvestor(data)
        setImgName(data.file.name)
        initialValues.investorName=data.name
        initialValues.description=data.description
        initialValues.company=data.company
        initialValues.phone=data.phone
        initialValues.website=data.website
        initialValues.exits=data.exits
        initialValues.country=data.countryId
        initialValues.socialMedia.facebook=data.facebook_url
        initialValues.socialMedia.twitter=data.twitter_url
        initialValues.socialMedia.linkedin=data.linkedin_url
        initialValues.socialMedia.instagram=data.insta_url
         setInitialIndustry(data.allIndustries.map((e:any)=>{
          return {value:e.industryName,label:e.industryName}
        }))
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
    if(id){
      singleInvestor()
    }
   
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleOpen = () => {
    setModelStatus(true)
  }
  const handleClose = () => {
    setModelStatus(false)
  }

  return (
    <>
      <Toaster />
      <div className='g-5 g-xxl-8 create-investor-container company-container'>
        <CreateInvestorTabs />
        <div className=' title-main  ms-8 me-10 mt-7 mb-0 d-flex justify-content-between'>
          <h4 className='d-flex align-items-center'>{formatMessage({id: 'General'})}</h4>
        </div>
        <div className='col-xl-12 d-md-flex mt-0'>
          {/* file upload  */}
          <div
            className={`card position-relative d-flex justify-content-center`}
            onClick={handleOpen}
          >
            <DisplayImage imgName={imgName} width='100%' fit='contain' alt='profile' />

            <div className='pencil-container'>
              <img src={toAbsoluteUrl('/media/icons/duotune/general/pencil.svg')} alt='' />
            </div>
          </div>

          <div className='m-4 mt-md-8 ms-md-16 w-90 w-md-100'>
            <Formik initialValues={initialValues} validationSchema={userSchema} onSubmit={onSubmit}>
              {(formik) => {
                return (
                  <Form>
                    <div className='d-md-flex col-md-12 flex-wrap'>
                      <TextInput
                        fieldType={'text'}
                        label={formatMessage({id: "Investor's Name"})}
                        fieldName={'investorName'}
                        formik={formik}
                        placeholder={formatMessage({id: "Enter Investor's Name"})}
                        toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.GENERAL.INVESTOR_NAME'})}
                        margin='me-6'
                        width={5}
                        isStarRequired={true}
                      />
                      <FileUpload
                        fileSize={2097152}
                        maxFileNumber={1}
                        allowType={['image/*', '.jpg', '.jpeg', '.png']}
                        metaData={{module: 'profileimg', isProtected: true}}
                        modalStatus={modelStatus}
                        handleClose={handleClose}
                        handleSuccess={(id: number, name: string) => {
                          setImgName(name)
                          formik.setFieldValue('profileImageId', id)
                        }}
                      />
                      <TextInput
                        fieldType={'text'}
                        label={formatMessage({id: 'Company'})}
                        fieldName={'company'}
                        formik={formik}
                        placeholder={formatMessage({id: 'Enter Company Name'})}
                        toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.GENERAL.COMPANY'})}
                        margin='me-4'
                        width={5}
                        isStarRequired={true}
                      />
                      <TextInput
                        fieldType={'url'}
                        fieldName={'website'}
                        formik={formik}
                        placeholder={''}
                        label={formatMessage({id: 'Website'})}
                        toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.GENERAL.WEBSITE'})}
                        width={5}
                        margin='me-6'
                        isStarRequired={true}
                      />
                      <TextInput
                        fieldType={'text'}
                        label={formatMessage({id: 'Description'})}
                        fieldName={'description'}
                        formik={formik}
                        placeholder={formatMessage({id: 'Enter Description'})}
                        toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.GENERAL.DESCRIPTION'})}
                        margin='me-4'
                        width={5}
                        isStarRequired={true}
                      />
                      <TextInput
                        fieldType={'number'}
                        fieldName={'phone'}
                        formik={formik}
                        placeholder={formatMessage({id: 'Please Enter Your Number'})}
                        margin='me-6'
                        label={formatMessage({id: 'Phone'})}
                        toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.GENERAL.CONTACT_NUMBER'})}
                        width={5}
                        isStarRequired={true}
                      />
                      <Country
                        initialValues={initialValues}
                        formik={formik}
                        label={formatMessage({id: 'Country'})}
                        setCountryId={setCountryId}
                        tooltipText={formatMessage({id: 'GLOBAL.TOOLTIP.GENERAL.COUNTRY'})}
                        width={5}
                      />
                      <TextInput
                        fieldType={'number'}
                        label={formatMessage({id: 'Exits'})}
                        fieldName={'exits'}
                        formik={formik}
                        placeholder={formatMessage({id: 'Enter Exits'})}
                        toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.GENERAL.EXITS'})}
                        margin='me-4'
                        width={5}
                        isStarRequired={true}
                      />
                      <div className='highlight-multi-select font-size-12 text-bold  ms-2 mt-0'>
                       <div className='d-flex'>
                       <p className='mb-1 font-size-13 form-label text-dark'>{formatMessage({id:"Industry*"})}</p>
                        <ToolTipUI
                          tooltipText={formatMessage({id: 'GLOBAL.TOOLTIP.GENERAL.INDUSTRY'})}
                        />
                       </div>
                        <Select
                          isMulti
                          name='industry'
                          options={industryData}
                          className='basic-multi-select w-md-425px w-350px custom-select'
                          onChange={(industry) => setIndustry(industry)}
                          placeholder={formatMessage({id: 'Choose Investor type'})}
                          value={initialIndustry}
                          classNamePrefix="react-select"
                        />
                      </div>
                      <div className='mt-md-3 mt-5 w-100'>
                        <div className='fs-4 fw-bold mb-4'>
                          {formatMessage({id: 'Social Media'})}
                        </div>
                        {investorsocialMediaData.map(
                          ({id, icon, iconLable, placeholder, fieldName}: socialMediaType) => (
                            <div className='d-flex flex-md-row  mb-md-4 social-media' key={id}>
                              <div className='d-flex flex-row align-items-md-center me-md-3'>
                                <img
                                  src={toAbsoluteUrl(`/media/icons/duotune/social/${icon}`)}
                                  width='20px'
                                  height='20px'
                                  alt={iconLable}
                                />
                              </div>
                              <TextInput
                                fieldType={'url'}
                                fieldName={fieldName}
                                formik={formik}
                                placeholder={formatMessage({id: placeholder})}
                                label={formatMessage({id: iconLable})}
                                width={12}
                                isBeside={true}
                                isTooltipNotRequired={true}
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div className='d-flex justify-content-end button-margin mt-4'>
                      <CustomButton
                        isSubmitting={formik.isSubmitting}
                        isValid={formik.isValid}
                        buttonText={formatMessage({id: 'Save Changes'})}
                        loading={loading}
                        widthLoading={2}
                        width={2}
                        margin={'me-5'}
                      />
                    </div>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}
