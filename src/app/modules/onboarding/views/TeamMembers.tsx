import {FieldArray, Formik, Form} from 'formik'
import React, {useState} from 'react'
import {SelectInput} from '../../widgets/components/Input/SelectInput'
import TextInput from '../../widgets/components/Input/TextInput'
import {CustomButton} from '../../widgets/components/UI/CustomButton'
import {InfoCard} from '../../widgets/components/UI/InfoCard'
import * as Yup from 'yup'
import {useIntl} from 'react-intl'
import {inviteUser} from '../core/_requests'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../../auth'
import {designationOptions} from '../../../core/_constants'
import {Loader} from '../../widgets/components/General/Loader'
import {toast} from 'react-toastify'
import {Toaster} from '../../widgets/components/General/Toaster'

const teamMembersFields = {
  firstName: '',
  lastName: '',
  email: '',
  designation: '',
}

const initialValues = {
  teamMembers: [teamMembersFields],
}

export const TeamMembers = () => {
  const {formatMessage} = useIntl()
  const [loading] = useState(false)
  const [skipLoading, setSkipLoading] = useState(false)
  const [inviteLoading, setInviteLoading] = useState(false)

  const navigate = useNavigate()
  const {setNewCompany, companyId} = useAuth()
  const teamMembersSchema = Yup.object().shape({
    teamMembers: Yup.array()
      .of(
        Yup.object().shape({
          firstName: Yup.string()
            .min(3, formatMessage({id: 'Minimum 3 characters'}))
            .max(50, formatMessage({id: 'Maximum 50 characters'}))
            .required(formatMessage({id: 'First name is required'})),
          email: Yup.string()
            .email(formatMessage({id: 'Invalid email format'}))
            .max(50, formatMessage({id: 'Maximum 50 characters'}))
            .required(formatMessage({id: 'Email is required'})),
          lastName: Yup.string()
            .max(50, formatMessage({id: 'Maximum 50 characters'}))
            .required(formatMessage({id: 'Last name is required'})),
          designation: Yup.string().required(formatMessage({id: 'Designation is required'})), // these constraints take precedence
        })
      )
      .required(formatMessage({id: 'Must have team members'})) // these constraints are shown if and only if inner constraints are satisfied
      .min(1, formatMessage({id: 'Minimum of 1 team member'})),
  })
  const onSkip = async () => {
    setSkipLoading(true)
    setNewCompany(undefined)
    setSkipLoading(false)
    navigate('/dashboard')
  }

  const onSubmit = async (values: any) => {
    try {
      setInviteLoading(true)
      if (!companyId) {
        setInviteLoading(false)
        throw new Error(formatMessage({id: 'Company ID is required.'}))
      }
      const {
        data: {success, errors},
      } = await inviteUser(companyId.toString(), values.teamMembers)
      if (success) {
        setNewCompany(undefined)
        setInviteLoading(false)
        navigate('/dashboard')
      } else {
        setInviteLoading(false)
        setNewCompany(undefined)
        errors.forEach((error: string) => {
          toast.error(formatMessage({id: error}))
        })
      }
    } catch (error) {
      setInviteLoading(false)
      setNewCompany(undefined)
      console.error(error)
    }
  }

  return (
    <>
      <Toaster />
      {!loading ? (
        <Formik
          validationSchema={teamMembersSchema}
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form className='company-container d-flex justify-content-between col-12'>
                <div className='mb-11 col-12 mt-4'>
                  <div className='d-md-flex flex-md-row justify-content-md-between d-flex flex-column col-12'>
                    <div className='col-md-6 col-12'>
                      <h1 className='text-dark fw-bolder mb-3'>
                        {formatMessage({id: 'Team Members'})}
                      </h1>
                      <div className='text-gray-500  fs-4'>
                        {formatMessage({id: 'Add team members to collaborate better'})}
                      </div>
                    </div>
                    <div className='col-md-6 col-12 mt-6 mt-md-0'>
                      <InfoCard
                        title={formatMessage({id: 'Why team members are invited?'})}
                        desc={formatMessage({
                          id: 'Give team members controlled access to your Foundercrate account. Roles protect your sensitive information and restrict...',
                        })}
                        slug={'#'}
                      />
                    </div>
                    <div className='d-md-none d-flex'>
                      <CustomButton
                        buttonText={formatMessage({id: 'Skip'})}
                        loading={loading}
                        width={1}
                        margin={'me-3'}
                        buttonColor={'btn-secondary'}
                        isSkipButton={true}
                        onSkip={onSkip}
                      />
                    </div>
                  </div>
                  <div className='mt-md-19 mt-4'>
                    <FieldArray
                      name='teamMembers'
                      render={(arrayHelpers) => {
                        return (
                          <>
                            {formik.values.teamMembers.map((_, index) => (
                              <div key={index} className='mb-8'>
                                {index !== 0 ? (
                                  <div className='fw-semibold fs-4'>
                                    {`${formatMessage({id: 'Member'})} ${index + 1}`}
                                  </div>
                                ) : (
                                  <div className='fw-semibold fs-4'>
                                    {formatMessage({id: 'Add first Member'})}
                                  </div>
                                )}
                                <div className='mb-3'></div>
                                <div className='d-md-flex  col-12 col-md-12'>
                                  <TextInput
                                    fieldType={'text'}
                                    label={formatMessage({id: 'First Name'})}
                                    fieldName={`teamMembers[${index}].firstName`}
                                    placeholder={formatMessage({
                                      id: 'Enter First Name',
                                    })}
                                    formik={formik}
                                    margin={'me-6'}
                                    isFieldArray={true}
                                    toolTipText={formatMessage({
                                      id: 'GLOBAL.TOOLTIP.TEAM_MEMBERS.FIRST_NAME',
                                    })}
                                    width={3}
                                  />
                                  <TextInput
                                    fieldType={'text'}
                                    label={formatMessage({id: 'Last Name'})}
                                    fieldName={`teamMembers[${index}].lastName`}
                                    placeholder={formatMessage({
                                      id: 'Enter Last Name',
                                    })}
                                    formik={formik}
                                    margin={'me-6'}
                                    isFieldArray={true}
                                    toolTipText={formatMessage({
                                      id: 'GLOBAL.TOOLTIP.TEAM_MEMBERS.LAST_NAME',
                                    })}
                                    width={3}
                                  />
                                  <TextInput
                                    fieldType={'email'}
                                    label={formatMessage({id: 'Email Address'})}
                                    fieldName={`teamMembers[${index}].email`}
                                    placeholder={formatMessage({
                                      id: 'Enter Email Address',
                                    })}
                                    formik={formik}
                                    margin={'me-6'}
                                    isFieldArray={true}
                                    toolTipText={formatMessage({
                                      id: 'GLOBAL.TOOLTIP.TEAM_MEMBERS.EMAIL',
                                    })}
                                    width={3}
                                  />
                                  <SelectInput
                                    label={formatMessage({
                                      id: 'Designation',
                                    })}
                                    fieldName={`teamMembers[${index}].designation`}
                                    placeholder={formatMessage({
                                      id: 'Select Designation',
                                    })}
                                    formik={formik}
                                    toolTipText={formatMessage({
                                      id: 'GLOBAL.TOOLTIP.TEAM_MEMBERS.DESIGNATION',
                                    })}
                                    margin={'me-0'}
                                    options={designationOptions}
                                    isFieldArray={true}
                                    width={3 - 5}
                                  />
                                </div>
                                {index === formik.values.teamMembers.length - 1 && (
                                  <div className='d-flex justify-content-end'>
                                    {index !== 0 && (
                                      <button
                                        className='btn btn-secondary me-5'
                                        onClick={() => {
                                          arrayHelpers.remove(index)
                                        }}
                                      >
                                        {formatMessage({id: 'Remove member'})}
                                      </button>
                                    )}

                                    <button
                                      type='button'
                                      className='btn border border-primary text-primary'
                                      onClick={() =>
                                        arrayHelpers.push({
                                          firstName: '',
                                          lastName: '',
                                          email: '',
                                          designation: '',
                                        })
                                      }
                                    >
                                      {formatMessage({id: 'Add new Members'})}
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
                          </>
                        )
                      }}
                    />
                  </div>
                  <div className='d-flex justify-content-end button-margin'>
                    <div className='d-md-flex d-none'>
                      <CustomButton
                        buttonText={formatMessage({id: 'Skip'})}
                        loading={skipLoading}
                        width={1}
                        margin={'me-3'}
                        buttonColor={'btn-secondary'}
                        isSkipButton={true}
                        onSkip={onSkip}
                        height={44}
                      />
                    </div>
                    <CustomButton
                      isSubmitting={formik.isSubmitting}
                      isValid={formik.isValid}
                      buttonText={formatMessage({id: 'Send invite and continue'})}
                      loading={inviteLoading}
                      width={3}
                      height={44}
                    />
                  </div>
                </div>
              </Form>
            )
          }}
        </Formik>
      ) : (
        <Loader isTeamMember={true} />
      )}
    </>
  )
}
