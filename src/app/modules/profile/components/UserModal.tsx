import {Formik} from 'formik'
import React, {Dispatch, SetStateAction, useState} from 'react'
import {Form, Modal} from 'react-bootstrap'
import {useIntl} from 'react-intl'
import TextInput from '../../widgets/components/Input/TextInput'
import {CustomButton} from '../../widgets/components/UI/CustomButton'
import * as Yup from 'yup'
import {ToolTipUI} from '../../widgets/components/UI/ToolTipUI'
import {addUser, editUser} from '../core/_requests'
import {Roles} from '../core/_constants'
import {toast} from 'react-toastify'
import {useAuth} from '../../auth'
import {Spinner} from '../../widgets/components/General/Spinner'
import {BasicButton} from '../../widgets/components/UI/BasicButton'

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  designation: '',
  roles: '',
}

const UserModal = ({
  title,
  buttonText,
  addModal,
  setAddModal,
  flag,
  userDetails,
  getUserList,
  getPendingUsers,
  getUserApiSpinner
}: {
  title: string
  buttonText: string
  addModal: boolean
  setAddModal: Dispatch<SetStateAction<boolean>>
  flag: boolean
  userDetails?: any
  getUserList: any
  getPendingUsers?: any
  getUserApiSpinner?: boolean
}) => {
  const {formatMessage} = useIntl()
  const [loading, setLoading] = useState(false)
  const {companyId} = useAuth()

  const userSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(1, formatMessage({id: 'Minimum 1 character is required'}))
      .max(50, formatMessage({id: 'Maximum 50 characters'}))
      .required(formatMessage({id: 'Full name is required'}))
      .nullable(),
    lastname: Yup.string()
      .min(1, formatMessage({id: 'Minimum 1 character is required'}))
      .max(50, formatMessage({id: 'Maximum 50 characters'}))
      .required(formatMessage({id: 'Last name is required'}))
      .nullable(),
    email: Yup.string()
      .email(formatMessage({id: 'Invalid email format'}))
      .max(50, formatMessage({id: 'Maximum 50 characters'}))
      .required(formatMessage({id: 'Email is required'})),
    designation: Yup.string()
      .min(1, formatMessage({id: 'Minimum 1 character is required'}))
      .max(50, formatMessage({id: 'Maximum 50 characters'}))
      .required(formatMessage({id: 'Last name is required'}))
      .nullable(),
    roles: Yup.string()
      .required(formatMessage({id: 'Role is required'}))
      .nullable(),
  })

  const onSubmit = async (values: any) => {
    try {
      setLoading(true)
      if (!flag) {
        const payload = {
          companyId: companyId?.toString(),
          Users: [
            {
              firstName: values.firstname,
              lastName: values.lastname,
              email: values.email,
              designation: values.designation,
              roleId: [values.roles],
            },
          ],
        }
        const {
          data: {success, errors},
        } = await addUser(payload)
        if (success) {
          setLoading(false)
          setAddModal(!addModal)
          getPendingUsers()
          toast.success(formatMessage({id: 'User Invited'}))
        } else {
          setLoading(false)
          setAddModal(!addModal)
          errors.forEach((error: string) => {
            toast.error(formatMessage({id: error}))
          })
        }
      } else {
        const payload = {
          companyId: companyId,
          firstName: values.firstname,
          lastName: values.lastname,
          email: values.email,
          designation: values.designation,
          roles: [values.roles],
        }

        const {
          data: {success, errors},
        } = await editUser(userDetails?.userId, payload)
        if (success) {
          setLoading(false)
          setAddModal(!addModal)
          toast.success(formatMessage({id: 'User Updated'}))
          getUserList()
        } else {
          setLoading(false)
          errors.forEach((error: string) => {
            toast.error(formatMessage({id: error}))
          })
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  if (flag) {
    initialValues.firstname = userDetails?.firstName
    initialValues.lastname = userDetails?.lastName
    initialValues.email = userDetails?.email
    initialValues.designation = userDetails?.designation
    initialValues.roles = userDetails?.userRoles[0].roleId
  } else {
    initialValues.firstname = ''
    initialValues.lastname = ''
    initialValues.email = ''
    initialValues.designation = ''
    initialValues.roles = ''
  }
  return (
    <>
      <div>
        <Modal
          show={addModal}
          onHide={() => setAddModal(!addModal)}
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          {getUserApiSpinner ? <Spinner placement={true} /> : null}
          <Modal.Header closeButton>
            <h2>{title}</h2>
          </Modal.Header>
          <Formik initialValues={initialValues} validationSchema={userSchema} onSubmit={onSubmit}>
            {(formik) => {
              return (
                <Form>
                  <Modal.Body>
                    <div className='row'>
                      <div className='col-6'>
                        <TextInput
                          fieldType={'text'}
                          fieldName={'firstname'}
                          formik={formik}
                          placeholder={formatMessage({id: 'Enter First Name'})}
                          label={formatMessage({id: 'First Name'})}
                          isTooltipNotRequired={true}
                        />
                      </div>
                      <div className='col-6'>
                        <TextInput
                          fieldType={'text'}
                          fieldName={'lastname'}
                          formik={formik}
                          placeholder={formatMessage({id: 'Enter Last Name'})}
                          label={formatMessage({id: 'Last name'})}
                          isTooltipNotRequired={true}
                        />
                      </div>
                    </div>

                    <TextInput
                      fieldType={'text'}
                      fieldName={'email'}
                      formik={formik}
                      placeholder={formatMessage({id: 'Enter email'})}
                      label={formatMessage({id: 'Email Address'})}
                      isTooltipNotRequired={true}
                    />
                    <TextInput
                      fieldType={'text'}
                      fieldName={'designation'}
                      formik={formik}
                      placeholder={formatMessage({id: 'Enter designation'})}
                      label={formatMessage({id: 'Designation'})}
                      isTooltipNotRequired={true}
                    />
                    <div className='col-12 mb-4'>
                      <label className='ps-0 font-size-13'>
                        {formatMessage({id: 'Assign Role'})}
                        <ToolTipUI tooltipText={formatMessage({id: 'Assign Role'})} />
                      </label>
                    </div>
                    <div className='row'>
                      <div className='col-6'>
                        <TextInput
                          fieldName={'roles'}
                          formik={formik}
                          customText={formatMessage({id: 'Admin'})}
                          placeholder=''
                          fieldType={'radio'}
                          isCheckbox={true}
                          isWidthNotRequired={false}
                          margin='0'
                          isRadio={true}
                          value={Roles.ADMIN}
                        />
                      </div>
                      <div className='col-6'>
                        <TextInput
                          fieldName={'roles'}
                          formik={formik}
                          customText={formatMessage({id: 'Billing Manager'})}
                          placeholder=''
                          fieldType={'radio'}
                          isCheckbox={true}
                          isWidthNotRequired={false}
                          margin='0'
                          isRadio={true}
                          value={Roles.BILLING}
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-6'>
                        <TextInput
                          fieldName={'roles'}
                          formik={formik}
                          customText={formatMessage({id: 'Investor Curator'})}
                          placeholder=''
                          fieldType={'radio'}
                          isCheckbox={true}
                          isWidthNotRequired={false}
                          margin='0'
                          isRadio={true}
                          value={Roles.CURATOR}
                        />
                      </div>
                      <div className='col-6'>
                        <TextInput
                          fieldName={'roles'}
                          formik={formik}
                          customText={formatMessage({id: 'Fund Raise Manager'})}
                          placeholder=''
                          fieldType={'radio'}
                          isCheckbox={true}
                          isWidthNotRequired={false}
                          margin='0'
                          isRadio={true}
                          value={Roles.FRM}
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-6'>
                        <TextInput
                          fieldName={'roles'}
                          formik={formik}
                          customText={formatMessage({id: 'Investor Relationship Manager'})}
                          placeholder=''
                          fieldType={'radio'}
                          isCheckbox={true}
                          isWidthNotRequired={false}
                          margin='0'
                          isRadio={true}
                          value={Roles.IRM}
                        />
                      </div>
                      <div className='col-6'>
                        <TextInput
                          fieldName={'roles'}
                          formik={formik}
                          customText={formatMessage({id: 'Super Admin (Owner)'})}
                          placeholder=''
                          fieldType={'radio'}
                          isCheckbox={true}
                          isWidthNotRequired={false}
                          margin='0'
                          isRadio={true}
                          value={Roles.OWNER}
                        />
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <div className='d-flex flex-wrap gap-3'>
                      <BasicButton
                        buttonText={formatMessage({id: 'Discard'})}
                        border='none'
                        color='#F5F8FA'
                        textColor='#5E6278'
                        minWidth={90}
                        height='44px'
                        onClick={() => formik.resetForm()}
                      />

                      <CustomButton
                        isSubmitting={formik.isSubmitting}
                        isValid={formik.isValid}
                        buttonText={buttonText}
                        loading={loading}
                        height={44}
                        widthLoading={1}
                        width={1}
                        margin={'me-0'}
                        onSubmit={formik.handleSubmit}
                        marginButtom='0'
                      />
                    </div>
                  </Modal.Footer>
                </Form>
              )
            }}
          </Formik>
        </Modal>
      </div>
    </>
  )
}

export default UserModal
