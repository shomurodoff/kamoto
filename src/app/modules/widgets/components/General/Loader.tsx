import React from 'react'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {useIntl} from 'react-intl'
import '../../../auth/styles/auth_layout.scss'

export const Loader = ({isTeamMember}:{isTeamMember?:boolean}) => {
  const {formatMessage} = useIntl()
  return (
    <div className='d-md-flex flex-md-column justify-content-md-center align-items-md-center m-20'>
      <div>
        <img src={toAbsoluteUrl('/media/auth/loader.svg')} alt='Loader' />
      </div>
      <div className='fs-4 fw-bold mt-5'>{formatMessage({id: 'Please wait...'})}</div>
      {
        isTeamMember && (
          <div className='text-gray-500 fs-6 text-center'>
          {formatMessage({id: 'We are taking you to your dashboard.'})} <br />
          {formatMessage({
            id: 'You can start managing your fund raising process immediately',
          })}
        </div>
        )
      }
     
    </div>
  )
}
