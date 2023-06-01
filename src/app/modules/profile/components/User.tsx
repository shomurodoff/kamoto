import React, {Dispatch, SetStateAction, useState} from 'react'
import '../styles/index.scss'
import {toAbsoluteUrl} from '../../../../_metronic/helpers/AssetHelpers'
import TextInput from '../../widgets/components/Input/TextInput'
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import {useIntl} from 'react-intl'
import {SelectInput} from '../../widgets/components/Input/SelectInput'
import {CustomButton} from '../../widgets/components/UI/CustomButton'
import {profileData, updateProfileInfo} from '../core/_requests'
import {FileUpload} from '../../widgets/components/FileUpload'
import {designationOptions, userInitialValues} from '../core/_constants'
import {useAuth} from '../../auth'
import {ChangePasswordModal} from '../../auth/components/ChangePasswordModal'
import {forgotPassword} from '../../auth/core/_requests'
import {DisplayImage} from '../../widgets/components/General/DisplayImage'
import {toast} from 'react-toastify'
import {Spinner} from '../../widgets/components/General/Spinner'
import {ToolTipUI} from '../../widgets/components/UI/ToolTipUI'
import {BasicButton} from '../../widgets/components/UI/BasicButton'

export function User({
  key,
  setImgName,
  imgName,
  getApiLoading,
  countryOptions,
}: {
  key: number
  setImgName: Dispatch<SetStateAction<string | undefined>>
  imgName: string | undefined
  getApiLoading: boolean
  countryOptions: any
}) {
  const {formatMessage} = useIntl()

  const [modelStatus, setModelStatus] = useState<boolean>(false)
  const {companyId, currentUser, setCurrentUser} = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [changePasswordLoading, setChangePasswordLoading] = useState(false)
  const [, setHasErrors] = useState<boolean | undefined>()

  const userSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, formatMessage({id: 'Minimum 3 characters'}))
      .max(50, formatMessage({id: 'Maximum 50 characters'}))
      .required(formatMessage({id: 'First name is required'})),
    lastName: Yup.string()
      .max(50, formatMessage({id: 'Maximum 50 characters'}))
      .required(formatMessage({id: 'Last name is required'})),
    email: Yup.string()
      .email(formatMessage({id: 'Invalid email format'}))
      .max(50, formatMessage({id: 'Maximum 50 characters'}))
      .required(formatMessage({id: 'Email is required'})),
    contact: Yup.string()
      .required(formatMessage({id: 'Contact number is required'}))
      .min(6, formatMessage({id: 'Minimum 6 digits'}))
      .max(10, formatMessage({id: 'Maximum 10 digits'}))
      .nullable(),
    country: Yup.string()
      .required(formatMessage({id: 'Country is required'}))
      .nullable(),
    communication: Yup.object().shape({
      email: Yup.bool(),
      phone: Yup.bool(),
    }),
  })

  const onSubmit = async (values: any) => {
    try {
      setLoading(true)
      let {
        data: {success, errors},
      } = await updateProfileInfo({...values, country: parseInt(values.country), companyId})

      if (success) {
        if (companyId) {
          const {
            data: {success, data, errors},
          } = await profileData(companyId)
          if (success) {
            setCurrentUser({
              ...currentUser,
              firstName: data.firstName,
              profileImg: data.profileImage,
            })
            setImgName(data.profileImage)
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
            errors.forEach((error: string) => {
              toast.error(formatMessage({id: error}))
            })
          }
        }
        setLoading(false)
        toast.success(formatMessage({id: 'Profile updated successfully'}))
      } else if (errors) {
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

  const getForgotedPassword = async () => {
    if (currentUser?.email) {
      try {
        setChangePasswordLoading(true)
        const {
          data: {success},
        } = await forgotPassword(currentUser?.email)
        if (success) {
          setShowModal(true)
          setHasErrors(false)
        } else {
          setHasErrors(true)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setChangePasswordLoading(false)
      }
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
      {getApiLoading ? <Spinner /> : null}
      <div className='g-5 g-xxl-8 settings-container'>
        <div className='col-xl-12 d-md-flex mt-0 px-2'>
          {/* file upload  */}
          <div className='pt-1'>
            <div
              className={`card position-relative d-flex justify-content-center`}
              onClick={handleOpen}
            >
              <DisplayImage imgName={imgName} width='100%' fit='contain' alt='profile' />

              <div className='pencil-container'>
                <img src={toAbsoluteUrl('/media/icons/duotune/general/pencil.svg')} alt='' />
              </div>
            </div>
          </div>

          <div className='mt-md-8 ms-md-16 w-100'>
            <Formik
              initialValues={userInitialValues}
              validationSchema={userSchema}
              onSubmit={onSubmit}
            >
              {(formik) => {
                return (
                  <Form>
                    <div className='d-md-flex col-md-12 flex-wrap'>
                      <TextInput
                        fieldType={'text'}
                        label={formatMessage({id: 'First Name'})}
                        fieldName={'firstName'}
                        formik={formik}
                        placeholder=''
                        margin='me-6'
                        toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.USER.FIRST_NAME'})}
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
                        label={formatMessage({id: 'Last Name'})}
                        fieldName={'lastName'}
                        formik={formik}
                        placeholder=''
                        margin='me-4'
                        toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.USER.LAST_NAME'})}
                        width={5}
                        isStarRequired={true}
                      />
                      <SelectInput
                        label={formatMessage({id: 'Position'})}
                        fieldName={'designation'}
                        placeholder={formatMessage({id: 'Select your Position'})}
                        formik={formik}
                        toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.USER.POSITION'})}
                        options={designationOptions}
                        margin='me-6'
                        width={5}
                      />
                      <TextInput
                        fieldType={'email'}
                        fieldName={'email'}
                        formik={formik}
                        placeholder={''}
                        label={formatMessage({id: 'Email Address'})}
                        toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.USER.EMAIL'})}
                        width={5}
                        isStarRequired={true}
                      />
                      <TextInput
                        fieldType={'number'}
                        fieldName={'contact'}
                        formik={formik}
                        placeholder={''}
                        margin='me-6'
                        label={formatMessage({id: 'Contact Number'})}
                        toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.USER.CONTACT_NUMBER'})}
                        width={5}
                        isStarRequired={true}
                      />
                      <SelectInput
                        label={formatMessage({id: 'User’s Country'})}
                        fieldName={'country'}
                        placeholder={formatMessage({id: 'Select the Country'})}
                        formik={formik}
                        toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.USER.COUNTRY'})}
                        options={countryOptions}
                        width={5}
                        margin={'me-6'}
                      />
                      <div className='d-md-flex flex-md-column'>
                        <div className='d-inline-block form-label mb-md-5  text-dark font-size-13'>
                          {formatMessage({id: 'Communication'})}{' '}
                          <ToolTipUI
                            tooltipText={formatMessage({id: 'GLOBAL.TOOLTIP.USER.COMMUNICATION'})}
                          />
                        </div>
                        <div className='d-md-flex'>
                          <TextInput
                            fieldName={'communication.email'}
                            formik={formik}
                            customText={formatMessage({id: 'Email'})}
                            placeholder=''
                            fieldType={'checkbox'}
                            isCheckbox={true}
                            margin={'me-20 pe-15'}
                          />
                          <TextInput
                            fieldName={'communication.phone'}
                            formik={formik}
                            customText={formatMessage({id: 'Phone'})}
                            placeholder=''
                            fieldType={'checkbox'}
                            isCheckbox={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='d-md-flex justify-content-end button-margin me-10'>
                      <div className='d-grid mb-10 me-3 '>
                        <BasicButton
                          buttonText={formatMessage({id: 'Change password'})}
                          onClick={getForgotedPassword}
                          disabled={changePasswordLoading}
                          loading={changePasswordLoading}
                          height='44px'
                          border='1px solid #4776E6'
                          color='white'
                          textColor='#4776E6'
                          padding='12px 24px'
                        />
                      </div>
                      <CustomButton
                        isSubmitting={formik.isSubmitting}
                        isValid={formik.isValid}
                        buttonText={formatMessage({id: 'Save Changes'})}
                        loading={loading}
                        width={2}
                        widthLoading={2}
                        margin={'me-3'}
                        height={44}
                      />
                    </div>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </div>
        <ChangePasswordModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          setShowModal={setShowModal}
        />
      </div>
    </>
  )
}
