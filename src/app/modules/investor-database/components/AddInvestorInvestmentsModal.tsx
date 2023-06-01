import {Formik, Form} from 'formik'
import React, {useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap'
import {useIntl} from 'react-intl'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import TextInput from '../../widgets/components/Input/TextInput'
import {SelectInput} from '../../widgets/components/Input/SelectInput'
import {designationOptions} from '../core/_constants'
import {DropdownType} from '../../../core/_models'
import {currencies} from '../../onboarding/core/_requests'
import * as Yup from 'yup'
import {addInvestorInvestments} from '../core/_requests'
import {toast} from 'react-toastify'
import {useParams} from 'react-router-dom'

const initialValues = {
  announced_date: '',
  organization_name: '',
  lead_investor: '',
  funding_round: '',
  money_raised: '',
  currencyId: '',
  info: '',
}

export const AddInvestorInvestmentsModal = ({setModalShow, modalShow, getInvestments}: any) => {
  const {formatMessage} = useIntl()
  const [currencyOptions, setCurrencyOptions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const {id} = useParams()

  const userSchema = Yup.object().shape({
    announced_date: Yup.string()
      .required(formatMessage({id: 'Announced Date is required'}))
      .nullable(),
    organization_name: Yup.string()
      .min(1, formatMessage({id: 'Minimum 1 character is required'}))
      .max(50, formatMessage({id: 'Maximum 50 characters'}))
      .required(formatMessage({id: 'Organisation Name is required'}))
      .nullable(),
    lead_investor: Yup.string()
      .min(1, formatMessage({id: 'Minimum 1 character is required'}))
      .max(50, formatMessage({id: 'Maximum 50 characters'}))
      .required(formatMessage({id: 'Lead Investor is required'}))
      .nullable(),
    info: Yup.string()
      .min(1, formatMessage({id: 'Minimum 1 character is required'}))
      .max(50, formatMessage({id: 'Maximum 50 characters'}))
      .nullable(),
    money_raised: Yup.number()
      .required(formatMessage({id: 'Money Raised is required'}))
      .nullable(),

    funding_round: Yup.string()
      .required(formatMessage({id: 'Funding Round is required'}))
      .nullable(),
    currencyId: Yup.string().nullable(),
  })
  useEffect(() => {
    let currencyData: DropdownType[] = []
    const getCurrencies = async () => {
      try {
        const {
          data: {data: currency, success},
        } = await currencies()
        if (success) {
          currencyData = currency.map((curr: any) => {
            return {
              id: curr.currencyId,
              name: `${curr.code} (${curr.symbol}) - ${curr.currency}`,
              value: curr.currencyId,
            }
          })
          setCurrencyOptions([...currencyData])
        }
      } catch (err) {
        console.log(err)
      }
    }
    getCurrencies()
  }, [])

  const onSubmit = async (values: any) => {
    setLoading(true)
    try {
      const {
        data: {success, errors},
      } = await addInvestorInvestments(values, Number(id))
      if (success) {
        getInvestments()
        setModalShow(false)
        toast.success(formatMessage({id: 'Investment Added successfully'}))
        setLoading(false)
      } else {
        errors.forEach((error: string) => {
          toast.error(formatMessage({id: error}))
        })
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }
  return (
    <div>
      <Modal
        size='lg'
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Formik initialValues={initialValues} validationSchema={userSchema} onSubmit={onSubmit}>
          {(formik) => {
            return (
              <Form>
                <Modal.Body>
                  <div className='d-flex justify-content-between m-5'>
                    <h2>{formatMessage({id: 'Add Investment'})}</h2>
                    <img
                      src={toAbsoluteUrl('/media/icons/investor/Cancel.svg')}
                      alt='cancel'
                      className='cursor-pointer'
                      onClick={() => {
                        setModalShow(false)
                      }}
                    />
                  </div>
                  <div>
                    <div className='row d-md-flex justify-content-between'>
                      <div className='col-md-6'>
                        <TextInput
                          fieldType={'date'}
                          label={formatMessage({id: 'Announced Date'})}
                          fieldName={'announced_date'}
                          formik={formik}
                          placeholder={formatMessage({id: 'Select Date'})}
                          toolTipText={formatMessage({
                            id: 'GLOBAL.TOOLTIP.INVESTMENT.ANNOUNCED_DATE',
                          })}
                          margin={'me-6'}
                          isStarRequired={true}
                        />
                      </div>
                      <div className='col-md-6'>
                        <TextInput
                          fieldType={'text'}
                          label={formatMessage({id: 'Organisation Name'})}
                          fieldName={'organization_name'}
                          formik={formik}
                          placeholder={formatMessage({id: 'Enter Organisation Name'})}
                          toolTipText={formatMessage({
                            id: 'GLOBAL.TOOLTIP.INVESTMENT.ORGANISATION_NAME',
                          })}
                          margin={'me-6'}
                          isStarRequired={true}
                        />
                      </div>
                    </div>
                    <div className='row d-md-flex justify-content-between'>
                      <div className='col-md-6'>
                        <TextInput
                          fieldType={'text'}
                          fieldName={'lead_investor'}
                          formik={formik}
                          placeholder={formatMessage({id: 'Enter Lead Investor'})}
                          label={formatMessage({id: 'Lead Investor'})}
                          toolTipText={formatMessage({
                            id: 'GLOBAL.TOOLTIP.INVESTMENTS.LEAD_INVESTMENT',
                          })}
                          margin={'me-6'}
                          isStarRequired={true}
                        />
                      </div>
                      <div className='col-md-6'>
                        <SelectInput
                          label={formatMessage({id: 'Funding Round'})}
                          fieldName={'funding_round'}
                          placeholder={formatMessage({id: 'Select Funding Round'})}
                          formik={formik}
                          toolTipText={formatMessage({
                            id: 'GLOBAL.TOOLTIP.INVESTMENTS.FUNDING_ROUND',
                          })}
                          options={designationOptions}
                        />
                      </div>
                    </div>
                    <div className='row d-md-flex justify-content-between'>
                      <div className='col-md-6'>
                        <TextInput
                          fieldType={'number'}
                          fieldName={'money_raised'}
                          formik={formik}
                          placeholder={formatMessage({id: 'Enter Money Raised'})}
                          label={formatMessage({id: 'Money Raised'})}
                          margin={'me-6'}
                          toolTipText={formatMessage({
                            id: 'GLOBAL.TOOLTIP.INVESTMENT.MONEY_RAISED',
                          })}
                          isStarRequired={true}
                        />
                      </div>
                      <div className='col-md-6'>
                        <TextInput
                          fieldType={'text'}
                          fieldName={'info'}
                          formik={formik}
                          placeholder={formatMessage({id: 'Enter Information'})}
                          label={formatMessage({id: 'Information'})}
                          margin={'me-6'}
                          toolTipText={formatMessage({
                            id: 'GLOBAL.TOOLTIP.INVESTMENT.INFORMATION',
                          })}
                        />
                      </div>
                    </div>
                    <div className='row d-md-flex justify-content-between'>
                      <div className='col-md-6'>
                        <SelectInput
                          label={formatMessage({id: 'Select Currency'})}
                          fieldName={'currencyId'}
                          placeholder={formatMessage({id: 'Select the currency'})}
                          formik={formik}
                          toolTipText={formatMessage({
                            id: 'GLOBAL.TOOLTIP.INITIALIZE_ROUND.SELECT_CURRENCY',
                          })}
                          options={currencyOptions}
                          isStarRequired={true}
                        />
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <div className='d-flex gap-3 m-5 w-100 justify-content-md-end'>
                    <button
                      type='button'
                      className='btn btn-bg-light w-50 w-md-auto font-size-13'
                      onClick={() => {
                        setModalShow(false)
                      }}
                    >
                      {formatMessage({id: 'Cancel'})}
                    </button>
                    <button
                      className='btn btn-primary w-50 w-md-auto font-size-13'
                      disabled={loading}
                    >
                      {!loading && (
                        <span className='indicator-label font-size-13 p-0'>
                          {formatMessage({id: 'Add Investment'})}
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
    </div>
  )
}
