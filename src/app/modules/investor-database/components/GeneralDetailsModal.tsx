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
import {updateInvestor} from '../core/_requests'
import {toast} from 'react-toastify'
import {useParams} from 'react-router-dom'
import {Modal} from 'react-bootstrap'

const initialValues = {
  investorName: '',
  company: '',
  description: '',
  phone: '',
  country: '',
  website: '',
  socialMedia: {
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
  },
  profileImageId: '',
}

export function GeneralDetailsModal({
  setGeneralDetailsModalShow,
  generalDetailsModalShow,
  individualInvestor,
  singleInvestor,
}: any) {
  const {formatMessage} = useIntl()
  const [imgName, setImgName] = useState<string>()
  const [modelStatus, setModelStatus] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [, setCountryId] = useState<string | undefined>()
  const [, setInvestorId] = useState<string>()
  const {id} = useParams()

  const userSchema = Yup.object().shape({
    investorName: Yup.string()
      .min(1, formatMessage({id: 'Minimum 1 character is required'}))
      .max(50, formatMessage({id: 'Maximum 50 characters'}))
      .nullable(),
    company: Yup.string()
      .min(1, formatMessage({id: 'Minimum 1 character is required'}))
      .max(50, formatMessage({id: 'Maximum 50 characters'}))
      .nullable(),
    description: Yup.string().nullable(),
    phone: Yup.string()
      .min(6, formatMessage({id: 'Minimum 6 digits'}))
      .max(10, formatMessage({id: 'Maximum 10 digits'}))
      .nullable(),
    country: Yup.string().nullable(),
    website: Yup.string()
      .url(formatMessage({id: formatMessage({id: 'Please Enter the valid URL'})}))
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
    if (id) {
      try {
        setLoading(true)
        let payload;
        if(values.profileImageId){
           payload = {
            name: values.investorName,
            company: values.company,
            description: values.description,
            phone: values.phone,
            countryId: +values.country,
            website: values.website,
            facebook_url: values.socialMedia.facebook,
            twitter_url: values.socialMedia.twitter,
            linkedin_url: values.socialMedia.linkedin,
            insta_url: values.socialMedia.instagram,
            fileId: values.profileImageId,
          }
        }
        else{
           payload = {
            name: values.investorName,
            company: values.company,
            description: values.description,
            phone: values.phone,
            countryId: +values.country,
            website: values.website,
            facebook_url: values.socialMedia.facebook,
            twitter_url: values.socialMedia.twitter,
            linkedin_url: values.socialMedia.linkedin,
            insta_url: values.socialMedia.instagram,
          }
        }
        const {
          data: {data: investor, success, errors},
        } = await updateInvestor(+id, payload)
        if (success) {
          setInvestorId(investor.investorId)
          toast.success(formatMessage({id: 'Investor updated successfully'}))
          setLoading(false)
          singleInvestor()
          setGeneralDetailsModalShow(false)
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
  }

  useEffect(() => {
    if (individualInvestor) {
      setImgName(individualInvestor?.file?.name)
      initialValues.investorName = individualInvestor?.name
      initialValues.description = individualInvestor?.description
      initialValues.company = individualInvestor?.company
      initialValues.phone = individualInvestor?.phone
      initialValues.website = individualInvestor?.website
      initialValues.country = individualInvestor?.countryId
      initialValues.socialMedia.facebook = individualInvestor?.facebook_url
      initialValues.socialMedia.twitter = individualInvestor?.twitter_url
      initialValues.socialMedia.linkedin = individualInvestor?.linkedin_url
      initialValues.socialMedia.instagram = individualInvestor?.insta_url
    }
  }, [individualInvestor])

  const handleOpen = () => {
    setModelStatus(true)
  }
  const handleClose = () => {
    setModelStatus(false)
  }

  return (
    <>
      <Toaster />
      <Modal
        size='lg'
        show={generalDetailsModalShow}
        onHide={() => {
          setGeneralDetailsModalShow(false)
        }}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <h2>{formatMessage({id: 'Edit General Details'})}</h2>
        </Modal.Header>
        <div className=' create-investor-container company-container'>
          <div className=''>
            {/* file upload  */}
            <Formik initialValues={initialValues} validationSchema={userSchema} onSubmit={onSubmit}>
              {(formik) => {
                return (
                  <Form>
                    <Modal.Body>
                      <div className='create-investor-container company-container d-md-flex col-md-12 flex-wrap'>
                        <div className='row d-md-flex justify-content-between w-100'>
                          <div className='col-md-6'>
                            <p className='font-size-13'>{formatMessage({id: 'Profile Picture'})}</p>
                            <div
                              className={`card position-relative d-flex justify-content-center ms-0 ps-0 mt-0 pt-0`}
                              onClick={handleOpen}
                            >
                              <DisplayImage
                                imgName={imgName}
                                width='100%'
                                fit='contain'
                                alt='profile'
                              />

                              <div className='pencil-container'>
                                <img
                                  src={toAbsoluteUrl('/media/icons/duotune/general/pencil.svg')}
                                  alt=''
                                />
                              </div>
                            </div>
                            <p className='font-size-12 text-clrA8 mt-2'>
                              {formatMessage({id: 'Allowed file types: png, jpg, jpeg.'})}
                            </p>
                          </div>
                          <div className='col-md-6'>
                            <TextInput
                              fieldType={'text'}
                              label={formatMessage({id: "Investor's Name"})}
                              fieldName={'investorName'}
                              formik={formik}
                              placeholder={formatMessage({id: "Enter Investor's Name"})}
                              toolTipText={formatMessage({
                                id: 'GLOBAL.TOOLTIP.GENERAL.INVESTOR_NAME',
                              })}
                              margin='me-6'
                              isStarRequired={false}
                            />
                            <TextInput
                              fieldType={'text'}
                              label={formatMessage({id: 'Company'})}
                              fieldName={'company'}
                              formik={formik}
                              placeholder={formatMessage({id: 'Enter Company Name'})}
                              toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.GENERAL.COMPANY'})}
                              margin='me-4'
                              isStarRequired={false}
                            />
                          </div>
                        </div>

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
                        <div className='row d-md-flex justify-content-between w-100'>
                          <div className='col-md-6'>
                            <TextInput
                              fieldType={'url'}
                              fieldName={'website'}
                              formik={formik}
                              placeholder={''}
                              label={formatMessage({id: 'Website'})}
                              toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.GENERAL.WEBSITE'})}
                              margin='me-6'
                              isStarRequired={false}
                            />
                          </div>
                          <div className='col-md-6'>
                            <TextInput
                              fieldType={'text'}
                              label={formatMessage({id: 'Description'})}
                              fieldName={'description'}
                              formik={formik}
                              placeholder={formatMessage({id: 'Enter Description'})}
                              toolTipText={formatMessage({
                                id: 'GLOBAL.TOOLTIP.GENERAL.DESCRIPTION',
                              })}
                              margin='me-4'
                              isStarRequired={false}
                            />
                          </div>
                        </div>
                        <div className='row d-md-flex justify-content-between w-100'>
                          <div className='col-md-6'>
                            <TextInput
                              fieldType={'number'}
                              fieldName={'phone'}
                              formik={formik}
                              placeholder={formatMessage({id: 'Please Enter Your Number'})}
                              margin='me-6'
                              label={formatMessage({id: 'Phone'})}
                              toolTipText={formatMessage({
                                id: 'GLOBAL.TOOLTIP.GENERAL.CONTACT_NUMBER',
                              })}
                              isStarRequired={false}
                            />
                          </div>
                          <div className='col-md-6'>
                            <Country
                              initialValues={initialValues}
                              formik={formik}
                              label={formatMessage({id: 'Country'})}
                              setCountryId={setCountryId}
                              tooltipText={formatMessage({id: 'GLOBAL.TOOLTIP.GENERAL.COUNTRY'})}
                              isStarRequired={false}
                            />
                          </div>
                        </div>
                        <div className='mt-md-3 mt-5 w-100'>
                          <div className='fs-4 fw-bold mb-4'>
                            {formatMessage({id: 'Social Media'})}
                          </div>
                          {investorsocialMediaData.map(
                            ({id, icon, iconLable, placeholder, fieldName}: socialMediaType) => (
                              <div className='d-flex flex-md-row mb-md-4 social-media' key={id}>
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
                    </Modal.Body>
                    <Modal.Footer className='p-0 font-weight-400'>
                      <button
                        type='button'
                        className='btn btn-light font-size-13 font-weight-400'
                        onClick={() => {
                          setGeneralDetailsModalShow(false)
                        }}
                      >
                        {formatMessage({id: 'Cancel'})}
                      </button>
                      <CustomButton
                        isSubmitting={formik.isSubmitting}
                        isValid={formik.isValid}
                        buttonText={formatMessage({id: 'Add Details'})}
                        loading={loading}
                        widthLoading={2}
                        width={2}
                        margin={'me-5 mt-5'}
                      />
                    </Modal.Footer>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </div>
      </Modal>
    </>
  )
}
