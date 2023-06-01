/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import {useIntl} from 'react-intl'
import {BillingModal} from '../../onboarding/views/BillingModal'
import {BasicButton} from '../../widgets/components/UI/BasicButton'
import {plans} from '../../onboarding/core/_constants'
import {getBillingAccess} from '../core/_requests'
import {toast} from 'react-toastify'
import {Modal} from 'react-bootstrap'

export function Billing({
  key,
  billingData,
  currencyBill,
  selected,
  currentState,
  companyId,
  getBillingDetails,
}: {
  key: number
  billingData: any
  currencyBill: string
  selected: string
  currentState: string
  companyId: number | undefined
  getBillingDetails: () => Promise<void>
}) {
  const {formatMessage} = useIntl()
  const [modalShow, setModalShow] = useState(false)
  const [accessLoading, setAccessLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [urlData, setUrlData] = useState()

  const onSubmitAccess = async () => {
    try {
      setAccessLoading(true)
      if (companyId) {
        const {
          data: {data: value, success, errors},
        } = await getBillingAccess(companyId)
        if (success) {
          setAccessLoading(false)
          setUrlData(value)
          setShowModal(true)
        } else {
          setAccessLoading(false)
          errors.forEach((error: string) => {
            toast.error(formatMessage({id: error}))
          })
        }
      }
    } catch (err) {
      setAccessLoading(false)
      console.log(err)
    }
  }

  return (
    <>
      <div className='card card-custom mx-1 rounded-1 mt-0 row'>
        <div className='card-body'>
          <h4 className='card-label fs-5'>{formatMessage({id: 'Billing'})}</h4>
          <div className='col-md-6 row bg-gray-100 mx-0 gap-3 padding-16px'>
            <div className='d-flex border-bottom border-secondary border-2 p-0 dark-border'>
              <p className='col-6 mb-0 pb-3 text-gray-700 font-size-13'>
                {formatMessage({id: 'Current Plan'})}
              </p>
              <p className='col-6 mb-0 font-size-13'>{`${selected} (${billingData?.status.replace(
                '_',
                ' '
              )})`}</p>
            </div>
            <div className='d-flex border-bottom border-secondary border-2 p-0 dark-border'>
              <p className='col-6 mb-0 pb-3 text-gray-700 font-size-13'>
                {formatMessage({id: 'Amount'})}
              </p>
              <p className='col-6 mb-0 font-size-13'>
                {billingData?.currency_code}
                {billingData?.currency_code === 'INR' ? ' ₹' : ' $'}
                {billingData?.subscription_items[0].amount > 0
                  ? (billingData?.subscription_items[0].amount / 100)?.toFixed(2)
                  : billingData?.subscription_items[0].amount?.toFixed(2)}
              </p>
            </div>
            <div className='d-flex border-bottom border-secondary border-2 p-0 dark-border'>
              <p className='col-6 mb-0 pb-3 text-gray-700 font-size-13'>
                {' '}
                {formatMessage({id: 'Next Billing Amount'})}
              </p>
              <p className='col-6 mb-0  font-size-13'>
                {billingData?.currency_code}
                {billingData?.currency_code === 'INR' ? ' ₹' : ' $'}
                {billingData?.subscription_items[0].amount > 0
                  ? (billingData?.subscription_items[0].amount / 100)?.toFixed(2)
                  : billingData?.subscription_items[0].amount?.toFixed(2)}
              </p>
            </div>
            <div className='d-flex border-bottom border-secondary border-2 p-0 dark-border'>
              <p className='col-6 mb-0 pb-3 text-gray-700 font-size-13'>
                {' '}
                {formatMessage({id: 'Next Billing Date'})}
              </p>

              <p className='col-6 mb-0 font-size-13'>
                {new Date(billingData?.next_billing_at * 1000).toDateString()}
              </p>
            </div>
          </div>

          <h6 className='my-4 font-size-13'>
            {formatMessage({
              id: 'You can manage your subscription, payment menthod, and download invoices from your billing portal.',
            })}
          </h6>
          <div className='d-flex my-5 gap-3 flex-wrap'>
            <BasicButton
              buttonText={formatMessage({id: 'Update Subscription'})}
              height='44px'
              border='1px solid #4776E6'
              color='#4776E6'
              textColor='white'
              padding='12px 24px'
              onClick={() => {
                setModalShow(true)
              }}
            />
            <BasicButton
              buttonText={formatMessage({id: 'Access billing portal'})}
              height='44px'
              border='1px solid #4776E6'
              color='#4776E6'
              textColor='white'
              padding='12px 24px'
              onClick={() => {
                onSubmitAccess()
              }}
              loading={accessLoading}
              disabled={accessLoading}
            />
          </div>
        </div>
      </div>
      <BillingModal
        setModalShow={setModalShow}
        modalShow={modalShow}
        currencyBill={currencyBill}
        selected={selected}
        currentState={currentState}
        plans={plans}
        upgrade={true}
        companyId={companyId}
        getBillingDetails={getBillingDetails}
      />
      <>
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <iframe title='Manage Subscription' src={urlData} width='100%' height={600}></iframe>
          </Modal.Body>
        </Modal>
      </>
    </>
  )
}
