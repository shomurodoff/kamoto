import React, {memo, useEffect, useState} from 'react'

import {useIntl} from 'react-intl'
// import threeDots from '../../../../_metronic/assets/images/svg/investor/threeDots.svg'
import {DisplayImage} from '../../widgets/components/General/DisplayImage'
import {InvestorModel} from '../core/_models'
import {GET_FILE_URL, getAddToCRMData} from '../core/_requests'
import {BasicButton} from '../../widgets/components/UI/BasicButton'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {useNavigate} from 'react-router'
import {toast} from 'react-toastify'
import {useShortScale} from '../../../hooks/useShortScale'

const InvestorCard = ({
  investor,
  roundId,
}: {
  investor: InvestorModel
  roundId: number | undefined
}) => {
  const {formatMessage} = useIntl()
  const [isHovering, setIsHovering] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const peopleData: any[] = []
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const {convertValueToShortScale} = useShortScale()

  investor.investorUsers.forEach((user: any) => {
    if (user.fileId !== null) {
      peopleData.push(user)
    }
  })
  const addToCRM = async (investorId: number) => {
    try {
      setLoading(true)
      const {
        data: {success, errors},
      } = await getAddToCRMData({
        roundId: roundId,
        investorId: investorId,
        isFavourite: false,
      })
      if (success) {
        toast.success(formatMessage({id: 'Investor added to CRM in current round'}))
        setIsAdded(true)
        setLoading(false)
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

  useEffect(() => {
    const isPresent = investor.columns?.find((column: any) => column.roundId === roundId)
    setIsAdded(!!isPresent)
  }, [roundId]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div
        className='card py-4 px-3 d-flex justify-content-between'
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div>
          <div className='d-lg-flex justify-content-lg-between d-xl-flex justify-content-xl-between d-md-block d-block'>
            <div className='d-flex gap-5'>
              <DisplayImage
                imgName={investor?.file?.name}
                width={60}
                alt='profile'
                fit='contain'
                height={60}
              />
              <div>
                <h4
                  className='font-size-16 cursor-pointer'
                  onClick={() => {
                    navigate(`/investor-database/individual-investor/${investor.investorId}`)
                  }}
                >
                  {investor && investor.name}
                </h4>
                <button className='font-size-12 p-2 button-radius'>Secondary</button>
                <div className='d-flex gap-2 justify-content-start my-3'>
                  {investor.website ? (
                    <a target='_blank' href={investor.website} rel='noreferrer'>
                      <img
                        src={toAbsoluteUrl('/media/icons/investor/Link.svg')}
                        height={20}
                        alt='website'
                      />
                    </a>
                  ) : (
                    <div className='h-20px'></div>
                  )}
                  {investor.linkedin_url && (
                    <a target='_blank' href={investor.linkedin_url} rel='noreferrer'>
                      <img
                        src={toAbsoluteUrl('/media/icons/investor/LinkedIn.svg')}
                        height={20}
                        alt='linkedIn'
                      />
                    </a>
                  )}
                  {investor.twitter_url && (
                    <a target='_blank' href={investor.twitter_url} rel='noreferrer'>
                      <img
                        src={toAbsoluteUrl('/media/icons/investor/Twitter.svg')}
                        height={20}
                        alt='twitter'
                      />
                    </a>
                  )}
                  {investor.facebook_url && (
                    <a target='_blank' href={investor.facebook_url} rel='noreferrer'>
                      {' '}
                      <img
                        src={toAbsoluteUrl('/media/icons/investor/Facebook.svg')}
                        height={20}
                        alt='facebook'
                      />
                    </a>
                  )}
                  {investor.insta_url && (
                    <a target='_blank' href={investor.insta_url} rel='noreferrer'>
                      <img
                        src={toAbsoluteUrl('/media/icons/investor/Instagram.svg')}
                        height={20}
                        alt='instagram'
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
            {isHovering && (
              <div>
                {/* <button className='btn btn-light card-dot p-0'>
                <img src={threeDots} alt='' />
              </button> */}
              </div>
            )}
          </div>

          <div>
            <p className='description'>{investor.description}</p>
          </div>
          <div>
            <p className='people-connected'>{formatMessage({id: 'People Connected'})}</p>
            <div className='d-flex align-items-center gap-3'>
              <div className='col-12 d-flex justify-content-start mt-2'>
                <div className='mb-2'>
                  {peopleData.slice(0, 5).map((item) => (
                    <img
                      key={item?.file?.name}
                      src={`${GET_FILE_URL}/${item?.file?.name}`}
                      className='c-profile'
                      alt='people group images'
                      onClick={() => navigate(`/investor-database/profile/${item?.investorUserId}`)}
                    />
                  ))}
                </div>
                {investor.investorUsers.length > 0 && peopleData.length > 5 && (
                  <div className='align-items-lg-center d-flex mb-4 ps-3 pt-2'>
                    +{investor.investorUsers.length - 5} more
                  </div>
                )}
                {investor.investorUsers.length > 0 &&
                  peopleData.length <= 5 &&
                  peopleData.length !== 0 && (
                    <div className='align-items-lg-center d-flex mb-4 ps-3 pt-2'>
                      {investor.investorUsers.length === peopleData.length
                        ? ``
                        : `+${investor.investorUsers.length - peopleData.length} more`}
                    </div>
                  )}
                {investor.investorUsers.length > 0 && peopleData.length === 0 && (
                  <div className='align-items-lg-center d-flex mb-4 ps-3 pt-2'>
                    {investor.investorUsers.length}
                  </div>
                )}
                {investor.investorUsers.length === 0 && peopleData.length === 0 && (
                  <div className='align-items-lg-center d-flex mb-4 ps-3 pt-2'>-</div>
                )}
              </div>
            </div>
          </div>
          <div className='d-flex gap-4 mt-3 col-12 justify-content-between'>
            <div>
              <p className='font-size-12 mb-1'>{formatMessage({id: 'Investor type'})}</p>
              <p className='font-size-13'>
                {investor?.fund_type ? JSON.parse(investor?.fund_type).join(', ') : '-'}
              </p>
            </div>
            <div>
              <p className='font-size-12 mb-1'>{formatMessage({id: 'Fund Size/AUM'})}</p>
              <p className='font-size-13'>
                {!!investor?.fund_size
                  ? `$${convertValueToShortScale(Math.ceil(investor?.fund_size))}`
                  : '-'}
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className='border-bottom mb-4'></div>
          <div className='w-100 gap-3 d-lg-flex justify-content-lg-between d-xl-flex justify-content-xl-between d-md-flex justify-content-md-between d-flex flex-column flex-md-row'>
            {isAdded ? (
              <BasicButton
                buttonText={formatMessage({id: 'Added'})}
                border='none'
                color='#4776E6'
                textColor='#FFFFFF'
                padding='8px 24px'
                disabled={true}
                investorCard={true}
                width='100'
              />
            ) : (
              <BasicButton
                buttonText={formatMessage({id: 'Add to CRM'})}
                border='none'
                color='#4776E6'
                textColor='#FFFFFF'
                padding='8px 24px'
                loading={loading}
                onClick={() => addToCRM(investor?.investorId)}
                investorCard={true}
                width='100'
              />
            )}

            <BasicButton
              buttonText={formatMessage({id: 'View Details'})}
              border='none'
              color='#F5F8FA'
              textColor='#5E6278'
              padding='8px 24px'
              customClass='view-details-btn'
              onClick={() => {
                navigate(`/investor-database/individual-investor/${investor.investorId}`)
              }}
              investorCard={true}
              width='100'
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default memo(InvestorCard)
