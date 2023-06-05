/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import {useIntl} from 'react-intl'
import {toast} from 'react-toastify'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {BasicButton} from '../../widgets/components/UI/BasicButton'
import {ToolTipUI} from '../../widgets/components/UI/ToolTipUI'
import {putPaypalReferralEmail} from '../core/_requests'

export function Referral({
  referral,
  totalEarning,
  totalReferred,
  setPaypalId,
  paypalId,
}: {
  paypalId?: string
  referral?: string
  totalEarning?: string
  totalReferred?: string
  setPaypalId: React.Dispatch<React.SetStateAction<string | undefined>>
}) {
  const {formatMessage} = useIntl()
  const [loading, setLoading] = useState(false)

  const addPaypalEmail = async () => {
    try {
      setLoading(true)
      const {
        data: {success, errors},
      } = await putPaypalReferralEmail({
        paypalEmail: paypalId,
      })

      if (success) {
        setLoading(false)
        toast.success(formatMessage({id: 'Paypal email updated'}))
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

  return (
    <>
      <div className='card card-custom row'>
        <div className='card-body'>
          <div className='d-flex justify-content-between'>
            <div>
              <h4 className='card-label'>
                {formatMessage({id: 'Invite Friends & Start Earning'})}
              </h4>
              <p className='pb-4'>
                {formatMessage({
                  id: 'Invite a friend to foundercrate, and enjoy a lifetime of earnings from their activity.',
                })}
              </p>
            </div>
          </div>
          <div>
            <div className={'grid grid-cols-12 md:gap-x-[32px] gap-y-[16px]'}>
              <div className='col-span-12 md:col-span-4'>
                <label className='flex items-center mb-1'>
                  {formatMessage({id: 'Referral Link'})}{' '}
                  <ToolTipUI tooltipText={'GLOBAL.TOOLTIP.REFFERAL.REFFERALLINK'} />
                </label>
                <div className={'input-group flex  rounded p-1.5 bg-[#2E2F45]'}>
                  <input
                    type='text'
                    className='flex-grow bg-transparent border-none focus:outline-0'
                    value={`${window.location.protocol}//${window.location.hostname}/auth/registration?r=${referral}`}
                    placeholder='Some path'
                    // id='copy-input'
                    readOnly
                  />
                  <span
                    className='bg-[#2E2F45]'
                    style={{borderColor: '#e4e6ef !important'}}
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.protocol}//${window.location.hostname}/auth/registration?r=${referral}`
                      )
                      toast.success(formatMessage({id: 'Copied Successfully'}))
                    }}
                  >
                    <i className='fa fa-copy  btn'></i>
                  </span>
                </div>
              </div>
              <div className='col-span-12 md:col-span-4'>
                <label className='flex items-center mb-1'>
                  {formatMessage({id: 'Referral Link'})}{' '}
                  <ToolTipUI tooltipText={'GLOBAL.TOOLTIP.REFFERAL.REFFERALLINK'} />
                </label>
                <div className={'input-group flex border rounded p-1.5 bg-[#2E2F45]'}>
                  <input
                    type='text'
                    className='flex-grow border-r-0 bg-transparent focus:outline-0'
                    value={referral}
                    placeholder='Some path'
                    // id='copy-input'
                    readOnly
                  />
                  <span
                    className='bg-[#2E2F45]'
                    style={{borderColor: '#e4e6ef !important'}}
                    onClick={() => {
                      navigator.clipboard.writeText(`${referral}`)
                      toast.success(formatMessage({id: 'Copied Successfully'}))
                    }}
                  >
                    <i className='fa fa-copy  btn'></i>
                  </span>
                </div>
              </div>
              <div className='col-span-12 md:col-span-4'>
                <label className='flex items-center mb-1'>
                  {formatMessage({id: 'Share'})}{' '}
                  <ToolTipUI tooltipText={'GLOBAL.TOOLTIP.REFFERAL.SHARELINK'} />
                </label>
                <div className='flex md:mt-[8px]'>
                  <span
                    className={`svg-icon svg-icon-1 cursor-pointer`}
                    onClick={() =>
                      window.open(
                        `https://wa.me/?text=You are invited to join FounderCrate. Please follow my referral link to signup: ${window.location.protocol}//${window.location.hostname}/auth/registration?r=${referral}`,
                        '_blank',
                        'noreferrer'
                      )
                    }
                  >
                    <img
                      src={toAbsoluteUrl('/media/svg/social-logos/whatsapp.svg')}
                      height='25px'
                      width='25px'
                      alt='img_icon'
                    />
                  </span>
                  <span
                    className={`svg-icon svg-icon-1 social-media-icon cursor-pointer`}
                    onClick={() =>
                      window.open(
                        `https://telegram.me/share/url?url=${window.location.protocol}//${window.location.hostname}/auth/registration?r=${referral}`,
                        '_blank',
                        'noreferrer'
                      )
                    }
                  >
                    <img
                      src={toAbsoluteUrl('/media/svg/social-logos/telegram.svg')}
                      height='25px'
                      width='25px'
                      alt='img_icon'
                    />
                  </span>
                  <span
                    className={`svg-icon svg-icon-1 social-media-icon cursor-pointer`}
                    onClick={() =>
                      window.open(
                        `https://discord.com/share/url?url=${window.location.protocol}//${window.location.hostname}/auth/registration?r=${referral}`,
                        '_blank',
                        'noreferrer'
                      )
                    }
                  >
                    <img
                      src={toAbsoluteUrl('/media/svg/social-logos/discord.svg')}
                      height='25px'
                      width='25px'
                      alt='img_icon'
                    />
                  </span>
                  <span
                    className={`svg-icon svg-icon-1 social-media-icon cursor-pointer`}
                    onClick={() =>
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${window.location.protocol}//${window.location.hostname}/auth/registration?r=${referral}`,
                        '_blank',
                        'noreferrer'
                      )
                    }
                  >
                    <img
                      src={toAbsoluteUrl('/media/svg/social-logos/facebook.svg')}
                      height='25px'
                      width='25px'
                      alt='img_icon'
                    />
                  </span>
                  <span
                    className={`svg-icon svg-icon-1 social-media-icon cursor-pointer`}
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?url=${window.location.protocol}//${window.location.hostname}/auth/registration?r=${referral}`,
                        '_blank',
                        'noreferrer'
                      )
                    }
                  >
                    <img
                      src={toAbsoluteUrl('/media/svg/social-logos/twitter.svg')}
                      height='25px'
                      width='25px'
                      alt='img_icon'
                    />
                  </span>
                  <span
                    className={`svg-icon svg-icon-1 social-media-icon cursor-pointer`}
                    onClick={() =>
                      window.open(
                        `https://www.linkedin.com/share/?url='${window.location.protocol}//${window.location.hostname}/auth/registration?r=${referral}'`,
                        '_blank',
                        'noreferrer'
                      )
                    }
                  >
                    <img
                      src={toAbsoluteUrl('/media/svg/social-logos/linkedin.svg')}
                      height='25px'
                      width='25px'
                      alt='img_icon'
                    />
                  </span>
                </div>
              </div>
            </div>
            <div className='row py-2 mt-4'>
              <div className='col-lg-2 col-xl-2 col-md-2 col-12 card border p-4 m-2'>
                <img
                  src={toAbsoluteUrl('/media/icons/setting/hand_holding.svg')}
                  alt=''
                  className='button-icon'
                />
                <h4>{`$${totalEarning}`}</h4>
                <p>{formatMessage({id: 'Total Referral earning'})}</p>
              </div>
              <div className='col-lg-2 col-xl-2 col-md-2 col-12 card border p-4  m-2'>
                <img
                  src={toAbsoluteUrl('/media/icons/setting/people.svg')}
                  alt=''
                  className='button-icon'
                />
                <h4>{totalReferred}</h4>
                <p>{formatMessage({id: 'Total Referred Companies'})}</p>
              </div>{' '}
            </div>
            <div className='grid grid-cols-12'>
              <div className='col-span-12 mb-1'>
                <label className='flex items-center'>
                  {formatMessage({id: 'Your PayPal ID for referral earning payout'})}{' '}
                  <ToolTipUI tooltipText={'GLOBAL.TOOLTIP.REFFERAL.PAYPAL_REFERRAL'} />
                </label>
              </div>
              <div className='md:col-span-5 col-span-12'>
                <div className='flex flex-col md:flex-row  gap-x-[20px] gap-y-[16px]'>
                  <input
                    type='email'
                    className='flex-grow bg-[#2E2F45] form-control  border-r-0  focus:outline-0'
                    placeholder='mypaypalid@paypal.com'
                    onChange={(e) => setPaypalId(e.target.value)}
                    value={paypalId}
                  />
                  <BasicButton
                    disabled={loading}
                    loading={loading}
                    buttonText={formatMessage({id: 'Save'})}
                    height='44px'
                    border='none'
                    color='#C2D24B'
                    textColor='#000000'
                    customClass={'min-w-[120px] flex-grow'}
                    padding='8px 24px'
                    onClick={addPaypalEmail}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
