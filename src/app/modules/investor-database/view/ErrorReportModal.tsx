import {useIntl} from 'react-intl'
import {Dispatch, SetStateAction, useState} from 'react'
import {Modal} from 'react-bootstrap'
import {Form, Formik} from 'formik'

import '../../profile/styles/index.scss'
import TextInput from '../../widgets/components/Input/TextInput'
import * as Yup from 'yup'

import {errorReportsConstant} from '../core/_constants'
import {createErrorReportAPI} from '../core/_requests'
import {toast} from 'react-toastify'

const initialValues = {
  reasons: [],
}

export const ErrorReportModal = ({
  reportErrorModalShow,
  setReportErrorModalShow,
  investorId,
  investorUserId,
  setInvestorUserId,
}: {
  reportErrorModalShow: boolean
  setReportErrorModalShow: Dispatch<SetStateAction<boolean>>
  investorId?: number | undefined
  investorUserId?: number
  setInvestorUserId?: any
}) => {
  const {formatMessage} = useIntl()
  const [loading, setLoading] = useState(false)

  const errorReportSchema = Yup.object().shape({
    reasons: Yup.array()
      .of(Yup.string())
      .required(formatMessage({id: 'Report Error is required'}))
      .nullable(),
  })

  const onSubmit = async (values: any) => {
    try {
      setLoading(true)
      let data: any = {}
      data.reason = JSON.stringify(values.reasons)
      if (investorId) {
        data.investorId = +investorId
      }
      if (investorUserId) {
        data.investorUserId = +investorUserId
      }
      const {
        data: {success},
      } = await createErrorReportAPI(data)
      if (success) {
        setInvestorUserId(undefined)
        setReportErrorModalShow(false)
        toast.success(formatMessage({id: 'Error report is successfully raised'}))
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      show={reportErrorModalShow}
      onHide={() => {
        setInvestorUserId(undefined)
        setReportErrorModalShow(false)
      }}
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Formik
        initialValues={initialValues}
        validationSchema={errorReportSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <Modal.Header closeButton>
                <h2>{formatMessage({id: 'Report Error'})}</h2>
              </Modal.Header>
              <Modal.Body>
                <p className='mb-5 fw-semibold'>
                  {formatMessage({id: 'Please select the reasons below:'})}
                </p>
                {errorReportsConstant.map((error) => {
                  return (
                    <div key={error.id} className='d-flex justify-content-between mx-5 my-2'>
                      <TextInput
                        fieldName={'reasons'}
                        formik={formik}
                        customText={error.name}
                        placeholder=''
                        fieldType={'checkbox'}
                        isCheckbox={true}
                        isWidthNotRequired={false}
                        margin='mb-4'
                        isRadio={true}
                        value={error.value}
                      />
                    </div>
                  )
                })}
              </Modal.Body>
              <Modal.Footer>
                <div className='d-flex gap-3'>
                  <button
                    type='button'
                    className='btn btn-bg-light w-50 w-md-auto font-size-13'
                    onClick={() => {
                      setInvestorUserId(undefined)
                      setReportErrorModalShow(false)
                    }}
                  >
                    {formatMessage({id: 'Cancel'})}
                  </button>
                  <button
                    className='btn btn-primary w-50 w-md-auto font-size-13'
                    disabled={loading || formik.values.reasons.length === 0}
                  >
                    {!loading && (
                      <span className='indicator-label font-size-13 p-0'>
                        {formatMessage({id: 'Report Error'})}
                      </span>
                    )}
                    {loading && (
                      <span className='indicator-label font-size-13 p-0'>
                        {formatMessage({id: 'Please wait...'})}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                </div>
              </Modal.Footer>
            </Form>
          )
        }}
      </Formik>
    </Modal>
  )
}
