import {useIntl} from 'react-intl'
import '../styles/index.scss'
import {ToolTipUI} from '../../widgets/components/UI/ToolTipUI'
import {EmailPreferencesInput} from '../core/_constants'
import {EmailPreferencesInputType, EmailPreferencesOutputType} from '../core/_models'
import {Dispatch, SetStateAction, useState} from 'react'
import {createEmailPreferences, getEmailPreferences} from '../core/_requests'
import {useAuth} from '../../auth'
import {toast} from 'react-toastify'
import {Spinner} from '../../widgets/components/General/Spinner'
import {BasicButton} from '../../widgets/components/UI/BasicButton'

export const NotificationPreferences = ({
  key,
  getPreferences,
  getPreferencesApiLoading,
  setGetPreferences,
}: {
  key: number
  getPreferences: any
  getPreferencesApiLoading: boolean
  setGetPreferences: Dispatch<SetStateAction<EmailPreferencesOutputType[]>>
}) => {
  const [loading, setLoading] = useState(false)
  const {companyId} = useAuth()

  const handleToogle = (id: number, checked: boolean) => {
    getPreferences.map((preference: EmailPreferencesOutputType) => {
      if (preference.id === id) {
        return (preference.value = checked)
      }
      return null
    })
  }

  const handleSumbit = async () => {
    try {
      setLoading(true)
      if (companyId) {
        const {
          data: {success, errors},
        } = await createEmailPreferences(JSON.stringify(getPreferences), companyId)
        if (success) {
          const {
            data: {
              data: {preference},
              success,
            },
          } = await getEmailPreferences(companyId)
          if (success) {
            setGetPreferences(JSON.parse(preference))
          }
          setLoading(false)
          toast.success(formatMessage({id: 'Preferences updated successfully'}))
        } else {
          setLoading(false)
          errors.forEach((error: string) => {
            toast.error(formatMessage({id: error}))
          })
        }
      }
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  const {formatMessage} = useIntl()
  interface TooltipObj {
    [key: number]: string
  }
  const tooltipObj: TooltipObj = {
    1: 'GLOBAL.TOOLTIP.NOTIFICATIONS.SUCCESSFULPAYMENTS',
    2: 'GLOBAL.TOOLTIP.NOTIFICATIONS.NEW_INVESTOR_UPDATE',
    3: 'GLOBAL.TOOLTIP.NOTIFICATIONS.FEE_COLLECTION',
    4: 'GLOBAL.TOOLTIP.NOTIFICATIONS.CUSTOMER_PAYMENT_DISPUTE',
    5: 'GLOBAL.TOOLTIP.NOTIFICATIONS.REFUND_DETAILS',
    6: 'GLOBAL.TOOLTIP.NOTIFICATIONS.INVOICE_PAYMENT',
    7: 'GLOBAL.TOOLTIP.NOTIFICATIONS.BILLING UPDATES',
    8: 'GLOBAL.TOOLTIP.NOTIFICATIONS.NEW_TEAM_MEMBERS',
    9: 'GLOBAL.TOOLTIP.NOTIFICATIONS.COMPLETED_INVESTMENTS',
    10: 'GLOBAL.TOOLTIP.NOTIFICATIONS.NEWSLETTERS',
  }

  return (
    <>
      {getPreferencesApiLoading ? <Spinner /> : null}
      <div className='pt-8 company-container mt-0 px-[20px]'>
        <div className='fs-6 fw-semibold pb-5'>
          {formatMessage({id: 'Notification Preferences'})}
        </div>
        {EmailPreferencesInput.map(
          ({id, title, subtitle}: EmailPreferencesInputType, index: number) => (
            <div className='border-bottom' key={id}>
              <form className='form-check foΩrm-check-custom form-check-solid form-check-primary form-switch flex items-center gap-x-[8px]'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id={id.toString()}
                  name='model.app.sidebar.default.minimize.desktop.hoverable'
                  defaultChecked={getPreferences && getPreferences[index]?.value}
                  onChange={(e) => {
                    handleToogle(id, e.target.checked)
                  }}
                />
                <div className='d-flex flex-column justify-content-end mt-2'>
                  <div className='d-flex'>
                    <div>
                      <label
                        className='form-check-label fw-semibold font-size-13 title-notification'
                        htmlFor={id.toString()}
                        data-bs-toggle='tooltip'
                        data-kt-initialized='1'
                      >
                        {title}
                      </label>
                    </div>
                    <div>{<ToolTipUI tooltipText={tooltipObj[id]} />}</div>
                  </div>
                  <label
                    className='form-check-label text-clr58 fw-normal fs-7'
                    htmlFor={id.toString()}
                    data-bs-toggle='tooltip'
                    data-kt-initialized='1'
                  >
                    {subtitle}
                  </label>
                </div>
              </form>
            </div>
          )
        )}
        <div className='flex justify-end mt-[20px] md:mt-[135px]'>
          <BasicButton
            buttonText={formatMessage({id: 'Save Changes'})}
            onClick={handleSumbit}
            disabled={loading}
            loading={loading}
            height='44px'
            customClass={'w-full md:w-auto'}
            border='1px solid #C2D24B'
            color='#C2D24B'
            textColor='#000000'
            padding='12px 24px'
          />
        </div>
      </div>
    </>
  )
}
