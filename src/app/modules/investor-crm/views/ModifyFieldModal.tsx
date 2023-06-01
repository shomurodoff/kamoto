import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap'
import {FieldArray, Formik, Form} from 'formik'
import TextInput from '../../widgets/components/Input/TextInput'
import {KTSVG} from '../../../../_metronic/helpers'
import * as Yup from 'yup'
import {useIntl} from 'react-intl'
import {BasicButton} from '../../widgets/components/UI/BasicButton'
import {
  addCustomField,
  deleteCustomField,
  getCustomField,
  updateCustomField,
} from '../core/_requests'
import {CustomButton} from '../../widgets/components/UI/CustomButton'
import {toast} from 'react-toastify'
const ModifyFieldModal = ({
  setModifyFieldModal,
  modifyFieldModal,
  investorId,
  state,
  status,
  setStatus,
  setCustomFieldData,
}: {
  setModifyFieldModal: Dispatch<SetStateAction<boolean>>
  modifyFieldModal: boolean
  investorId: string | undefined
  state: any
  status: boolean
  setStatus: Dispatch<SetStateAction<boolean>>
  setCustomFieldData?: Dispatch<SetStateAction<{field: string; value: string} | undefined>>
}) => {
  const {formatMessage} = useIntl()
  const modifyField = {
    field: '',
    value: '',
  }
  const [customField, setCustomField] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const [customId, setCustomId] = useState<any>()
  const [values, setValue] = useState<any>()
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState(false)
  const [valueError, setValueError] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)
  const initialValues = {
    customFields: [modifyField],
  }

  const userSchema = Yup.object().shape({
    customFields: Yup.array()
      .of(
        Yup.object().shape({
          field: Yup.string().required('Name is required').nullable(),
          value: Yup.string().required('Value is required').nullable(),
        })
      )
      .required(formatMessage({id: 'Must have custom fields'})) // these constraints are shown if and only if inner constraints are satisfied
      .min(1, formatMessage({id: 'Minimum of 1 custom field'})),
  })

  const getAllCustomField = async () => {
    try {
      if (investorId) {
        const {
          data: {data, success, errors},
        } = await getCustomField(+investorId, state.roundId)
        if (success) {
          setCustomField(data)
          if (data.length > 0) {
            setCustomFieldData!(data)
          } else {
            setCustomFieldData!(undefined)
          }
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
    getAllCustomField()
  }, [state.roundId, investorId]) // eslint-disable-line react-hooks/exhaustive-deps
  
  const onSubmit = async (value: any, {resetForm}: any) => {
    try {
      setLoading(true)
      if (investorId) {
        const {
          data: {success, errors},
        } = await addCustomField({...value, investorId: +investorId, roundId: state.roundId})
        if (success) {
          toast.success(formatMessage({id: 'field created successfully'}))
          getAllCustomField()
          setLoading(false)
          setStatus(false)
          resetForm()
        } else {
          errors.forEach((error: string) => {
            toast.error(formatMessage({id: error}))
          })
          setLoading(false)
        }
      }
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  const handleUpdate = async (customId: number) => {
    try {
      setUpdateLoading(true)
      setSubmitted(true)
      if (name && values) {
        setNameError(false)
        setValueError(false)
        if (investorId) {
          const {
            data: {success, errors},
          } = await updateCustomField(customId, {
            investorId: +investorId,
            roundId: state.roundId,
            field: name,
            value: values,
          })
          if (success) {
            getAllCustomField()
            setIsEditable(false)
            toast.success(formatMessage({id: 'field updated successfully'}))
            setSubmitted(false)
            setUpdateLoading(false)
          } else {
            setUpdateLoading(false)
            errors.forEach((error: string) => {
              toast.error(formatMessage({id: error}))
            })
          }
        }
      } else if (name === '' && !values) {
        setNameError(true)
        setValueError(true)
        setUpdateLoading(false)
      } else if (!values) {
        setValueError(true)
        setUpdateLoading(false)
      } else if (name === '') {
        setNameError(true)
        setUpdateLoading(false)
      }
    } catch (err) {
      console.log(err)
      setUpdateLoading(false)
    }
  }

  useEffect(() => {
    if (name) {
      setNameError(false)
    }
    if (values) {
      setValueError(false)
      if (name === '') {
        setNameError(true)
      }
      if (!values) {
        setValueError(true)
      }
      if (name === '' && values === '') {
        setNameError(true)
        setValueError(true)
      }
    }
  }, [name, values])
  const handleDelete = async (id: number) => {
    try {
      const {
        data: {success, errors},
      } = await deleteCustomField(id)
      if (success) {
        getAllCustomField()
        toast.success(formatMessage({id: 'field deleted successfully'}))
      } else {
        errors.forEach((error: string) => {
          toast.error(formatMessage({id: error}))
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <div>
        <Modal
          size='lg'
          show={modifyFieldModal}
          onHide={() => setModifyFieldModal(false)}
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <Formik initialValues={initialValues} validationSchema={userSchema} onSubmit={onSubmit}>
            {(formik) => {
              return (
                <Form>
                  <Modal.Header closeButton>
                    <h2>{formatMessage({id: 'Modify Fields'})}</h2>
                  </Modal.Header>
                  <Modal.Body>
                    <div className='mt-8 m-5'>
                      <div className='table-responsive'>
                        <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3 table-responsive'>
                          <thead>
                            <tr className='fw-bold text-muted font-size-12 text-clr88'>
                              <th className='min-w-200px fw-normal'>
                                {formatMessage({id: 'Name'})}
                              </th>
                              <th className='min-w-200px fw-normal'>
                                {formatMessage({id: 'Value'})}
                              </th>
                              <th className='min-w-150px text-end fw-normal'>
                                {formatMessage({id: 'Actions'})}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {customField &&
                              customField.map((item: any) => (
                                <tr key={item.customId}>
                                  <td className='text-hover-primary text-clr58 font-size-12'>
                                    {isEditable && item.customId === customId ? (
                                      <div className='d-flex flex-column gap-2 text-danger'>
                                        <input
                                          type='text'
                                          onChange={(e) => setName(e.target.value)}
                                          value={name}
                                          placeholder='Enter Name'
                                          className='p-3 rounded input-border form-control'
                                        />
                                        {nameError && <span>Name is required</span>}
                                      </div>
                                    ) : (
                                      item?.field
                                    )}
                                  </td>
                                  <td className='text-hover-primary text-clr38 font-size-13'>
                                    {isEditable && item.customId === customId ? (
                                      <div className='d-flex flex-column gap-2 text-danger'>
                                        <input
                                          type='text'
                                          onChange={(e) => setValue(e.target.value)}
                                          value={values}
                                          placeholder='Enter Value'
                                          className='p-3 rounded input-border form-control'
                                        />
                                        {valueError && (
                                          <span>{formatMessage({id: 'Value is required'})}</span>
                                        )}
                                      </div>
                                    ) : (
                                      item?.value
                                    )}
                                  </td>
                                  <td className='text-end d-flex gap-3 justify-content-end'>
                                    {isEditable && item.customId === customId ? (
                                      <button
                                        type='button'
                                        className='btn btn-primary font-weight-400 btn-height'
                                        onClick={() => handleUpdate(item.customId)}
                                        disabled={updateLoading}
                                      >
                                        {!updateLoading && (
                                          <span className='indicator-label font-size-13 p-0'>
                                            {formatMessage({id: 'Save'})}
                                          </span>
                                        )}
                                        {updateLoading && (
                                          <span className='indicator-label font-size-13 p-0'>
                                            {formatMessage({id: 'Please wait...'})}
                                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                          </span>
                                        )}
                                      </button>
                                    ) : (
                                      <p
                                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                        onClick={() => {
                                          setCustomId(item.customId)
                                          setIsEditable(true)
                                          setName(item?.field)
                                          setValue(item?.value)
                                          values && setNameError(false)
                                          name && setValueError(false)
                                        }}
                                      >
                                        <KTSVG
                                          path='/media/icons/duotune/art/art005.svg'
                                          className='svg-icon-3'
                                        />
                                      </p>
                                    )}

                                    <p
                                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                                      onClick={() => handleDelete(item.customId)}
                                    >
                                      <KTSVG
                                        path='/media/icons/investor/delete.svg'
                                        className='svg-icon-3'
                                        svgClassName='mh-50px change-fill'
                                      />
                                    </p>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                      <div>
                        <FieldArray
                          name='customFields'
                          render={(arrayHelpers) => {
                            return (
                              <>
                                {formik.values.customFields.map((_, index) => (
                                  <div className='table-responsive' key={index}>
                                    {status && (
                                      <table className='w-100'>
                                        <tbody>
                                          <tr>
                                            <td className='text-hover-primary text-clr58 font-size-12 pt-0 '>
                                              <TextInput
                                                fieldType={'text'}
                                                fieldName={`customFields[${index}].field`}
                                                placeholder={formatMessage({
                                                  id: 'Enter Name',
                                                })}
                                                formik={formik}
                                                margin={'me-6'}
                                                isFieldArray={true}
                                                width={8}
                                                isTooltipNotRequired={true}
                                              />
                                            </td>
                                            <td className='text-hover-primary text-clr38 font-size-13'>
                                              <TextInput
                                                fieldType={'text'}
                                                fieldName={`customFields[${index}].value`}
                                                placeholder={formatMessage({
                                                  id: 'Enter Value',
                                                })}
                                                formik={formik}
                                                margin={'me-6'}
                                                isFieldArray={true}
                                                width={8}
                                                isTooltipNotRequired={true}
                                              />
                                            </td>
                                            <td className='d-flex justify-content-end gap-2  align-items-center mt-2'>
                                              <button
                                                type='button'
                                                className='btn btn-bg-light w-md-auto font-size-13'
                                                onClick={() => {
                                                  arrayHelpers.remove(index)
                                                }}
                                              >
                                                {formatMessage({id: 'Cancel'})}
                                              </button>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    )}

                                    <div>
                                      {index === formik.values.customFields.length - 1 && (
                                        <div className='d-flex justify-content-end gap-3'>
                                          {index !== 0 && status && (
                                            <BasicButton
                                              height='44px'
                                              border='1px solid #F5F8FA'
                                              color='#F5F8FA'
                                              textColor='black'
                                              padding='3px 4px'
                                              buttonText='Remove field'
                                              onClick={() => {
                                                arrayHelpers.remove(index)
                                              }}
                                            />
                                          )}
                                          <BasicButton
                                            height='44px'
                                            border='1px solid #4776E6'
                                            color='#4776E6'
                                            textColor='white'
                                            padding='10px 24px'
                                            buttonText='Add New Field'
                                            onClick={() => {
                                              setStatus(true)
                                              !status && arrayHelpers.remove(index)
                                              arrayHelpers.push({
                                                field: '',
                                                value: '',
                                              })
                                            }}
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </>
                            )
                          }}
                        />
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <div className='d-flex justify-content-center gap-3'>
                      <CustomButton
                        isSubmitting={submitted ? submitted : formik.isSubmitting}
                        isValid={formik.isValid}
                        buttonText={formatMessage({
                          id: 'Save',
                        })}
                        loading={loading}
                        width={4}
                        height={44}
                        marginButtom={'mb-0'}
                      />
                      <BasicButton
                        height='44px'
                        border='1px solid #F5F8FA'
                        color='#F5F8FA'
                        textColor='black'
                        padding='12px 24px'
                        onClick={() => setModifyFieldModal(false)}
                        buttonText='Cancel'
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

export default ModifyFieldModal
