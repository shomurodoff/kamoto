import '../../profile/styles/index.scss'
import React, {useEffect, useState} from 'react'
import '../../profile/styles/index.scss'
import TextInput from '../../widgets/components/Input/TextInput'
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import {useIntl} from 'react-intl'
import {CustomButton} from '../../widgets/components/UI/CustomButton'
import {Toaster} from '../../widgets/components/General/Toaster'
import Select from 'react-select'
import {investorType} from '../core/_constants'
import {getIndustry, getSingleInvestor, updateInvestor} from '../core/_requests'
import {toast} from 'react-toastify'
import {ToolTipUI} from '../../widgets/components/UI/ToolTipUI'
import {CreateInvestorTabs} from '../components/CreateInvestorTabs'
import {useNavigate, useParams} from 'react-router-dom'
const initialValues: any = {
  investmentRange: '',
  fundSize: '',
  stageFocus: '',
}
const Highlights = () => {
  // const initialValues: any = {
  //   investmentRange: highlight.investment_range,
  //   fundSize: '',
  //   stageFocus: '',
  // }

  const {formatMessage} = useIntl()
  const [loading, setLoading] = useState(false)
  const [, setInvestorsType] = useState<any>([])
  const [, setFocusArea] = useState<any>([])
  const [investorId, setInvestorId] = useState<any>()
  const params = useParams()
  const [, setIndividualInvestor] = useState<any>([])
  const [initialInvestorType, setInitialInvestorType] = useState<any>()
  const [initialFocusArea, setInitialFocusArea] = useState<any>()
  const [industryData, setIndustryData] = useState<any>([])

  const navigate = useNavigate()
  useEffect(() => {
    setInvestorId(parseInt(params.id!))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const userSchema = Yup.object().shape({
    // investorsType: Yup.array()
    //   .of(Yup.string())
    //   .min(1, 'Minimum 1 character is required')
    //   .max(50, 'Maximum 50 characters')
    //   .required('Investor name is required')
    //   .nullable(),
    investmentRange: Yup.string()
      .min(1, formatMessage({id: 'Minimum 1 character is required'}))
      .max(50, formatMessage({id: 'Maximum 50 characters'}))
      .required(formatMessage({id: 'Investment Range is required'}))
      .nullable(),
    fundSize: Yup.number()
      .required(formatMessage({id: 'fund Size is required'}))
      .nullable(),
    stageFocus: Yup.string()
      .required(formatMessage({id: 'stage Focus is required'}))
      .nullable(),
    // focusArea: Yup.array().of(Yup.string()).required('focusArea is required').nullable(),
  })

  const onSubmit = async (values: any) => {
    setLoading(true)
    try {
      const {
        data: {success, errors},
      } = await updateInvestor(investorId, values)
      if (success) {
        setLoading(false)
        toast.success(formatMessage({id: 'Investor Updated successfully'}))
        navigate(`/investor-database/create-investor/people/${investorId}`)
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

  const singleInvestor = async () => {
    try {
      const {
        data: {success, data, errors},
      } = await getSingleInvestor(Number(params.id))
      if (success) {
        setIndividualInvestor(data)

        initialValues.investmentRange = data.investment_range
        initialValues.fundSize = data.fund_size
        initialValues.stageFocus = data.stage_focus
        setInitialInvestorType(
          JSON.parse(data.fund_type).map((e: any) => {
            return {value: e, label: e}
          })
        )
        setInitialFocusArea(
          data.allIndustries.map((e: any) => {
            return {value: e.industryName, label: e.industryName}
          })
        )
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
    if (params.id) {
      singleInvestor()
    }
  }, [params.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const getAllIndustry = async () => {
    try {
      const {
        data: {data, success, errors},
      } = await getIndustry()
      if (success) {
        let industryData = data.map((e: any) => {
          return {value: e.industryId, label: e.industryName}
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
  return (
    <>
      <Toaster />
      <div className='g-5 g-xxl-8 create-investor-container company-container'>
        <CreateInvestorTabs />
        <div className='m-md-8 mb-md-1 m-5 mb-5'>
          <h4>{formatMessage({id: 'Highlights'})}</h4>
        </div>
        <div className='col-xl-12 d-md-flex mt-0 m-md-0 m-3'>
          <div className='mt-md-8 ms-md-10 w-100'>
            <Formik initialValues={initialValues} validationSchema={userSchema} onSubmit={onSubmit}>
              {(formik) => {
                return (
                  <Form>
                    <div className='d-md-flex col-md-12 flex-wrap'>
                      <div className='me-6 multi-select'>
                        <label className='text-dark text-capitalize font-size-13 form-label '>
                          {formatMessage({id: 'Investors Type*'})}
                        </label>
                        <ToolTipUI
                          tooltipText={formatMessage({
                            id: 'GLOBAL.TOOLTIP.HIGHLIGHTS.INVESTOR_TYPE',
                          })}
                        />
                        <div className=' highlight-multi-select font-size-12 text-bold'>
                          <Select
                            isMulti
                            name='investorsType'
                            options={investorType}
                            className='basic-multi-select mb-7 mb-md-0 custom-select '
                            onChange={(investorsType) => setInvestorsType(investorsType)}
                            placeholder={formatMessage({id: 'Choose Investor type'})}
                            value={initialInvestorType}
                            classNamePrefix='react-select'
                          />
                        </div>
                      </div>
                      <TextInput
                        fieldType={'text'}
                        label={formatMessage({id: 'Investment range'})}
                        fieldName={'investmentRange'}
                        formik={formik}
                        placeholder={formatMessage({id: 'Enter Investment range'})}
                        toolTipText={formatMessage({
                          id: 'GLOBAL.TOOLTIP.HIGHLIGHTS.INVESTMENT_RANGE',
                        })}
                        margin={'me-md-0'}
                        width={5}
                        isStarRequired={true}
                      />
                      <TextInput
                        fieldType={'number'}
                        fieldName={'fundSize'}
                        formik={formik}
                        placeholder={formatMessage({id: 'Enter Fund Size'})}
                        margin={'me-6'}
                        label={formatMessage({id: 'Fund Size (USD)'})}
                        toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.HIGHLIGHTS.FUND_SIZE'})}
                        width={5}
                        isStarRequired={true}
                      />
                      <TextInput
                        fieldType={'text'}
                        label={formatMessage({id: 'Stage Focus'})}
                        fieldName={'stageFocus'}
                        formik={formik}
                        placeholder={formatMessage({id: 'Enter Investor stage focus'})}
                        toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.HIGHLIGHTS.STAGE_FOCUS'})}
                        margin='me-4'
                        width={5}
                        isStarRequired={true}
                      />

                      <div className='me-6 multi-select mb-9'>
                        <label className='bold text-dark text-capitalize font-size-13 form-label'>
                          {formatMessage({id: 'Focus Area*'})}
                        </label>
                        <ToolTipUI
                          tooltipText={formatMessage({id: 'GLOBAL.TOOLTIP.HIGHLIGHTS.FOCUS_AREA'})}
                        />
                        <div className='mt-2 highlight-multi-select font-size-12 text-bold'>
                          <Select
                            isMulti
                            name='focusArea'
                            options={industryData}
                            className='basic-multi-select mb-7 mb-md-0 custom-select'
                            onChange={(focusArea) => setFocusArea(focusArea)}
                            placeholder={formatMessage({id: 'Choose Focus Area'})}
                            value={initialFocusArea}
                            classNamePrefix='react-select'
                          />
                        </div>
                      </div>
                    </div>
                    <div className='d-flex justify-content-md-end button-margin'>
                      <CustomButton
                        isSubmitting={formik.isSubmitting}
                        isValid={formik.isValid}
                        buttonText={formatMessage({id: 'Save Changes'})}
                        loading={loading}
                        widthLoading={2}
                        width={2}
                        margin={'me-7'}
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

export {Highlights}
