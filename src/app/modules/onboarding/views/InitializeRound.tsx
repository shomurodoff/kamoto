import {Formik, Form} from 'formik'
import React, {useState} from 'react'
import {SelectInput} from '../../widgets/components/Input/SelectInput'
import TextInput from '../../widgets/components/Input/TextInput'
import {CustomButton} from '../../widgets/components/UI/CustomButton'
import {InfoCard} from '../../widgets/components/UI/InfoCard'
import {useIntl} from 'react-intl'
import {createRound} from '../core/_requests'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../../auth'
import {roundTypeOptions} from '../core/_constants'
import {toast} from 'react-toastify'
import {Toaster} from '../../widgets/components/General/Toaster'
import {useInitializeRoundSchema} from '../../../hooks/useInitializeRoundSchema'
import {roundInitialValues} from '../../../core/_constants'
import {useCurrency} from '../../../hooks/useCurrency'

export const InitializeRound = () => {
  const [loading, setLoading] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const {formatMessage} = useIntl()
  const navigate = useNavigate()
  const {companyId} = useAuth()
  const {intializeRoundSchema} = useInitializeRoundSchema()
  const {currencyOptions} = useCurrency()

  const onSubmit = async (values: any) => {
    try {
      setLoading(true)
      if (!companyId) {
        setLoading(false)
        throw formatMessage({id: 'Company ID is required.'})
      }

      const {
        data: {success, errors},
      } = await createRound(
        values.roundName,
        values.roundType,
        values.amountTargeted,
        values.amountAchieved,
        values.currency,
        companyId
      )

      if (success) {
        setLoading(false)
        navigate('/onboarding/team-members')
      } else {
        errors.forEach((error: string) => {
          toast.error(formatMessage({id: error}))
        })
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  return (
    <>
      <Toaster />
      <Formik
        validationSchema={intializeRoundSchema}
        initialValues={roundInitialValues}
        onSubmit={onSubmit}
      >
        {(formik) => {
          formik.values.currency !== '' &&
            currencyOptions.some((currency: any) => {
              if (currency.id === parseInt(formik.values.currency)) {
                setSelectedCurrency(currency.name.substring(0, 4))
                return true
              }
              return null
            })

          return (
            <Form className='company-container d-md-flex flex-md-row d-flex flex-column justify-content-md-between col-12'>
              <div className='mb-md-11 col-md-6 col-12 mt-4'>
                <h1 className='text-dark fw-bolder mb-3'>
                  {formatMessage({id: 'Initialize Round'})}
                </h1>
                <div className='text-gray-500   fs-4'>
                  {formatMessage({id: 'Add an ongoing funding details'})}
                </div>
                <div className='d-md-none d-flex w-md-50 mt-5 mt-md-0'>
                  <InfoCard
                    title={formatMessage({id: 'What is a funding round?'})}
                    desc={formatMessage({
                      id: 'Funding round details in Foundercrate is needed to initialize the Investor CRM & keep the targeted investors at one place.',
                    })}
                    slug={'#'}
                  />
                </div>
                <div className='mt-md-20 pt-md-1 mt-4'>
                  <TextInput
                    fieldType={'text'}
                    label={formatMessage({id: 'Round Name'})}
                    fieldName={'roundName'}
                    placeholder={formatMessage({
                      id: 'Enter name of the investment round',
                    })}
                    formik={formik}
                    margin={'me-md-15'}
                    toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.INITIALIZE_ROUND.ROUND_NAME'})}
                    width={11}
                  />
                  <TextInput
                    fieldType={'number'}
                    label={formatMessage({id: 'Amount targeted'})}
                    fieldName={'amountTargeted'}
                    placeholder={`${formatMessage({
                      id: 'Enter amount in',
                    })}${selectedCurrency}`}
                    formik={formik}
                    margin={'me-md-15'}
                    width={11}
                    toolTipText={formatMessage({
                      id: 'GLOBAL.TOOLTIP.INITIALIZE_ROUND.AMOUNT_TARGETED',
                    })}
                  />

                  <SelectInput
                    label={formatMessage({id: 'Round Type'})}
                    fieldName={'roundType'}
                    placeholder={formatMessage({id: 'Select the round type'})}
                    formik={formik}
                    toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.INITIALIZE_ROUND.ROUND_TYPE'})}
                    margin={'me-md-14'}
                    options={roundTypeOptions}
                  />
                </div>
              </div>
              <div className='col-md-6 col-12 d-md-flex flex-md-column justify-content-between '>
                <div>
                  <div className='d-md-flex d-none '>
                    <InfoCard
                      title={formatMessage({id: 'What is a funding round?'})}
                      desc={formatMessage({
                        id: 'Funding round details in Foundercrate is needed to initialize the Investor CRM & keep the targeted investors at one place.',
                      })}
                      slug={'#'}
                    />
                  </div>
                  <SelectInput
                    label={formatMessage({id: 'Select Currency'})}
                    fieldName={'currency'}
                    placeholder={formatMessage({id: 'Select the currency'})}
                    formik={formik}
                    toolTipText={formatMessage({
                      id: 'GLOBAL.TOOLTIP.INITIALIZE_ROUND.SELECT_CURRENCY',
                    })}
                    options={currencyOptions}
                  />

                  <TextInput
                    fieldType={'number'}
                    label={formatMessage({id: 'Amount achieved'})}
                    fieldName={'amountAchieved'}
                    placeholder={`${formatMessage({
                      id: 'Enter amount in',
                    })}${selectedCurrency}`}
                    formik={formik}
                    margin='me-4'
                    toolTipText={formatMessage({
                      id: 'GLOBAL.TOOLTIP.INITIALIZE_ROUND.AMOUNT_ACHIEVED',
                    })}
                    width={12}
                  />
                </div>
                <div className='mt-20 d-flex justify-content-end '>
                  <CustomButton
                    isSubmitting={formik.isSubmitting}
                    isValid={formik.isValid}
                    buttonText={formatMessage({id: 'Continue'})}
                    loading={loading}
                    width={2}
                    widthLoading={4}
                    height={44}
                  />
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}
