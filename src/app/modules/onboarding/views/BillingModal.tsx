import {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap'
import {useIntl} from 'react-intl'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {updateBillingAccess} from '../../profile/core/_requests'
import {BasicButton} from '../../widgets/components/UI/BasicButton'
import {ToolTipUI} from '../../widgets/components/UI/ToolTipUI'
import {toast} from 'react-toastify'
import {useAuth} from '../../auth'

export const BillingModal = ({
  modalShow,
  setModalShow,
  currentState,
  setCurrentState,
  selected,
  setSelected,
  currencyBill,
  plans,
  setPrice,
  upgrade,
  companyId,
  getBillingDetails,
}: {
  modalShow: boolean
  setModalShow: Dispatch<SetStateAction<boolean>>
  currentState: string
  setCurrentState?: Dispatch<SetStateAction<string>>
  selected: string
  setSelected?: Dispatch<SetStateAction<string>>
  currencyBill: string
  setPrice?: Dispatch<SetStateAction<string>>
  upgrade: boolean
  getBillingDetails?: () => Promise<void>
  plans: {
    title: string
    curreny: string
    priceMonthINR: string
    priceAnnualINR: string
    priceMonthUSD: string
    priceAnnualUSD: string
    custom: boolean
    label?: string
    features: {title: string; supported: boolean}[]
  }[]
  companyId?: number | undefined
}) => {
  const [localBilling, setlocalBilling] = useState<string>('Monthly')
  const [localPlan, setlocalPlan] = useState<any | undefined>('Basic')
  const [localPrice, setlocalPrice] = useState('0')
  const [loading, setLoading] = useState(false)
  const {formatMessage} = useIntl()
  const {setBillingData} = useAuth()

  const onUpgradePlan = async () => {
    try {
      if (upgrade) {
        setLoading(true)
        if (companyId) {
          const chargebeePlanId = `${localPlan}-${currencyBill}-${localBilling}`
          const {
            data: {success, errors},
          } = await updateBillingAccess(companyId, chargebeePlanId)
          if (success) {
            setLoading(false)
            setModalShow(false)
            toast.success(formatMessage({id: 'Successful Update Plan'}))
            setBillingData(await getBillingDetails!())
          } else {
            setLoading(false)
            errors.forEach((error: string) => {
              toast.error(formatMessage({id: error}))
            })
          }
        }
      }
      if (setCurrentState && setSelected && setPrice) {
        setCurrentState(localBilling)
        setSelected(localPlan)
        setPrice(localPrice)
        setModalShow(false)
      }
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  useEffect(() => {
    setlocalBilling(currentState)
    setlocalPlan(selected)
  }, [currentState, selected, modalShow])

  return (
    <>
      <Modal
        size='xl'
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <div className=' d-flex fw-bold'>
            <h2 className='font-size-20'>{formatMessage({id: 'Upgrade your plan'})}</h2>{' '}
            <ToolTipUI
              tooltipText={formatMessage({
                id: 'GLOBAL.TOOLTIP.BILLING.UPGRADE_PLAN',
              })}
            />
          </div>
        </Modal.Header>
        <Modal.Body className='py-3'>
          <div className='pb-4'>
            <div className='d-flex justify-content-center gap-3'>
              <button
                type='button'
                className={localBilling === 'Monthly' ? 'activeB' : 'non-active'}
                onClick={() => {
                  setlocalPlan(plans[0].title)
                  currencyBill === 'USD'
                    ? setlocalPrice(plans[0]?.priceMonthUSD)
                    : setlocalPrice(plans[0]?.priceMonthINR)
                  setlocalBilling('Monthly')
                }}
              >
                {formatMessage({id: 'Monthly'})}
              </button>
              <button
                type='button'
                className={localBilling === 'Yearly' ? 'activeB' : 'non-active'}
                onClick={() => {
                  setlocalPlan(plans[0].title)
                  currencyBill === 'USD'
                    ? setlocalPrice(plans[0]?.priceAnnualUSD)
                    : setlocalPrice(plans[0]?.priceAnnualINR)
                  setlocalBilling('Yearly')
                }}
              >
                {formatMessage({id: 'Yearly'})}
              </button>
            </div>
            <div className='row mt-10'>
              <div className='col-lg-6 mb-10 mb-lg-0'>
                <div className='nav flex-column'>
                  {plans.map((plan, index) => {
                    return (
                      <div
                        key={`custom-${index}`}
                        onClick={() => {
                          setlocalPlan(plan.title)
                          if (localBilling === 'Monthly') {
                            currencyBill === 'USD'
                              ? setlocalPrice(plan?.priceMonthUSD)
                              : setlocalPrice(plan?.priceMonthINR)
                          } else {
                            currencyBill === 'USD'
                              ? setlocalPrice(plan?.priceAnnualUSD)
                              : setlocalPrice(plan?.priceAnnualINR)
                          }
                        }}
                        className={
                          `nav-link btn btn-outline btn-outline-dashed btn-color-dark d-flex flex-stack h-80px text-start p-6 ` +
                          (index !== plans.length - 1 && 'mb-6 ') +
                          (plan.title === localPlan &&
                            (selected !== plan.title || currentState !== localBilling) &&
                            ' active ') +
                          (!plan.custom && 'btn-active btn-active-primary ') +
                          (selected === plan.title && currentState === localBilling && 'disableDiv')
                        }
                        data-bs-toggle='tab'
                        data-bs-target={`#kt_upgrade_plan_${index}`}
                      >
                        <div className='w-100 d-flex align-items-center me-2'>
                          <div className='form-check form-check-custom form-check-solid form-check-success me-6'>
                            <input
                              className={`form-check-input `}
                              type='radio'
                              name='plan'
                              value={plan.title}
                              disabled={selected === plan.title && currentState === localBilling}
                              checked={
                                localPlan === plan.title &&
                                (selected !== plan.title || currentState !== localBilling)
                              }
                              onChange={(e) => {
                                setlocalPlan(e.target.value)
                              }}
                            />
                          </div>

                          <div className='flex-grow-1'>
                            <h2 className='d-flex align-items-center font-size-16 fw-bolder flex-wrap'>
                              {plan.title}
                              {selected === plan.title && currentState === localBilling ? (
                                <>
                                  <span className='badge badge-light-warning ms-2 fs-7'>
                                    {formatMessage({id: 'Active Plan'})}
                                  </span>
                                </>
                              ) : (
                                <>
                                  {plan.label && (
                                    <span
                                      className={`badge  ms-2 fs-7 ${
                                        plan.label === 'Recommended'
                                          ? 'badge-light-success'
                                          : 'badge-light-primary'
                                      }`}
                                    >
                                      {plan.label}
                                    </span>
                                  )}
                                </>
                              )}
                            </h2>
                          </div>

                          <div className='ms-5'>
                            {plan.custom && (
                              <BasicButton
                                height='36px'
                                border='1px solid #F5F8FA'
                                color='#50CD89'
                                textColor='#FFFFFF'
                                padding='8px 16px'
                                buttonText='Contact Us'
                                minWidth={111}
                              />
                            )}

                            <>
                              <span className='mb-2'>{currencyBill === 'INR' ? '₹' : '$'}</span>

                              <span className='fs-3x fw-bolder'>
                                {localBilling === 'Monthly'
                                  ? currencyBill === 'INR'
                                    ? plan.priceMonthINR
                                    : plan.priceMonthUSD
                                  : currencyBill === 'INR'
                                  ? plan.priceAnnualINR
                                  : plan.priceAnnualUSD}
                              </span>

                              <span className='fs-7 opacity-50'>
                                /<span data-kt-element='period'>{localBilling}</span>
                              </span>
                            </>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className='col-lg-6'>
                <div className='tab-content rounded px-10 py-5'>
                  {plans.map((plan, index) => {
                    return (
                      <div key={`custom ${index}`}>
                        {plan.title === localPlan && (
                          <>
                            <div
                              className={
                                `tab-pane fade` + (plan.title === localPlan && 'show active ')
                              }
                              id={`kt_upgrade_plan_${index}`}
                              key={index}
                            >
                              <div className='pt-1'>
                                {plan.features!.map((feature, i) => {
                                  return (
                                    <div
                                      className={
                                        `d-flex align-items-center` +
                                        (i !== plan.features!.length - 1 && ' mb-7')
                                      }
                                      key={`${i}-${feature.title}`}
                                    >
                                      {feature.supported && (
                                        <>
                                          <span className='font-size-13 text-gray-700 flex-grow-1'>
                                            {feature.title}
                                          </span>

                                          <span className=' svg-icon svg-icon-1 svg-icon-success'>
                                            <img
                                              src={toAbsoluteUrl(
                                                '/media/icons/duotune/general/bill_tick.svg'
                                              )}
                                              height='20px'
                                              width='20px'
                                              alt='img_icon'
                                            />
                                          </span>
                                        </>
                                      )}
                                      {!feature.supported && (
                                        <>
                                          <span className='font-size-13 text-gray-400 flex-grow-1'>
                                            {feature.title}
                                          </span>

                                          <span className='svg-icon-1'>
                                            <img
                                              src={toAbsoluteUrl(
                                                '/media/icons/duotune/general/bill_cross.svg'
                                              )}
                                              height='20px'
                                              width='20px'
                                              alt='img_icon'
                                            />
                                          </span>
                                        </>
                                      )}
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='w-100 d-flex justify-content-md-end justify-content-around gap-3'>
            <BasicButton
              buttonText={formatMessage({id: 'Cancel'})}
              onClick={() => setModalShow(false)}
              border='none'
              color='#F5F8FA'
              textColor='#5E6278'
              height='44'
              padding='12px 22px'
              minWidth={91}
            />
            <BasicButton
              buttonText={formatMessage({id: 'Update plan'})}
              border='none'
              color='#4776E6'
              textColor='#FFFFFF'
              height='44'
              padding='12px 24px'
              minWidth={137}
              onClick={onUpgradePlan}
              loading={loading}
              disabled={loading || (localPlan === selected && currentState === localBilling)}
            />
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}
