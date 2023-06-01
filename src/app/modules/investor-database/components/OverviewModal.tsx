import {Form, Formik} from 'formik'
import React, {useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap'
import {useIntl} from 'react-intl'
import * as Yup from 'yup'
import TextInput from '../../widgets/components/Input/TextInput'
import {ToolTipUI} from '../../widgets/components/UI/ToolTipUI'
import {investorType} from '../core/_constants'
import Select from 'react-select'
import {CustomButton} from '../../widgets/components/UI/CustomButton'
import TextArea from '../../widgets/components/Input/TextArea'
import {toast} from 'react-toastify'
import {useParams} from 'react-router-dom'
import {getInvestorLocation, updateInvestor} from '../core/_requests'
const initialValues = {
  value_add: '',
  fund_size: '',
  investments: '',
  founders: '',
  exits: '',
}
export const OverviewModal = ({
  overviewModalShow,
  setOverviewModalShow,
  individualInvestor,
  singleInvestor,
}: any) => {
  const {formatMessage} = useIntl()
  const [investorsType, setInvestorsType] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [locations, setLocations] = useState<any>([])
  const [investorLocationOptions, setInvestorLocationOptions] = useState<any[]>([])
  const {id} = useParams()
  const [initialInvestorType, setInitialInvestorType] = useState<any>()
  const [initialInvestorLocation, setInitialInvestorLocation] = useState<any>()

  const userSchema = Yup.object().shape({
    value_add: Yup.string().nullable(),
    fund_size: Yup.number().nullable(),
    founders: Yup.string().nullable(),
    investments: Yup.number().nullable(),
    exits: Yup.number().nullable(),
  })
  useEffect(() => {
    if (individualInvestor) {
      initialValues.value_add = individualInvestor?.value_add
      initialValues.fund_size = individualInvestor?.fund_size
      initialValues.investments = individualInvestor?.investment_count
      initialValues.founders = individualInvestor?.founders
      initialValues.exits = individualInvestor?.exits

      if (individualInvestor?.fund_type) {
        setInitialInvestorType(
          JSON.parse(individualInvestor?.fund_type).map((e: any) => {
            return {value: e, label: e}
          })
        )
      }
      if (individualInvestor?.investorLocations?.length > 0) {
        setInitialInvestorLocation(
          individualInvestor.investorLocations.map((e: any) => {
            return {value: e.investorLocationId, label: e.name}
          })
        )
      }
    }
  }, [individualInvestor])
  useEffect(() => {
    const fetchCountry = async () => {
      const {
        data: {data: investorLocations},
      } = await getInvestorLocation()
      const investorlocationData = investorLocations.map((investorLocation: any) => {
        return {
          id: investorLocation.investorLocationId,
          label: investorLocation.name,
          value: investorLocation.investorLocationId,
        }
      })
      setInvestorLocationOptions([...investorlocationData])
    }
    fetchCountry()
  }, [])
  const onSubmit = async (values: any) => {
    if (id) {
      let fund_type;
      if(initialInvestorType?.length>0){
         fund_type = initialInvestorType.map((e: any) => e.value)
      }
      else{
         fund_type = investorsType.map((e: any) => e.value)
      }
      let location = locations.map((e: any) => e.value)
      const payload = {...values, fund_type, location, investment_count: values.investments}
      delete payload.investments
      try {
        setLoading(true)
        const {
          data: {errors, success},
        } = await updateInvestor(+id, payload)
        if (success) {
          await singleInvestor()
          toast.success(formatMessage({id: 'overview Data added successfully'}))
          setOverviewModalShow(false)
          setLoading(false)
        } else {
          setLoading(false)
          errors.forEach((error: string) => {
            toast.error(formatMessage({id: error}))
          })
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleChangeLocation=(selectedOptions: any)=>{
    setInitialInvestorLocation(selectedOptions)
    setLocations(selectedOptions)
  }

  
  const handleChangeInvestorType=(selectedOptions: any)=>{
    setInitialInvestorType(selectedOptions)
    setInvestorsType(selectedOptions)
  }

  return (
    <>
      <Modal
        size='lg'
        show={overviewModalShow}
        onHide={() => {
          setOverviewModalShow(false)
        }}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <h2>{formatMessage({id: 'Overview'})}</h2>
        </Modal.Header>
        <Formik
          initialValues={initialValues}
          validationSchema={userSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {(formik) => {
            return (
              <Form>
                <Modal.Body>
                  <div className='d-md-flex col-md-12 flex-wrap w-100 m-auto justify-content-center'>
                    <div className='w-100'>
                      <TextArea
                        fieldName={'value_add'}
                        formik={formik}
                        placeholder={formatMessage({
                          id: 'Enter values',
                        })}
                        label={formatMessage({id: 'Value Add from investor'})}
                        toolTipText={formatMessage({
                          id: 'GLOBAL.TOOLTIP.OVERVIEW_MODAL.TEXT_AREA',
                        })}
                      />
                    </div>
                    <div className='w-100 row d-md-flex justify-content-between'>
                      <div className='col-md-6 multi-select investor_type'>
                        <label className='text-dark text-capitalize font-size-13 form-label '>
                          {formatMessage({id: 'Investors Type'})}
                        </label>
                        <ToolTipUI
                          tooltipText={formatMessage({
                            id: 'GLOBAL.TOOLTIP.HIGHLIGHTS.INVESTOR_TYPE',
                          })}
                        />
                        <div className='highlight-multi-select font-size-12 text-bold mobile-investorType'>
                          <Select
                            isMulti
                            name='investorsType'
                            options={investorType}
                            className='basic-multi-select mb-7 mb-md-0 custom-select'
                            onChange={handleChangeInvestorType}
                            placeholder={formatMessage({id: 'Choose Investor type'})}
                            classNamePrefix='react-select'
                            value={initialInvestorType}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <TextInput
                          fieldType={'number'}
                          fieldName={'fund_size'}
                          formik={formik}
                          placeholder={formatMessage({id: 'Enter Fund Size'})}
                          margin={'me-6'}
                          label={formatMessage({id: 'Fund Size (USD)'})}
                          toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.HIGHLIGHTS.FUND_SIZE'})}
                          isStarRequired={false}
                        />
                      </div>
                    </div>
                    <div className='w-100 row d-md-flex justify-content-between'>
                      <div className='col-md-6'>
                        <TextInput
                          fieldType={'number'}
                          label={formatMessage({id: 'Investments'})}
                          fieldName={'investments'}
                          formik={formik}
                          placeholder={formatMessage({id: 'Enter Investment'})}
                          toolTipText={formatMessage({
                            id: 'GLOBAL.TOOLTIP.OVERVIEW_MODAL.INVESTMENTS',
                          })}
                          margin='me-6'
                          isStarRequired={false}
                        />
                      </div>
                      <div className='col-md-6'>
                        <TextInput
                          fieldType={'text'}
                          label={formatMessage({id: 'Founder (s)'})}
                          fieldName={'founders'}
                          formik={formik}
                          placeholder={formatMessage({id: 'Enter Name'})}
                          toolTipText={formatMessage({
                            id: 'GLOBAL.TOOLTIP.OVERVIEW_MODAL.FOUNDERS',
                          })}
                          margin='me-6'
                          isStarRequired={false}
                        />
                      </div>
                    </div>
                    <div className='w-100 row d-md-flex justify-content-between'>
                      <div className='col-md-6'>
                        <TextInput
                          fieldType={'number'}
                          label={formatMessage({id: 'Exits'})}
                          fieldName={'exits'}
                          formik={formik}
                          placeholder={formatMessage({id: 'Enter Exits'})}
                          toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.GENERAL.EXITS'})}
                          margin='me-4'
                          isStarRequired={false}
                        />
                      </div>
                      <div className='col-md-6 multi-select w-100 investor_type'>
                        <label className='text-dark text-capitalize font-size-13 form-label'>
                          {formatMessage({id: 'Locations'})}
                        </label>
                        <ToolTipUI
                          tooltipText={formatMessage({
                            id: 'GLOBAL.TOOLTIP.OVERVIEW_MODAL.LOCATIONS',
                          })}
                        />
                        <div className='highlight-multi-select font-size-12 text-bold mobile-investorType'>
                          <Select
                            isMulti
                            name='locations'
                            options={investorLocationOptions}
                            className='basic-multi-select mb-7 mb-md-0 custom-select'
                            onChange={handleChangeLocation}
                            placeholder={formatMessage({id: 'Choose locations'})}
                            classNamePrefix='react-select'
                            value={initialInvestorLocation}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer className='p-0'>
                  <button
                    type='button'
                    className='btn btn-light font-size-13 font-weight-400'
                    onClick={() => {
                      setOverviewModalShow(false)
                      setLoading(false)
                    }}
                  >
                    {formatMessage({id: 'Cancel'})}
                  </button>
                  <CustomButton
                    isSubmitting={formik.isSubmitting}
                    isValid={formik.isValid}
                    buttonText={formatMessage({id: 'Add Overview'})}
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
      </Modal>
    </>
  )
}
